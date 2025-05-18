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

  checkAuth: async (token: string): Promise<{ record: UserRecordType; token: string } | null> => {
    try {
      const response = await api.post("/api/collections/users/auth-refresh", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if(!response.data.record || !response.data.token){
        return null;
      }
      return { record: response.data.record, token: response.data.token };
    } catch (error: any) {
      console.error(error);
      throw new Error("Request failed");
    }
  },

  select: async (userId: string): Promise<UserRecordType> => {
    try {
      const response = await api.get(`/api/collections/users/records/${userId}`);
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
  getPostsWithLikesAndComments: async (userId: string) => {
  const postsRes = await api.get(`/api/collections/posts/records?filter=user='${userId}'`);
  const posts = postsRes.data.items;

  const postDetails = await Promise.all(posts.map(async (post: any) => {
    const [likesRes, commentsRes] = await Promise.all([
      api.get(`/api/collections/likes/records?filter=posts_id='${post.id}'&expand=user`),
      api.get(`/api/collections/comments/records?filter=posts_id='${post.id}'&expand=user`)
    ]);

    return {
      ...post,
      likes: likesRes.data.items,
      comments: commentsRes.data.items
    };
  }));

  return postDetails;
},


  delete: async (userId: string, token: string) => {
    try {
      const response = await api.delete(`/api/collections/users/records/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      console.error("Error in delete:", error);
      throw new Error("Request failed");
    }
  },
};

export default userModel;
