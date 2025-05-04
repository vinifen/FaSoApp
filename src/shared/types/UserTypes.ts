import Email from "../entities/Email";
import Username from "../entities/Username";
import Password from "../entities/Password";

export type UserEntityType = {
  id?: number;
  email: Email;
  username?: Username;
  password?: Password;
  passwordConfirm?: Password;
  theme?: string;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type UserApiType = {
  id?: number;
  email: string;
  username: string;
  password?: string;
  theme?: string;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
};





