import { useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMG = "https://via.placeholder.com/300x200?text=No+Image";

const Products = () => {

  const navigate = useNavigate();

  const [products, setproducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setloading(true);
      try {
        const res = await api.get("/products/view-product");
        setproducts(res.data.product);
      } catch (error) {
        seterror("Failed to fetch products");
      } finally {
        setloading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
  try {
    const res = await api.post(
      "/cart/add",
      { productId },
      { withCredentials: true }
    );
    alert("✅ Added to cart!");
  } catch (err) {
    alert("⚠️ Failed to add to cart. Please log in.");
  }
};

  if (loading) return <p className="text-center mt-10 text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 text-lg">{error}</p>;
  if (products.length === 0) return <p className="text-center mt-10 text-gray-400 text-lg">No products found!</p>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">All Products</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => (
          <div
          key={item._id}
          className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
          <div className="w-full h-40 bg-gray-100">
            <img src={item.images && item.images.length ? item.images[0]: FALLBACK_IMG} alt={`${item.title} thumbnail`}
            loading= "lazy"
            onError={(e)=>{e.currentTarget.onerror = null; e.currentTarget.src= FALLBACK_IMG;}}
            className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">{item.title}</h2>
          <p className="text-gray-600 text-sm mb-3">
            Price : <span className="font-medium">{item.price.amount}</span> {item.price.currency}
          </p>
          <button className="mt-2 w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
          onClick={()=>navigate(`/product/${item._id}`)}
          >
            view Details
          </button>
          <button
          className="flex-1 bg-green-500 hover:bg-green-600 text-white font-medium py-2 mt-2 px-1 rounded-lg transition"
          onClick={() => handleAddToCart(item._id)}
            >
               Add to Cart
          </button>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
