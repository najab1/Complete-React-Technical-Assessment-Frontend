export interface Product {
    id: string;
    name: string;
    description?: string;
    price: number;
    image?: string;        // optional single image for compatibility
    images?: string[];     // array for multiple images (used by backend)
    categoryId?: string;
    sellerId?: string;
    rating?: number;
    createdAt?: string;
}