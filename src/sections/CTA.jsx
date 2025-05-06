import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const AccordionItem = ({ title, content, isOpen, toggle }) => {
  return (
    <div
      className="border border-gray-200 rounded-lg p-4 mb-3 shadow-md bg-white"
      data-aos="fade-up"
    >
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={toggle}
      >
        <div className="flex items-center gap-3">
          <Check className="text-secondrey" />
          <h3 className="font-semibold">{title}</h3>
        </div>
        <ChevronDown
          className={`text-secondrey transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto", transition: { duration: 0.4, ease: "easeInOut" } }}
            exit={{ opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } }}
          >
            <p className="mt-2 text-gray-600">{content}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function ValueSection() {
  const [openIndex, setOpenIndex] = useState(null);
  const [content, setContent] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
    });

    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setContent(json.valueSection.ar))  // تحديد المحتوى باللغة العربية فقط
      .catch((error) => console.error("Error loading data:", error));
  }, []);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!content) return <p className="text-center text-gray-500">جار التحميل...</p>;

  return (
    <section
      dir="rtl"  // تعيين الاتجاه إلى اليمين لليسار بشكل ثابت
      className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 my-16 grid md:grid-cols-2 items-center gap-10"
    >
      {/* الصورة اليسرى */}
      <div data-aos="zoom-in">
        <img
          src={content.image}
          alt="مبنى"
          className="w-full rounded-lg shadow-lg"
        />
      </div>

      {/* المحتوى النصي */}
      <div>
        <h2 className="text-3xl font-bold mb-4" data-aos="fade-up">
          {content.title}
        </h2>
        
        <p className="text-gray-500 mb-6" data-aos="fade-up" data-aos-delay="200">
          {content.description}
        </p>

        {/* الأكورديون */}
        {content.accordion.map((item, index) => (
          <AccordionItem
            key={index}
            title={item.title}
            content={item.content}
            isOpen={openIndex === index}
            toggle={() => toggleAccordion(index)}
          />
        ))}
      </div>
    </section>
  );
}
