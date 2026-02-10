import axios from "axios";

const API = axios.create({
  baseURL: "https://codesoft-backend-wq36.onrender.com/api"
});

export default API;
