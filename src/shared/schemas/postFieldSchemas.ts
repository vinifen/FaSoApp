import { z } from 'zod';
import i18n from 'shared/i18n';

export function getPostFieldSchemas() {
  return {
    titleSchema: z
      .string()
      .min(3, i18n.t('title_error_amount_min'))
      .max(100, i18n.t('title_error_amount_max')),

    descriptionSchema: z
      .string()
      .max(800, i18n.t('description_error_amount_max'))
      .optional(),

    imageSchema: z
      .instanceof(File)
      .refine(file => file.size <= 15 * 1024 * 1024, {
        message: i18n.t('image_description_error_size'),
      })
      .optional(),

    idPostSchema: z.string().optional(),
  };
}
