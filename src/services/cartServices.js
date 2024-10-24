import axios from "axios";
import { API_URL_CART,API_URL } from "../constants";
import Cookie from "js-cookie";
export async function GetCart() {
  try {
    const response = await axios.get(API_URL_CART, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token")
      }
    });

    console.log('Cart:', response);
    return response; 
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error; 
  }
}
export async function AddProductToCart(productId) {
  try {
    const response = await axios.post(`${API_URL}/cart_products`, {
      productId: productId // Envoyer l'ID du produit dans le corps de la requête
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token")
      }
    });
    console.log('Product added to cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error);
    throw error;
  }
}

export async function RemoveFromCart(productId) {
  try {
    const response = await axios.delete(
      `${API_URL}/cart_products/${productId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token")
      },
      params: {
        productId: productId
      }
    });

    console.log('Product removed from cart:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error removing product from cart:', error);
    throw error;
  }
}

