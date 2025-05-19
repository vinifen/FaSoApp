import axios from "axios";

let customIp: string | null = null;

try {
  customIp = require("./ip").default;
  console.log("Api with custom ip config");
} catch (_) {
  console.log("Default api config");
}

const resolvedIp = customIp || "10.0.2.2";
const baseURL = `http://${resolvedIp}:8090/`;

const api = axios.create({ baseURL });

export { api, resolvedIp, baseURL };
export default api;
