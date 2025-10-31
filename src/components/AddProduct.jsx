import api from "../utils/axiosInstance";
import { useState } from "react";

const AddProduct = () => {
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [amount, setamount] = useState(0);
  const [currency, setcurrency] = useState("INR");
  const [images, setimages] = useState([]);
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    seterror("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("amount", amount);
      formData.append("currency", currency);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i]);
      }

      const res = await api.post("/products/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.message === "product created successfully") {
        alert("✅ Product created successfully!");
        settitle("");
        setdescription("");
        setamount(0);
        setcurrency("INR");
        setimages([]);
      }
    } catch (err) {
      seterror(err.response?.data?.message || "Something went wrong!");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white p-8 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Add Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Description
            </label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              required
              rows="3"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Amount */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setamount(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Currency */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setcurrency(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
            </select>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Images
            </label>
            <input
              type="file"
              multiple
              onChange={(e) => setimages(e.target.files)}
              required
              className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 
                         file:rounded-md file:border-0 file:text-sm 
                         file:font-semibold file:bg-blue-50 file:text-blue-700 
                         hover:file:bg-blue-100"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold text-white transition 
            ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-4 font-medium">{error}</p>
        )}
      </div>
    </div>
  );
};

export default AddProduct;
