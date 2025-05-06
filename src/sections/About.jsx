import { useEffect } from "react";
import { motion } from "framer-motion";
import data from "../../public/data.json";

export default function About() {
  const content = data.about;  // تحديد المحتوى باللغة العربية


  return (
    <section className="bg-[#fef6ef] relative overflow-hidden py-4 px-6 md:px-24">
      {/* خلفية كؤوس القهوة */}
      <div className="absolute inset-0 opacity-10 z-0 bg-[url('/images/about_pattern.png')] bg-repeat" />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center gap-12 mt-16">
        {/* النص */}
        <motion.div 
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3 
            className="text-3xl font-bold mb-2 w-fit relative after:content-[''] after:block after:w-1/4 after:h-1 after:bg-orange-400 after:rounded-sm after:mt-2 after:absolute rtl:after:left-0 after:right-0 after:bottom-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {content.title}
          </motion.h3>

          <h2 className="text-2xl font-semibold mt-6 mb-4 text-gray-800 whitespace-pre-line">
            {content.subtitle}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-6">
            {content.description}
          </p>

          <button
            onClick={() => window.location.href = '/Products'}
            className="bg-[#1f1f1f] text-white text-sm px-6 py-3 rounded-full hover:bg-[#333] transition"
          >
            {content.button}
          </button>
        </motion.div>

        {/* الصورة */}
        <motion.div
          className="md:w-1/3 flex justify-center "
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div
            className="bg-white p-2 rounded-xl"
          >
            <img
              src={content.image}
              alt="about us"
              className="rounded-xl shadow-xl w-[300px] md:w-[400px] object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* القيم الأساسية */}
      <motion.div 
        className="relative z-10 mt-16 flex align-center justify-center flex-col sm:flex-row flex-1 gap-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        viewport={{ once: true }}
      >
        {content.values.map((value, index) => (
          <div key={index} className="bg-white rounded-lg p-8 shadow hover:shadow-md hover:translate-y-1.5 hover:translate-x-4 transition-all duration-300 ease-in-out">
            <img src={value.icon} alt={value.title} className="w-12 h-12 mx-auto mb-3 flex-1" />
            
            <h4 className="font-semibold text-lg text-[#432818]">{value.title}</h4>
            
            <p className="text-sm text-gray-600 mt-2">{value.description}</p>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
