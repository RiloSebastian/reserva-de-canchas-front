import axios from "axios";

const API_URL = "http://localhost:8080/api/email";

const sendVerificationEmail = async (email) => {
  return await axios.post(API_URL + "/verification", { email });
};

export default {
  sendVerificationEmail,
};
