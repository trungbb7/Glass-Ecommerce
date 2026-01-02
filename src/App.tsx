import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import Products from "./components/pages/Products/Products";
import NotFound from "./components/pages/NotFound/NotFound";
import { Login } from "./components/pages/Login";
import { Register } from "./components/pages/Register";
import { ProductDetail } from "./components/pages/ProductDetail";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { WishList } from "./components/pages/WishList";
import { Contact } from "./components/pages/Contact";
import AboutUs from "./components/pages/AboutUs/AboutUs";

function App() {
  return (
    <BrowserRouter>
      {/* Auto scroll to top when navigating */}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
