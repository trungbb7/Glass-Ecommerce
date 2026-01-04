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
import { ForgotPassword } from "./components/pages/ForgotPassword";
import { ViewHistory } from "./components/pages/ViewHistory";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect } from "react";
import type { User } from "./types/user";
import { loginUser, logoutUser } from "./components/Auth/authSlice";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchUserInfo(token: string) {
      const reponse = await fetch(`http://localhost:3000/users/${token}`);
      if (reponse.ok) {
        const user = (await reponse.json()) as User;
        dispatch(loginUser(user));
      } else {
        dispatch(logoutUser());
      }
    }

    if (token) {
      fetchUserInfo(token);
    }
  }, [token, dispatch]);

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
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <WishList />
            </ProtectedRoute>
          }
        />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/view-history"
          element={
            <ProtectedRoute>
              <ViewHistory />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
