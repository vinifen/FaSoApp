import { z } from 'zod';
import { getPostFieldSchemas } from './postFieldSchemas';
import { getFieldSchemas } from './userFieldSchemas';

export function getCreatePostSchema() {
  const {
    titleSchema,
    descriptionSchema,
    imageSchema,
    idPostSchema,
  } = getPostFieldSchemas();

  const { idSchema } = getFieldSchemas();

  return z.object({
    title: titleSchema,
    description: descriptionSchema,
    image: imageSchema,
    userId: idSchema,
    id: idPostSchema,
  });
}
