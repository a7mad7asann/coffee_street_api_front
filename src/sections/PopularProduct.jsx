import { useState, useEffect, useContext } from "react";
import { FaShoppingCart, FaStar } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";
import toast from "react-hot-toast"; // استيراد التوست
import ProductCard from "../component/ProductCard"; // استيراد ال ProductCard
import api from "../services/api";

export default function Products() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ جلب البيانات من الـ API باستخدام fetchProducts
  const fetchProducts = (query = "") => {
    setLoading(true);
    api.get(`/products${query ? `?search=${query}` : ''}`)
      .then((res) => {
        if (res.data.success) {
          const results = res.data.data.data;
          setProducts(results); // تحديث حالة المنتجات
        } else {
          setError(res.data.message || 'Something went wrong');
        }
      })
      .catch((err) => {
        console.error(err);
        setError('API Error');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // ✅ جلب المنتجات عند تحميل الصفحة
  useEffect(() => {
    fetchProducts(); // استدعاء الـ fetchProducts
    AOS.init({ duration: 800, delay: 100 });
  }, []); // استدعاء مرة واحدة عند تحميل الصفحة

  return (
    <section className="p-6">
      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-4" data-aos="fade-right">
          الأكثر رواجًا
        </h2>

        <div className="bg-yellow-800 h-full rounded-3xl px-7 py-4" data-aos="fade-left">
          {loading ? (
            <p className="text-center">جاري التحميل...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))
              ) : (
                <p>لا توجد منتجات مطابقة.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
