import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./components/AddProduct";
import { useAuth } from "./context/AuthContext";
import ProctedRutes from "./routes/ProtectedRoute";
import SellerDashboard from "./pages/SellerDashboard";
import EditProduct from "./pages/EditProduct";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";

const App = () => {
  const {user, loading} = useAuth()
  if(loading) return <h2>Loading...</h2>
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Products/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route
        path="/add-Product"
        element={
          <ProctedRutes user={user} allowedRoles={["seller"]}>
            <AddProduct/>
          </ProctedRutes>
        }
        />
        <Route
        path="/seller-dashboard"
        element={
        <ProctedRutes user={user} allowedRoles={["seller"]}>
        <SellerDashboard />
        </ProctedRutes>
  }
/>
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path ="/cart" element={<Cart/>}/>


      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;



