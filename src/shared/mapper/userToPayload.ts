import { UserEntityType } from "../types/UserTypes";

export default function userToPayload(user: UserEntityType) {
  return {
    email: user.email.value,     
    username: user.username.value,
    password: user.password?.value,
    passwordConfirm: user.passwordConfirm?.value,
    theme: user.theme,
    language: user.language,
  };
}

