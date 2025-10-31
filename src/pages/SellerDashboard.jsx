import api from "../utils/axiosInstance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FALLBACK_IMG = "https://via.placeholder.com/300x200?text=No+Image";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [myProducts, setmyProducts] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);

  useEffect(() => {
    setloading(true);
    const fetchMyProducts = async () => {
      try {
        const res = await api.get("/products/my-products");
        setmyProducts(res.data.products);
      } catch (error) {
        seterror("Failed to fetch products");
      } finally {
        setloading(false);
      }
    };
    fetchMyProducts();
  }, []);

  const handleDelete = async (product_id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await api.delete(`/products/delete/${product_id}`);
      alert("Product deleted successfully");

      setmyProducts((prev) => prev.filter((item) => item._id !== product_id));
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete product");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-500 text-lg">Loading...</p>
    );
  if (error)
    return (
      <p className="text-center mt-10 text-red-500 text-lg">{error}</p>
    );
  if (myProducts.length === 0)
    return (
      <p className="text-center mt-10 text-gray-400 text-lg">
        No products found!
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-10 text-center">
        My Products
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {myProducts.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
          >
            <div className="w-full h-44 bg-gray-100">
              <img
                src={
                  item.images && item.images.length
                    ? item.images[0]
                    : FALLBACK_IMG
                }
                alt={`${item.title} thumbnail`}
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = FALLBACK_IMG;
                }}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-5 flex flex-col justify-between min-h-[200px]">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Price:{" "}
                  <span className="font-medium text-gray-800">
                    {item.price.amount}
                  </span>{" "}
                  {item.price.currency}
                </p>
              </div>

              <div className="mt-auto flex flex-col gap-2">
                <button
                  onClick={() => navigate(`/product/${item._id}`)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                >
                  View Details
                </button>

                <button
                  onClick={() => navigate(`/edit/${item._id}`)}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 rounded-lg transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerDashboard;
