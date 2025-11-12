import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

export default function CartIndicator() {
    const { cartCount } = useCart();

    if (cartCount === 0) return null; // hide if cart empty

    return (
        <div className="fixed top-6 right-8 bg-[#1e1b4b]/70 px-4 py-2 rounded-full flex items-center gap-2 text-white shadow-lg border border-white/10 z-50">
            <FaShoppingCart className="text-xl" />
            <span className="font-semibold">{cartCount}</span>
        </div>
    );
}
