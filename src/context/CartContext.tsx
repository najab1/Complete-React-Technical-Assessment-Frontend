import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type CartItem = {
    id: string;
    name: string;
    price: number;
    images?: string[];
    quantity: number;
};

type CartContextType = {
    cart: CartItem[];
    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: any) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === item.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            }
            return [...prev, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used inside CartProvider");
    return context;
}
