import { z } from 'zod';
import i18n from 'shared/i18n';

export function getFieldSchemas() {
  return {
    emailSchema: z
      .string()
      .email(i18n.t('email_error_format'))
      .max(100, i18n.t('email_error_amount')),

    passwordSchema: z
      .string()
      .min(6, i18n.t('password_error_min_length'))
      .max(71, i18n.t('password_error_max_length')),

    usernameSchema: z
      .string()
      .min(3, i18n.t('username_error_amount'))
      .max(60, i18n.t('username_error_amount'))
      .regex(/^[a-zA-Z0-9-_.]+$/, i18n.t('username_error_invalid_characters')),

    passwordConfirmSchema: z
      .object({
        password: z
          .string()
          .min(6, i18n.t('password_error_min_length')),
        passwordConfirm: z
          .string()
          .min(6, i18n.t('password_error_min_length')),
      })
      .refine(data => data.password === data.passwordConfirm, {
        message: i18n.t('password_error_mismatch'),
        path: ['passwordConfirm'],
      }),

    avatarSchema: z
      .instanceof(File)
      .refine(file => file.size <= 10 * 1024 * 1024, {
        message: i18n.t('avatar_error_size'),
      }),

    themeSchema: z.string().optional(),
    languageSchema: z.string().optional(),
    idSchema: z.string().optional(),
  };
}
