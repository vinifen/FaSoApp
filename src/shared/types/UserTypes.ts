import { z } from 'zod';
import { loginSchema, registerUserSchema } from 'shared/schemas/UserSchemas';

export type LoginType = z.infer<typeof loginSchema>;


export type RegisterUserType = z.infer<typeof registerUserSchema>

export type UserRecordType = {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  collectionId?: string;
  collectionName?: string;
  created?: string;
  updated?: string;
  language: string;
  theme: string;
  verified?: boolean;
};




