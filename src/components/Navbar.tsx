import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";

export default function Navbar() {
    const { cartCount } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="bg-[#0f172a]/80 backdrop-blur-md text-white flex justify-between items-center px-10 py-4 shadow-lg">
            <h1
                className="text-2xl font-bold cursor-pointer"
                onClick={() => navigate("/products")}
            >
                🛍️ ReactShop
            </h1>

            <div className="flex items-center gap-8">
                <Link to="/products" className="hover:text-[#a78bfa]">Products</Link>

                <div className="relative">
                    <FaShoppingCart size={20} />
                    {cartCount > 0 && (
                        <span className="absolute -top-2 -right-3 bg-[#8b5cf6] text-xs px-2 py-0.5 rounded-full">
                            {cartCount}
                        </span>
                    )}
                </div>

                {user ? (
                    <button
                        onClick={logout}
                        className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/"
                        className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition-transform"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
}
