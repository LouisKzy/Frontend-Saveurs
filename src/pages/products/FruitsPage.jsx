import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "../../components/ProductGrid";
import { API_URL } from "../../constants";


const FruitsPage = () => {
  const [fruits, setFruits] = useState([]);
  useEffect(() => {
    const fetchFruits = async () => {
      try {
        const response = await axios.get(`${API_URL}/products?category=Fruits`);
        const fruitProducts = response.data.filter(product => product.category === "Fruits")
        setFruits(fruitProducts);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    };

    fetchFruits();
  }, []);



  return (
    <ProductGrid
      products={fruits}
      categoryName="Fruits"/>
  );
};

export default FruitsPage;
