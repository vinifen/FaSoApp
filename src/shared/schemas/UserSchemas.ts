// UserSchemas.ts
import { z } from 'zod';
import {
  emailSchema,
  passwordSchema,
  usernameSchema,
  themeSchema,
  languageSchema,
  rememberMeSchema,
  createdAtSchema,
  updatedAtSchema,
  idSchema,
} from 'shared/schemas/UserFieldSchemas';
import i18n from 'shared/i18n';

export const registerUserSchema = z
  .object({
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema,
    passwordConfirm: z.string(),
    theme: themeSchema.optional(), 
    language: languageSchema.optional(),
    rememberMe: rememberMeSchema.optional(),
    createdAt: createdAtSchema.optional(),
    updatedAt: updatedAtSchema.optional(),
    id: idSchema.optional(),
  })
  .refine(data => data.password === data.passwordConfirm, {
    message: i18n.t('password_error_mismatch'),
    path: ['passwordConfirm'],
  });

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});
