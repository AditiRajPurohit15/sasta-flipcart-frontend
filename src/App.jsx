import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./components/AddProduct";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="products" element={<Products/>} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      </BrowserRouter>
      <AddProduct/>
    </div>
  );
}

export default App;
