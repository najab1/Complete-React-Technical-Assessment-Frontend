import { useEffect, useState } from "react";
import { getProducts } from "../api/products";
import { Link } from "react-router-dom";

export default function ProductsPage() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getProducts();
            setProducts(data);
        };
        fetchData();
    }, []);

    return (
        <section className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] flex flex-col items-center py-20 px-6 text-white">
            <h1 className="text-4xl font-bold mb-12 text-center">Products</h1>

            {products.length === 0 ? (
                <p className="text-gray-300 text-lg">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl">
                    {products.map((p) => (
                        <Link key={p.id} to={`/products/${p.id}`}>
                            <div className="bg-[#1e1b4b]/60 backdrop-blur-lg border border-white/10 rounded-2xl shadow-lg hover:shadow-[0_0_20px_#8b5cf6] hover:scale-[1.02] transition-transform duration-300 p-5">
                                <img
                                    src={p.images?.[0]}
                                    alt={p.name}
                                    className="w-full h-56 object-cover rounded-xl mb-4"
                                />
                                <h2 className="text-lg font-semibold mb-1">{p.name}</h2>
                                <p className="text-gray-300 text-sm mb-3">{p.description}</p>
                                <p className="text-2xl font-bold text-[#a78bfa]">
                                    ${p.price.toFixed(2)}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}
