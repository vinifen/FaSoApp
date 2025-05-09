import { titleSchema, descritionSchema, imageSchema, idPostSchema } from "./postFieldSchemas";
import { idSchema } from "./userFieldSchemas";
import { z } from 'zod';

export const createPostSchema = z.object({
  title: titleSchema,
  description: descritionSchema,
  image: imageSchema,
  userId: idSchema,
  id: idPostSchema
});
