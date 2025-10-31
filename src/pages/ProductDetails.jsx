import {useParams} from "react-router-dom"
import { useEffect, useState } from "react";
import api from "../utils/axiosInstance"

const ProductDetails = () => {
    const {id} = useParams();
    const [product, setproduct] = useState(null);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState("");
    const [mainImage, setmainImage] = useState("")

    useEffect(()=>{
        const fetchProduct = async()=>{
            setloading(true);
            try {
                const res = await api.get(`/products/view-product/${id}`)
                setproduct(res.data.product);
                setmainImage(res.data.product.images[0]);
            } catch (error) {
                seterror("Failed to load product Details")
            }finally{
                setloading(false)
            }
        }
        fetchProduct()
    },[id])

    if (loading) return <p className="text-center mt-10 text-gray-500 text-lg">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500 text-lg">{error}</p>;
  if (!product) return <p className="text-center mt-10 text-gray-400 text-lg">Product not found</p>;


  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl">
        <img 
        src={mainImage || "https://via.placeholder.com/400"}

        alt={product.title} 
        className="w-full h-64 object-cover rounded-lg mb-6"
        />
        <div className="flex gap-2 mt-4">
            {product.images.map((img, index)=>(
                <img 
                key={index}
                src={img}
                alt={`Thumbnail ${index+1}`}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer  border-2 ${mainImage === img ? "border-blue-500": "border-transparent"}`}
                onClick={() => setmainImage(img)}
                />
            ))}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
        <p className="text-gray-600 text-lg mb-4">{product.description}</p>
        <p className="text-gray-800 font-semibold text-xl">
          {product.price.amount} {product.price.currency}
        </p>
      </div>
    </div>
  );
}

export default ProductDetails;
