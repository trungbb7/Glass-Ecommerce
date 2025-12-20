import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Products from "./components/pages/Products/Products";
import NotFound from "./components/pages/NotFound/NotFound";
import Cart from "@/components/pages/Cart/Cart.tsx";
import Profile from "@/components/pages/Profile/InnerPages/Profile/Profile.tsx";
import Order from "@/components/pages/Order/Order.tsx";
import Checkout from "@/components/pages/Checkout/Checkout.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="*" element={<NotFound />}/>
        <Route path="/card" element={<Cart />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/orders" element={<Order />}/>
        <Route path="/checkout" element={<Checkout />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
