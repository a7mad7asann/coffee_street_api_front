import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((data) => setContent(data.heroSection));
  }, []);

  if (!content) return <p>Loading...</p>;

  return (
    <section className="relative h-[600px] bg-[#F8EDE3] flex items-center justify-center overflow-hidden">
      {/* Floating Coffee Beans */}
      <div className="absolute right-0 top-0 pointer-events-none">
        <img src={content.backgroundImage} alt="Coffee Beans" className="w-full h-full object-cover opacity-60" />
      </div>
      
      <div className="container mx-auto mt-12 flex flex-col md:flex-row items-center justify-center md:justify-between relative z-10 px-6 md:px-16">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut" }} 
          className={`md:w-1/2 text-center md:text-left`}
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#432818]">
            {content.title.split(" ")[0]} <span className="text-[#FF902B]">{content.title.split(" ")[1]}</span>
          </h1>
          <p className="text-gray-700 mt-4 text-lg">{content.description}</p>
          <div className="mt-6 gap-4 sm:mb-3 mb-0">
            <button 
              className="bg-[#432818] px-6 py-3 rounded-lg text-white font-bold text-lg shadow-lg hover:bg-[#25140D] transition duration-300"
              onClick={() => window.location.href = '/Products '}
            >
              {content.moreMenu}
            </button>
          </div>
        </motion.div>

        {/* Coffee cat Display */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }} 
          className="relative hidden sm:flex items-center justify-center bg-[#3F2E20] rounded-full shadow-xl 
                    w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96"
        >
          <img 
            src={content.cat.image} 
            alt={content.cat.name} 
            className="object-cover 
                      w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64" 
          />

          {/* cat Labels */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1 }}
            className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full shadow-lg text-xs sm:text-sm font-semibold"
          >
            {content.cat.name}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.2 }}
            className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-lg text-xs sm:text-sm font-semibold"
          >
            {content.cat.sales}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 1.4 }}
            className="absolute top-12 right-4 bg-white px-3 py-1 rounded-full shadow-lg text-xs sm:text-sm flex items-center gap-1"
          >
            <span>{content.cat.rating}</span>
            <span className="text-yellow-500">⭐</span>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 pointer-events-none">
        <img src={content.backgroundImage} alt="Coffee Beans" className="w-full h-full object-cover opacity-60" />
      </div>
    </section>
  );
}
