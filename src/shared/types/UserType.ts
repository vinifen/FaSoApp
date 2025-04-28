import Email from "../entities/Email";
import Username from "../entities/Username";
import Password from "../entities/Password";

type UserType = {
  id?: number;
  email: Email;
  username: Username;
  password?: Password;
  passwordConfirm?: Password;
  theme?: string;
  language?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export function userToPayload(user: UserType) {
  return {
    email: user.email.value,     
    username: user.username.value,
    password: user.password?.value,
    passwordConfirm: user.passwordConfirm?.value,
    theme: user.theme,
    language: user.language,
  };
}


export default UserType;
