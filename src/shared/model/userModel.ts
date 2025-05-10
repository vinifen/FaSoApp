import i18n from "shared/i18n";
import { RegisterUserType, LoginType, UserRecordType } from "shared/types/UserTypes";
import api from "shared/utils/api";

export default function userModel() {
  const createUri = "/api/collections/users/records";
  const loginUri = "/api/collections/users/auth-with-password";
  const refreshAuthUri = "/api/collections/users/auth-refresh";
  const selectUri = (userId: string) => `/api/collections/users/records/${userId}`;
  const updateUri = (userId: string) => `/api/collections/users/records/${userId}`;

  const create = async (userData: RegisterUserType) => {
    try {
      const response = await api.post(createUri, userData);
      return response;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  };
  
  const login = async (userData: LoginType): Promise<{ record: UserRecordType; token: string }> => {
    try {
      const response = await api.post(loginUri, {
        identity: userData.email,
        password: userData.password,
      });
      return { record: response.data.record, token: response.data.token };
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("invalid_credentials"));
    }
  };
  
  const checkAuth = async (token: string): Promise<{ record: UserRecordType; token: string }> => {
    try {
      const response = await api.post(
        refreshAuthUri,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return { record: response.data.record, token: response.data.token };
    } catch (error: any) {
      console.error(error);
      throw new Error("Request failed");
    }
  };
  
  const select = async (userId: string, token: string): Promise<UserRecordType> => {
    try {
      console.log(userId);
      const response = await api.get(selectUri(userId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in select:", error);
      throw new Error("Request failed");
    }
  };
  
  const update = async (userId: string, data: {}, token: string) => {
    try {
      console.log(data, userId);
      const response = await api.patch(updateUri(userId), data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("response", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Error in update:", error);
      throw new Error("Request failed");
    }
  };
  
  return { create, login, checkAuth, select, update };
}
