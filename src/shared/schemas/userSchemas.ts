import { z } from 'zod';
import { getFieldSchemas } from './userFieldSchemas';
import i18n from 'shared/i18n';

export function getRegisterUserSchema() {
  const {
    emailSchema,
    usernameSchema,
    passwordSchema,
    themeSchema,
    languageSchema,
    avatarSchema,
    idSchema,
  } = getFieldSchemas();

  return z
    .object({
      email: emailSchema,
      username: usernameSchema,
      password: passwordSchema,
      passwordConfirm: z.string(),
      theme: themeSchema,
      avatarSchema: avatarSchema.optional(),
      language: languageSchema,
      id: idSchema,
    })
    .refine(data => data.password === data.passwordConfirm, {
      message: i18n.t('password_error_mismatch'),
      path: ['passwordConfirm'],
    });
}

export function getLoginSchema() {
  const { emailSchema, passwordSchema } = getFieldSchemas();

  return z.object({
    email: emailSchema,
    password: passwordSchema,
  });
}
