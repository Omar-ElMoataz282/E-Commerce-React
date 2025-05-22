import axios from "axios";
import { masterApi } from "./Api";
import Cookie from "cookie-universal";

const cookie = Cookie();
const token = cookie.get("e-commerce");

export const Axios = axios.create({
  baseURL: masterApi,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
