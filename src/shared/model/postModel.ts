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

  select: async (postId: string, token: string): Promise<PostRecordType> => {
    try {
      const response = await api.get(`/api/collections/posts/records/${postId}`, {
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
};

export default postModel;
