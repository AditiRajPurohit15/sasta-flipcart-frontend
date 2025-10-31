import api from "../utils/axiosInstance";

// export const getMyProducts = ()=> api.get("/products/my-products")
// export const deleteProduct = (id)=>api.delete(`/products/delete/&{id}`)
// export const getProductById =(id)=> api.get(`/products/%{id}`)
// export const updateProduct = (id, data)=>api.put(`/products/update/&{id}`,data,{headers: { "Content-Type": "multipart/form-data" },})

export const deleteProduct = async (product_id)=>{
    try {
        const res = await api.delete(`/products/delete/${product_id}`)
    return res.data 
    } catch (error) {
        throw error.response?.data || {message: "Delete Failed"}
    }
}