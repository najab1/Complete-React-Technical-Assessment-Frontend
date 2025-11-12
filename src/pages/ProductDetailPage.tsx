import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { useCart } from "../context/CartContext";

export default function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<any>(null);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProduct = async () => {
            const all = await getProducts();
            console.log("🧩 All products:", all);
            console.log("🧩 ID from URL:", id);
            const found = all.find(
                (p) => p.id?.trim().toLowerCase() === id?.trim().toLowerCase()
            );
            console.log("🧩 Found product:", found);
            setProduct(found);
        };
        fetchProduct();
    }, [id]);


    if (!product)
        return (
            <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white flex justify-center items-center">
                <p className="text-gray-300 text-lg">Loading...</p>
            </section>
        );

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white flex flex-col items-center py-20 px-6">
            <div className="w-full max-w-5xl bg-[#1e1b4b]/60 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg p-10 flex flex-col lg:flex-row gap-10">
                <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full lg:w-1/2 h-96 object-cover rounded-xl"
                />
                <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-300 mb-6">{product.description}</p>
                    <p className="text-4xl font-bold text-[#a78bfa] mb-6">
                        ${product.price.toFixed(2)}
                    </p>

                    <button
                        onClick={() => {
                            addToCart(product);
                            navigate("/products");
                        }}
                        className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:scale-105 transition-transform duration-300 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </section>
    );
}
