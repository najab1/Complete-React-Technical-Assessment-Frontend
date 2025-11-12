import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ProtectedRoute from "./routes/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Public route (no navbar) */}
            <Route path="/" element={<Login />} />

            {/* Protected routes (with navbar) */}
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <Products />
                  </>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products/:id"
              element={
                <ProtectedRoute>
                  <>
                    <Navbar />
                    <ProductDetailPage />
                  </>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};

export default App;
