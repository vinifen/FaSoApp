import { z } from 'zod';
import { getLoginSchema, getRegisterUserSchema } from 'shared/schemas/userSchemas';
export type LoginType = z.infer<ReturnType<typeof getLoginSchema>>;


export type RegisterUserType = z.infer<ReturnType<typeof getRegisterUserSchema>>

export type UserRecordType = {
  id?: string;
  email?: string;
  username?: string;
  avatar?: string;
  collectionId?: string;
  collectionName?: string;
  created?: string;
  updated?: string;
  language?: string;
  theme?: string;
  verified?: boolean;
};




