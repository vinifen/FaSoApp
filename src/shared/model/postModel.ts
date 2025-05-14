import i18n from "shared/i18n";
import { CreatePostType, PostRecordType } from "shared/types/PostTypes";
import api from "src/api/api";

export default function userModel() {
  const createUri = "/api/collections/posts/records";
  const selectUri = (userId: string) => `/api/collections/posts/records/${userId}`;
  const updateUri = (userId: string) => `/api/collections/posts/records/${userId}`;

  const create = async (postData: CreatePostType ) => {
    try {
      const response = await api.post(createUri, postData);
      return response;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  };
  
  const select = async (userId: string, token: string): Promise<PostRecordType> => {
    try {
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
  
  const update = async (userId: string, data: {}, token: string): Promise<PostRecordType> => {
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
  
  return { create, select, update };
}
