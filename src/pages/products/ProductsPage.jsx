import { useState, useEffect } from "react";
import ProductGrid from "../../components/ProductGrid";
import { GetProducts } from "../../services/productService";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await GetProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return <ProductGrid products={products} categoryName="products" />;
};

export default ProductPage;
