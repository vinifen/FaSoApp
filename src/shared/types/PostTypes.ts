import { createPostSchema } from "shared/schemas/postSchemas";
import { z } from "zod";

export type CreatePostType = z.infer<typeof createPostSchema>;


export type PostRecordType = {
    collectionId?: string;
    collectionName?: string;
    id?: string;
    description?: string;
    image?: string;
    title?: string;
    user_id?: string;
    created?: string;
    updated?: string;
  };
  