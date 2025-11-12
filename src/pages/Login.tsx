import React, { useState } from "react";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await loginUser(email, password);
            if (res.success) {
                login(res.data.user, res.data.token);
                alert("Login successful!");
                navigate("/products");
            } else {
                setError(res.message || "Login failed");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black">
            {/* 🌈 Animated gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-purple-500/10 to-pink-500/20 animate-gradientMove"></div>

            {/* ✨ Login Card */}
            <div className="relative z-10 bg-gray-900/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4 text-gray-100">
                {/* 🧿 Logo area */}
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-3xl font-bold tracking-tight">Welcome Back</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        Log in to continue to your dashboard
                    </p>
                </div>

                {error && (
                    <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
                )}

                {/* 🧠 Login form */}
                <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800/70 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full p-3 rounded-lg bg-gray-800/70 text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="relative w-full py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-700/30 transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Don’t have an account?{" "}
                    <span className="text-indigo-400 hover:underline cursor-pointer">
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default Login;
