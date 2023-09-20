import { ref } from 'vue';
import axios from 'axios';
import router from '../routers/index';

// Define reactive variables
const apiData = ref([]);
const apiError = ref([]);
const apiFlag = ref(false);


export function getProduct() {
 
  apiData.value = [];
  apiError.value = [];

 
  const getData = async (url) => {
    try {
      const response = await axios(url);
      apiData.value = response.data;
      apiFlag.value = true;
    } catch (error) {
      console.error("Error fetching data:", error);
      apiError.value = error.message;
    }
  };

  return { apiData, apiError, getData, apiFlag };
}

export async function productAdd(productObj, apiUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.post(apiUrl, productObj);

      if (response.status === 200) {
        const imageData = response.data.imageUrl;
        resolve(imageData);
      } else {
        reject('Error adding product!');
      }
    } catch (error) {
      console.error("Error adding product:", error);
      reject(error);
    }
  });
}

// Function to update a product
export async function ProductUpdate(productObj, apiUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.put(apiUrl, productObj);

      if (response.status === 200) {
        const imageData = response.data.imageUrl;
        resolve(imageData);
      } else {
        reject('Error updating product!');
      }
    } catch (error) {
      console.error("Error updating product:", error);
      reject(error);
    }
  });
}

// Function to delete a product
export async function productDelete(productId, apiUrl) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await axios.delete(`${apiUrl}/${productId}`);

      if (response.status === 200) {
        resolve('Product deleted successfully.');
      } else {
        reject('Error deleting product!');
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      reject(error);
    }
  });
}
