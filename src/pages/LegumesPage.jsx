import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "../components/ProductGrid";
import { API_URL } from "../constants";

const LegumePage = () => {
  const [legumeProducts, setLegumeProducts] = useState([]);


  useEffect(() => {
    const fetchLegumeProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?category=Légumes`);
        console.log(response.data);
        const legumeProducts = response.data.filter(product => product.category === "Légumes");
        console.log(legumeProducts);
        setLegumeProducts(legumeProducts);
      } catch (error) {
        console.error("Error fetching legume products:", error);
      }
    };

    fetchLegumeProducts();
  }, []);

  return (
    <ProductGrid
      products={legumeProducts}
      categoryName="legumes"
    />
  );
};

export default LegumePage;
