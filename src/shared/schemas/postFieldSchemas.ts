import { z } from 'zod';
import i18n from 'shared/i18n';

export const titleSchema = z
  .string()
  .min(3, i18n.t('title_error_amount_min'))
  .max(100, i18n.t('title_error_amount_max'));
  
export const descritionSchema = z.
  string()
  .min(5, i18n.t('description_error_amount_min'))
  .max(400, i18n.t('description_error_amount_max'));

export const imageSchema = z
  .instanceof(File)
  .refine(file => file.size <= 15 * 1024 * 1024, {
    message: i18n.t('image_description_error_size')
  })
  
export const idPostSchema = z.string().optional();