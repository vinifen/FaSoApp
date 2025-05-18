import { getCreatePostSchema } from "shared/schemas/postSchemas";
import { z } from "zod";

export type CreatePostType = z.infer<ReturnType<typeof getCreatePostSchema>>;


export type PostRecordType = {
  collectionId?: string;
  collectionName?: string;
  id: string;
  description?: string;
  image?: string;
  title: string;
  user_id: string;
  created?: string;
  updated?: string;

  // remove this in the future
  likes?: string;
  comments?: string;
  is_liked?: boolean;
  is_commented?: boolean;
  username?: string;
};
  