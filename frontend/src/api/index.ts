import axios from "axios";

const port = "3333";

export const api = axios.create({
  baseURL: `http://192.168.1.30:${port}`,
  timeout: 7000,
});
