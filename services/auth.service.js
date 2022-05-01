import axios from "axios";
const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const signin = async (credentials) => {
  try {
    const response = await axios.post(`${baseUrl}auth/signin`, credentials);
    return response.data;
  } catch (error) {
    return error.response.data;
  }
};

export default {
  signin,
};
