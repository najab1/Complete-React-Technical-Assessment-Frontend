import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

export const loginUser = async (email: string, password: string) => {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
};

export default api;
