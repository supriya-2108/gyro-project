import axios from "axios";
export const getProductListForUser = async () => {
  try {
    const res = await axios(
      `https://gyroserver.vercel.app/user/v1/operation/get_product_list/`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {}
};

export const addProductToCart = async (data) => {
  try {
    const res = await axios.post(
      `https://gyroserver.vercel.app/user/v1/operation/add_product_to_cart/`,
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

export const getCartList = async (data) => {
  try {
    const res = await axios.post(
      `https://gyroserver.vercel.app/user/v1/operation/get_cart_list/`,
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

export const deleteCartList = async (id) => {
  try {
    const res = await axios.delete(
      `https://gyroserver.vercel.app/user/v1/operation/remove_product_from_cart/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return res;
  } catch (error) {}
};
