import i18n from "shared/i18n";
import {
  RegisterUserType,
  LoginType,
  UserRecordType,
} from "shared/types/UserTypes";
import api from "src/api/api";

const userModel = {
  create: async (userData: RegisterUserType) => {
    try {
      const response = await api.post("/api/collections/users/records", userData);
      return response;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  },

  login: async (userData: LoginType): Promise<{ record: UserRecordType; token: string }> => {
    try {
      const response = await api.post("/api/collections/users/auth-with-password", {
        identity: userData.email,
        password: userData.password,
      });
      return { record: response.data.record, token: response.data.token };
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("invalid_credentials"));
    }
  },

  checkAuth: async (token: string): Promise<{ record: UserRecordType; token: string }> => {
    try {
      const response = await api.post("/api/collections/users/auth-refresh", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { record: response.data.record, token: response.data.token };
    } catch (error: any) {
      console.error(error);
      throw new Error("Request failed");
    }
  },

  select: async (userId: string, token: string): Promise<UserRecordType> => {
    try {
      const response = await api.get(`/api/collections/users/records/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in select:", error);
      throw new Error("Request failed");
    }
  },

  update: async (userId: string, data: {}, token: string) => {
    try {
      const response = await api.patch(`/api/collections/users/records/${userId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in update:", error);
      throw new Error("Request failed");
    }
  },
};

export default userModel;