import i18n from "../i18n";
import api from "../utils/api";
import { RegisterUserType, LoginType } from "shared/types/UserTypes";


export default class UserModel {
  readonly uri = "/api/collections/users/records";
  readonly authUri = "/api/collections/users/auth-with-password";

  constructor() {}

  async create(userData: RegisterUserType) {
    try {
      const createUser = await api.post(this.uri, userData);
      return createUser;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  }

  async login(userData: LoginType) {
    try {
      const response = await api.post(this.authUri, {
        identity: userData.email,
        password: userData.password,
      });
      console.log(response);
      return response; 
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("invalid_credentials"));
    }
  }
}
