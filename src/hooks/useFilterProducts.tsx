import { Product } from "../store/useProduct";

const useFilterProducts = () => {
    const _handleFilter = async (value: string) => {
        try {
            if (value != "") {
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products/?title=${value}`
            );
            const products: Product[] = await response.json();
            return products;
            }
            return;
        } catch (error: any) {
            console.error(error);
            return;
        }
    };
    return {
        _handleFilter,
    };
};

export default useFilterProducts;