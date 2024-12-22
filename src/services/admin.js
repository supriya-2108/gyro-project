import axios from "axios";
export const getProductList = async (data) => {
  try {
    const res = await axios(
      `https://gyroserver.vercel.app/admin/v1/operation/get_products_list`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {}
};

export const addProduct = async (data) => {
  try {
    const res = await axios.post(
      `https://gyroserver.vercel.app/admin/v1/operation/create_product/`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {}
};

export const updateProduct = async (data, id) => {
  try {
    const res = await axios.patch(
      `https://gyroserver.vercel.app/admin/v1/operation/update_product/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {}
};

export const deleteProduct = async (id) => {
  try {
    const res = await axios.delete(
      `https://gyroserver.vercel.app/admin/v1/operation/delete_product/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {}
};
