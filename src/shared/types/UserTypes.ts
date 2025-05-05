import { z } from 'zod';
import { loginSchema, registerUserSchema } from 'shared/schemas/UserSchemas';

export type LoginType = z.infer<typeof loginSchema>;


export type RegisterUserType = z.infer<typeof registerUserSchema>

// export type UserApiType = {
//   id?: number;
//   email: string;
//   username: string;
//   password?: string;
//   theme?: string;
//   language?: string;
//   createdAt?: Date;
//   updatedAt?: Date;
// };




