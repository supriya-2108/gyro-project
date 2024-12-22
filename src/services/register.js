import axios from "axios";

export const generateOTP = async (data) => {
  try {
    const res = await axios.post(
      `https://gyroserver.vercel.app/user/v1/get_otp`,
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

export const generateUser = async (data) => {
  try {
    const res = await axios.post(
      `https://gyroserver.vercel.app/user/v1/create_user`,
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
