import i18n from "shared/i18n";
import { PostRecordType } from "shared/types/PostTypes";
import api from "src/api/api";

const postModel = {
  create: async (postData: FormData, token: string): Promise<PostRecordType> => {
    try {
      const response = await api.post("/api/collections/posts/records", postData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  },

  selectAll: async (): Promise<PostRecordType[]> => {
    try {
      const response = await api.get('/api/collections/posts/records');
      return response.data.items;
    } catch (error: any) {
      console.error("Error in select:", error);
      throw new Error("Request failed");
    }
  },

  selectAllFrom: async (field: string, value: string): Promise<PostRecordType[]> => {
    try {
      const filter = encodeURIComponent(`${field}='${value}'`);
      const response = await api.get(`/api/collections/posts/records?filter=${filter}`);
      return response.data.items;
    } catch (error: any) {
      console.error("Error in selectAllFrom:", error);
      throw new Error("Request failed");
    }
  }
};

export default postModel;