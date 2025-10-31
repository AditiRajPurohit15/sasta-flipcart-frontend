import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/products/${id}`);
        const product = res.data.product;
        setTitle(product.title);
        setDescription(product.description);
        setAmount(product.price.amount);
        setCurrency(product.price.currency);
      } catch (error) {
        console.error("Error fetching product:", error);
        alert("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleUpdate = async (e) => {
    e.preventDefault(); // ✅ Correct spelling!

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("amount", amount);
    formData.append("currency", currency);

    images.forEach((img) => formData.append("images", img));

    try {
      await api.put(`/products/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("✅ Product updated successfully!");
      navigate("/seller-dashboard");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update product");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-md mx-auto bg-white shadow-lg p-6 rounded-lg mt-10"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Edit Product</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      >
        <option value="INR">INR</option>
        <option value="USD">USD</option>
      </select>

      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="w-full mb-3"
      />

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded"
      >
        Update Product
      </button>
    </form>
  );
};

export default EditProduct;
