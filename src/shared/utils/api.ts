import axios from "axios";

const api = axios.create({
  baseURL: "http://10.0.2.2:8090/", // android emulator accessing pocketbase on localhost
  // baseURL: "http://localhost:8090/", // ios simulator accessing pocketbase on localhost
  // baseURL: "http://your.own.deploy/", // any case accessing pocketbase hosted online
});

export default api;