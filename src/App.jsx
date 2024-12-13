import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/frontend/home/Home";
import Clothes from "./components/pages/backend/clothes/clothes";
import { StoreProvider } from "./components/store/storeContext";
import Category from "./components/pages/backend/category/Category";
import Advertisement from "./components/pages/backend/advertisement/Advertisement";
import Login from "./components/pages/backend/access/Login";
import SetPassword from "./components/pages/backend/access/SetPassword";
import ForgotPassword from "./components/pages/backend/access/ForgotPassword";
import ProductInfo from "./components/pages/frontend/product-info/ProductInfo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";



const App = () => {
   const queryClient = new QueryClient();
  return (
      <QueryClientProvider client={queryClient}>

    <StoreProvider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/product/:slug" element={<ProductInfo/>} />
          <Route path="/admin/clothes" element={<Clothes />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/advertisement" element={<Advertisement />} />

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/set-password" element={<SetPassword />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </StoreProvider>
      </QueryClientProvider>
  );
};

export default App;
