import axios from "axios";
import { API_URL } from "../constants";
import Cookie from "js-cookie";

export async function GetProducts() {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des produits : " + error.message);
  }
}

export async function DeleteProductfetch(productId, isAdmin) {
  try {
    const response = await axios.delete(`${API_URL}/products/${productId}`, {
      params: { isAdmin },
      headers: {
        Authorization: Cookie.get("token"),
      },
    });
    return response;
  } catch (error) {
    throw new Error("Erreur lors de la suppression du produit : " + error.message);
  }
}

export async function GetOrders(isAdmin) {
  try {
    const response = await axios.get(`${API_URL}/orders`, {
      params: { isAdmin },
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token"),
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des commandes : " + error.message);
  }
}