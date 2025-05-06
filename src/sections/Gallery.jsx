import { useEffect, useState, useContext, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageContext } from "../context/LanguageContext";
import { FaShoppingCart } from "react-icons/fa";
import { useCart, CartProvider } from "../context/CartContext";

export default function Gallery() {
  const { lang } = useContext(LanguageContext);
  const { addToCart } = useCart();
  const [menuData, setMenuData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in-out", once: true });

    const fetchData = async () => {
      try {
        const res = await fetch("/products.json");
        const data = await res.json();
        setMenuData(data.menu);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (menuData) {
      setSelectedOptions(
        menuData.items.reduce((acc, item) => {
          acc[item.id] = item.tags?.[0] || "";
          return acc;
        }, {})
      );
    }
  }, [menuData]);

  const handleOptionChange = useCallback((itemId, tag) => {
    setSelectedOptions((prev) => ({ ...prev, [itemId]: tag }));
  }, []);

  if (!menuData) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <CartProvider>
      <div className="max-w-7xl mx-auto px-6 py-16" dir={lang === "ar" ? "rtl" : "ltr"}>
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800" data-aos="fade-up">
          {menuData.title[lang]}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuData.items.map((item, index) => (
            <motion.div
              key={item.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden relative transition-transform hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <img
                src={item.image}
                alt={item.name[lang]}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{item.name[lang]}</h3>
                  <span className="bg-orange-500 text-white text-sm px-2 py-1 rounded-full font-bold">{item.rating} ⭐</span>
                </div>
                <p className="text-gray-600 text-sm">{item.description[lang]}</p>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-lg font-bold text-gray-800">{item.price} {item.currency[lang]}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex gap-2">
                    {item.tags?.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleOptionChange(item.id, tag)}
                        className={`px-2 py-1 text-xs rounded-full ${
                          selectedOptions[item.id] === tag ? "bg-orange-500 text-white" : "bg-gray-200 text-gray-700"
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => addToCart({ ...item, selectedTag: selectedOptions[item.id] })}
                    className="bg-orange-500 text-white p-2 rounded-full hover:bg-orange-600 transition"
                  >
                    <FaShoppingCart size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </CartProvider>
  );
}
