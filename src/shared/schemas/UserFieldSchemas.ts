// UserFieldSchemas.ts
import { z } from 'zod';
import i18n from 'shared/i18n';

export const emailSchema = z
  .string()
  .email(i18n.t('email_error_format'))
  .max(100, i18n.t('email_error_amount'));

export const passwordSchema = z
  .string()
  .min(6, i18n.t('password_error_min_length'))
  .max(71, i18n.t('password_error_max_length'));

export const usernameSchema = z
  .string()
  .min(3, i18n.t('username_error_amount'))
  .max(60, i18n.t('username_error_amount'))
  .regex(/^[a-zA-Z0-9-_.]+$/, i18n.t('username_error_invalid_characters'));

export const passwordConfirmSchema = z
  .object({
    password: passwordSchema,
    passwordConfirm: z.string().min(6, i18n.t('password_error_min_length')),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: i18n.t('password_error_mismatch'),
    path: ['passwordConfirm'],
  });
export const avatarSchema = z
  .string().optional();

export const themeSchema = z.string().optional();
export const languageSchema = z.string().optional();
export const idSchema = z.number().optional();
