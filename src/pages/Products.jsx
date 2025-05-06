import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import ProductCard from "../component/ProductCard";
import api from "../services/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProducts = (query = "") => {
    setLoading(true);
    api.get(`/products${query ? `?search=${query}` : ''}`)
      .then((res) => {
        if (res.data.success) {
          const results = res.data.data.data;

          // فلترة إضافية حسب الاسم فقط
          const filtered = query
            ? results.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
              )
            : results;

          setProducts(filtered);
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

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchProducts(searchTerm);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  if (loading) return <p>جاري التحميل...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-[#fffaf5]">
      <h2 className="text-2xl font-bold mb-6">
        منتجات القهوة
      </h2>

      {/* 🔍 مربع البحث */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="ابحث عن منتج..."
            className="border border-gray-300 focus:border-orange-500 px-4 py-2 rounded-lg w-full text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </span>
        </div>
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-300"
          >
            مسح
          </button>
        )}
      </div>

      {/* المنتجات أو رسالة عدم وجودها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>لا توجد منتجات مطابقة.</p>
        )}
      </div>
    </div>
  );
}
