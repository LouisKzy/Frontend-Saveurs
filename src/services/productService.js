import { API_URL_PRODUCTS } from "../constants";
import axios from "axios";
import Cookie from "js-cookie";

export function GetProducts() {
  return axios.get(API_URL_PRODUCTS);
}

export async function GetProductfetch(productId) {
  try {
    const response = await axios.get(`${API_URL_PRODUCTS}/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("Error fetching product data");
  }
}

export async function AddProductfetch(productData) {
  const formData = new FormData();
  formData.append("name", productData.name);
  formData.append("price", productData.price);
  formData.append("description", productData.description);
  formData.append("origin", productData.origin);
  formData.append("variety", productData.variety);
  formData.append("image", productData.image);
  formData.append("category", productData.category);
  formData.append("isAdmin", productData.isAdmin);

  try {
    const response = await axios.post(API_URL_PRODUCTS, formData, {
      params: {
        isAdmin: productData.isAdmin,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookie.get("token"),
      },
      product: {
        name: productData.name,
        price: productData.price,
        description: productData.description,
        origin: productData.origin,
        variety: productData.variety,
        category: productData.category,
      },
    });

    if (response.status === 201) {
      const productId = response.data.id;
      const imageFormData = new FormData();
      imageFormData.append("image", productData.image);

      const imageResponse = await axios.post(
        `${API_URL_PRODUCTS}/${productId}/product_images`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: Cookie.get("token"),
          },
          params: {
            isAdmin: productData.isAdmin,
          },
        }
      );
      return response;
    } else {
      throw new Error("La création du produit a échoué.");
    }
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error);
    throw error;
  }
}

export async function EditProductfetch(productId, updatedProductData, isAdmin) {
  try {
    const formData = new FormData();
    formData.append("name", updatedProductData.name);
    formData.append("price", updatedProductData.price);
    formData.append("description", updatedProductData.description);
    formData.append("origin", updatedProductData.origin);
    formData.append("variety", updatedProductData.variety);


    if (updatedProductData.image) {
      formData.append("image", updatedProductData.image);
    }


    const productResponse = await axios.put(
      `${API_URL_PRODUCTS}/${productId}`,
      formData,
      {
        params: {
          isAdmin: isAdmin,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookie.get("token"),
        },
        product: {
          name: updatedProductData.name,
          price: updatedProductData.price,
          description: updatedProductData.description,
          origin: updatedProductData.origin,
          variety: updatedProductData.variety,
        },
      }
    );

    if (updatedProductData.image) {
      const imageId = productResponse.data.id; 

      const imageFormData = new FormData();
      imageFormData.append("image", updatedProductData.image);

      const imageResponse = await axios.put(
        `${API_URL_PRODUCTS}/${productId}/product_images/${imageId}`,
        imageFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: Cookie.get("token"),
          },
          params: {
            isAdmin: isAdmin,
          },
        }
      );
      return productResponse;
    } else {
      throw new Error("La mise à jour du produit a échoué.");
    }
  } catch (error) {
    console.error("Error editing product:", error);
    throw error;
  }
}

export async function DeleteProductfetch(productId, isAdmin) {
  try {
    const response = await axios.delete(`${API_URL_PRODUCTS}/${productId}`, {
      params: {
        isAdmin: isAdmin,
      },
      headers: {
        Authorization: Cookie.get("token"),
      },
    });
    return response;
  } catch (error) {
    throw new Error("La suppression du produit a échoué.");
  }
}
