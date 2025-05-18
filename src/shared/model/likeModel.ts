import i18n from "shared/i18n";
import { LikeRecordType } from "shared/types/LikeTypes";
import api from "src/api/api";

const userModel = {
  create: async (user_id: string, token: string): Promise<LikeRecordType> => {
    try {
      const response = await api.post(
        "/api/collections/likes/records", 
        user_id, {
          headers: {
            Autorization: `Bearer ${token}`,
          },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  },

  select: async (id: string): Promise<LikeRecordType> => {
    try {
      const response = await api.get(`/api/collections/likes/records/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error in select:", error);
      throw new Error("Request failed");
    }
  },

  delete: async (userId: string, token: string) => {
    try {
      const response = await api.delete(`/api/collections/likes/records/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response;
    } catch (error: any) {
      console.error("Error in delete:", error);
      throw new Error("Request failed");
    }
  },

  selectAll: async (): Promise<LikeRecordType[]> => {
    try {
      const response = await api.get('/api/collections/likes/records');
      return response.data.items;
    } catch (error: any) {
      console.error("Error in selectAllFrom:", error);
      throw new Error("Request failed");
    }
  },

  selectAllFrom: async (field: string, value: string): Promise<LikeRecordType[]> => {
    try {
      const filter = encodeURIComponent(`${field}='${value}'`);
      const response = await api.get(`/api/collections/likes/records?filter=${filter}`);
      return response.data.items;
    } catch (error: any) {
      console.error("Error in selectAllFrom:", error);
      throw new Error("Request failed");
    }
  }
};

export default userModel;
