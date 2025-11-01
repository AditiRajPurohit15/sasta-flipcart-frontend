import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShoppingCart, Search } from "lucide-react";
import { useCart } from "../context/CartContext";
import { useState } from "react";


const Navbar = () => {

  const [searchQuery, setSearchQuery] = useState("");

  const { cartCount } = useCart();

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    alert("Logged out successfully!");
    navigate("/login");
  };

  // pages where we show only logo
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  if (isAuthPage) {
    return (
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-center items-center px-6 py-3">
          <Link
            to="/products"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
          >
            MyStore 🛍️
          </Link>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Logo (Home - All Products) */}
        <Link
          to="/products"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          MyStore 🛍️
        </Link>

        {/* Search bar */}
        {/* <div className="hidden md:flex items-center mx-6 max-w-md bg-gray-100 rounded-lg px-3 py-1">
          <Search className="text-gray-500 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (location.pathname !== "/products") navigate("/products");
            }}
            className="bg-transparent focus:outline-none text-sm text-gray-700"
          />
        </div> */}

        {/* Nav Links */}
        <div className="hidden md:flex items-center space-x-6 font-medium text-gray-700">
          {user?.role === "seller" && (
            <Link
              to="/seller-dashboard"
              className="hover:text-indigo-600 transition"
            >
              My Products
            </Link>
          )}
        </div>

        {/* Right side buttons */}
        <div className="flex items-center space-x-4">
          {/* Cart icon */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => navigate("/cart")}
          >
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs rounded-full px-1.5">
              {cartCount}
            </span>
          </button>

          {/* Auth Buttons */}
          {user ? (
            <>
              <span className="hidden sm:inline text-sm font-medium text-gray-700">
                👋 {user.fullname.split(" ")[0]}
              </span>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
