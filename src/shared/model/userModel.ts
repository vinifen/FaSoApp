import i18n from "shared/i18n";
import { RegisterUserType, LoginType } from "shared/types/UserTypes";
import api from "shared/utils/api";

export default function userModel() {
  const createUri = "/api/collections/users/records";
  const loginUri = "/api/collections/users/auth-with-password";
  const authUri = ""

  const create = async (userData: RegisterUserType) => {
    try {
      const response = await api.post(createUri, userData);
      return response;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  };

  const login = async (userData: LoginType) => {
    try {
      const response = await api.post(loginUri, {
        identity: userData.email,
        password: userData.password,
      });
      return response;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("invalid_credentials"));
    }
  };

  const checkAuth = async (token: string) => {
    try {
      const response = await api.post(
        "/api/collections/users/auth-refresh",
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw new Error("Request failed");
    }
  };
  
  

  return { create, login, checkAuth };
}
