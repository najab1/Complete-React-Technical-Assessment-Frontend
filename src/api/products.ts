import { mockProducts } from "../data/mockData";

export const getProducts = async () => {

    await new Promise((res) => setTimeout(res, 300));
    return mockProducts;
};
