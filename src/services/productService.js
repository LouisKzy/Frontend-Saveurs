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
  formData.append("categorie", productData.categorie);
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
        categorie: productData.categorie,
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

      console.log("Réponse de téléchargement d'image:", imageResponse);
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
    // Créer un FormData pour les données du produit
    const formData = new FormData();
    formData.append("name", updatedProductData.name);
    formData.append("price", updatedProductData.price);
    formData.append("description", updatedProductData.description);
    formData.append("origin", updatedProductData.origin);
    formData.append("variety", updatedProductData.variety);

    // Vérifier si une nouvelle image est fournie
    if (updatedProductData.image) {
      formData.append("image", updatedProductData.image);
    }

    // Mettre à jour les données du produit en envoyant une requête PUT
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

    // Si une nouvelle image est fournie, mettre à jour l'image associée en envoyant une requête PATCH
    if (updatedProductData.image) {
      const imageId = productResponse.data.id; // Remplacez product_image_id par l'attribut approprié contenant l'ID de l'image dans la réponse

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

      console.log("Image updated successfully:", imageResponse);
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
    console.log("Produit supprimé avec succès.");
    console.log(response);
    return response;
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error);
    throw new Error("La suppression du produit a échoué.");
  }
}
