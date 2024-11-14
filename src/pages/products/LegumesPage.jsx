import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "../../components/ProductGrid";
import { API_URL } from "../../constants";

const LegumePage = () => {
  const [legumes, setLegumeProducts] = useState([]);


  useEffect(() => {
    const fetchLegumeProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?category=Légumes`);
        const legumeProducts = response.data.filter(product => product.category === "Légumes");
        setLegumeProducts(legumeProducts);
      } catch (error) {
        console.error("Error fetching legume products:", error);
      }
    };

    fetchLegumeProducts();
  }, []); 

  return (
    <ProductGrid
      products={legumes}
      categoryName="Légumes"
    />
  );
};

export default LegumePage;
