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


const App = () => {
  return (
    <StoreProvider>
      <Router>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/admin/clothes" element={<Clothes />} />
          <Route path="/admin/category" element={<Category />} />
          <Route path="/admin/advertisement" element={<Advertisement />} />

          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/set-password" element={<SetPassword />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </StoreProvider>
  );
};

export default App;
