import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // 🧠 Calculate total price
  const totalPrice = cart.reduce(
    (sum, item) => sum + (item.product.price.amount * item.quantity),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-600">
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty 🛍️</h2>
        <button
          onClick={() => navigate("/products")}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg"
        >
          Go Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Your Cart 🛒
      </h1>

      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        {cart.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center justify-between border-b py-3"
          >
            {/* 🖼️ Product Image */}
            <div className="flex items-center space-x-4">
              <img
                src={
                  item.product.images?.[0] ||
                  "https://via.placeholder.com/80x80?text=No+Image"
                }
                alt={item.product.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h2 className="font-semibold text-gray-800">
                  {item.product.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {item.quantity} × {item.product.price.amount}{" "}
                  {item.product.price.currency}
                </p>
              </div>
            </div>

            {/* ❌ Remove Button */}
            <button
              onClick={() => removeFromCart(item.product._id)}
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Remove
            </button>
          </div>
        ))}

        {/* 💰 Total and Clear */}
        <div className="flex justify-between items-center mt-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Total: {totalPrice.toFixed(2)} INR
          </h2>
          <button
            onClick={clearCart}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Clear Cart
          </button>
        </div>

        {/* 🛍️ Checkout */}
        <div className="text-center mt-8">
          <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
