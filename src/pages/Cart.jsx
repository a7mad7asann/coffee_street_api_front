import { useCart } from "../context/CartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, addFromCart, removeFromCart, clearCart } = useCart();
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data.products || []))
      .catch((error) => console.error("خطأ في تحميل المنتجات:", error));

    document.documentElement.dir = "rtl"; // دعم اتجاه RTL تلقائيًا
  }, [cart]);

  const totalPrice = cart.reduce((acc, cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    return product ? acc + product.price * cartItem.quantity : acc;
  }, 0);

  const handleCheckout = () => {
    if (cart.length === 0) return;

    let message = "🛒 تفاصيل الطلب:\n";
    cart.forEach((item, index) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return;
      message += `${index + 1}- ${product.name} (${item.selectedTag}) - ${item.quantity}x\n`;
    });

    message += `\nإجمالي السعر: ${totalPrice.toFixed(2)} ريال`;
    message += `\nإجمالي المنتجات: ${cart.length}`;

    const phoneNumber = "201061380485";
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  return (
    <div className="p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-4">
        🛒 {cart.length > 0 ? "سلة المشتريات" : "السلة فارغة"}
      </h2>

      {cart.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {cart.map((cartItem, index) => {
              const product = products.find((p) => p.id === cartItem.id);
              if (!product) return null;

              return (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-4 border border-gray-200">
                  <img src={product.image} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
                  <h3 className="mt-3 text-lg font-semibold">{product.name}</h3>

                  <div className="flex justify-between items-center mt-2">
                    <p className="font-medium text-orange-500">{cartItem.selectedTag}</p>
                    <span className="text-l font-medium text-gray-500">{product.price} ريال</span>
                  </div>

                  <div className="flex justify-evenly items-center mt-3">
                    <span className="text-sm text-gray-600">
                      الكمية: {cartItem.quantity}
                    </span>

                    <button
                      onClick={() => addFromCart(cartItem.id, cartItem.selectedTag)}
                      className="bg-yellow-900 text-white px-2 py-1 rounded-md"
                    >
                      إضافة واحدة
                    </button>

                    <button
                      onClick={() => removeFromCart(cartItem.id, cartItem.selectedTag)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md"
                    >
                      إزالة واحدة
                    </button>

                    <button
                      onClick={() => removeFromCart(cartItem.id, cartItem.selectedTag, true)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md"
                    >
                      إزالة الكل
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-lg font-semibold">
            إجمالي السعر: {totalPrice.toFixed(2)} ريال
          </div>

          <div className="flex justify-start gap-2 items-center">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
            >
              العودة للصفحة الرئيسية
            </button>

            <button
              onClick={handleCheckout}
              className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
            >
              إكمال الشراء عبر واتساب
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">لا توجد منتجات في السلة.</p>
      )}
    </div>
  );
}
