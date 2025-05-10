import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
  themeSchema,
  languageSchema,
  avatarSchema,
  idSchema,
} from 'shared/schemas/userFieldSchemas';
import i18n from 'shared/i18n';

export const registerUserSchema = z
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
  
export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});


