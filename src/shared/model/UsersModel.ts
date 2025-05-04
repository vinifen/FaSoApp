import userToPayload from "shared/mapper/userToPayload";
import i18n from "../i18n";
import api from "../utils/api";
import Email from "shared/entities/Email";
import Password from "shared/entities/Password";

export default class UsersModel {
  readonly uri = "/api/collections/users/records";
  readonly authUri = "/api/collections/users/auth-with-password";

  constructor() {}

  async create(userData: any) {
    try {
      const payload = userToPayload(userData);
      console.log(payload);
      const createUser = await api.post(this.uri, payload);
      return createUser;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("unexpected_error"));
    }
  }

  async login(email: Email, password: Password) {
    try {
      const response = await api.post(this.authUri, {
        identity: email.value,
        password: password.value,
      });
      console.log(response);
      return response; 
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t("invalid_credentials"));
    }
  }
}
