import axios from "axios";

let customIp: string | null = null;

try {
  customIp = require("./ip").default;
  console.log("Api with custom ip config")
} catch (_) {
  console.log("Default api config");
}

const api = axios.create({
  baseURL: customIp               // android 
    ? `http://${customIp}:8090/`  // using other device android
    : "http://10.0.2.2:8090/",    // using android simulator 

  // baseURL: "http://localhost:8090/", // ios simulator accessing pocketbase on localhost
  // baseURL: "http://your.own.deploy/", // any case accessing pocketbase hosted online
  
});

export default api;

