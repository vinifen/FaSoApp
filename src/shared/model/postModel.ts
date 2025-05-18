import i18n from "shared/i18n";
import { PostRecordType } from "shared/types/PostTypes";
import api from "src/api/api";

export default function postModel() {
  const createUri = "/api/collections/posts/records";
  const selectUri = (postId: string) => `/api/collections/posts/records/${postId}`;
 const updateUri = (postId: string) => `/api/collections/posts/records/${postId}`;

  const create = async (postData: FormData, token: string): Promise<PostRecordType> => {
    try {
     
      const response = await api.post(
        createUri,
        postData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      );
      const record: PostRecordType = response.data
      return record;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  };
  
  const select = async (postId: string, token: string): Promise<PostRecordType> => {
    try {
      const response = await api.get(selectUri(postId), {
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

  // const selectAll = async (token: string): Promise<PostRecordType> => {
  //   try {
  //     const response = await api.get(selectUri(postId), {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     return response.data;
  //   } catch (error: any) {
  //     console.error("Error in select:", error);
  //     throw new Error("Request failed");
  //   }
  // };
  
//   const update = async (postId: string, formData: FormData, token: string): Promise<PostRecordType> => {
//   try {
//     const response = await api.patch(
//       updateUri(postId),
//       formData,
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // NÃO defina 'Content-Type', o axios faz isso automaticamente para FormData
//         },
//       }
//     );
//     return response.data as PostRecordType;
//   } catch (error: any) {
//     console.error("Error in update:", error);
//     throw new Error(i18n.t("unexpected_error"));
//   }
// };


  
  return { create, select};
}
