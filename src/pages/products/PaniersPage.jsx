import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../constants";
import ProductGrid from "../../components/ProductGrid";
const PanierPage = () => {
  const [panierProducts, setPanierProducts] = useState([]);

  useEffect(() => {
    const fetchPanierProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?category=Paniers`);
        const panierProducts = response.data.filter(product => product.category === "Paniers");
        setPanierProducts(panierProducts);
      } catch (error) {
        console.error("Error fetching panier products:", error);
      }
    };

    fetchPanierProducts();
  }, []);


  return (
    <ProductGrid
      products={panierProducts}
      categoryName="paniers"
    />
  );
};

export default PanierPage;
