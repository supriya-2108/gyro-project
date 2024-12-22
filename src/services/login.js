import axios from "axios";
export const loginUser = async (data) => {
  try {
    const res = await axios.post(
      `https://gyroserver.vercel.app/user/v1/login_user`,
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
