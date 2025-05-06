import { useContext } from "react";
// import { LanguageContext } from "../context/LanguageContext";
import { useCart } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const { addFromCart } = useCart();

  const handleAdd = () => {
    // تمرير selectedTag كـ null مؤقتًا (بما إنه غير مفعل)
    addFromCart(product.id, null);
    toast.success(
      lang === "en"
        ? "Added to cart successfully 🛒"
        : "تمت الإضافة إلى السلة بنجاح 🛒"
    );
  };

  return (
    <div
      className="bg-[#f7f3ef] rounded-2xl h-[300px] shadow-md p-3 relative border border-[#c8b6a6]"
    >
      {/* تقييم */}
      <div className="absolute top-2 right-2 bg-white text-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
        <span>4.6</span>
        <span className="text-yellow-400">⭐</span>
      </div>

      <div className="h-[55%] overflow-hidden rounded-xl mb-4">
        {/* الصورة */}
        <img
          src={`http://127.0.0.1:8000/products/${product.image}`}
          alt={product.name}
          className="rounded-xl w-full  object-cover"
        />
      </div>

      {/* الاسم والسعر */}
      <div className="flex justify-between h-[20%] items-center font-bold text-[16px] text-gray-800 mb-2">
        <span>{product.name}</span>
        <span>
          {product.price}ريال 
        </span>
      </div>

      {/* زر الإضافة */}
      <button
        onClick={handleAdd}
        className="bg-orange-500 hover:bg-orange-600 transition text-white px-4 py-2 rounded-xl w-full flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart size={18} />
        أضف إلى السلة
      </button>
    </div>
  );
}
