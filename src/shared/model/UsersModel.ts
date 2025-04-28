import i18n from "../i18n";
import UserType, { userToPayload } from "../types/UserType";
import api from "../utils/api";

export default class UsersModel {
  readonly uri = "/api/collections/users/records"
  constructor () {}

  async create(userData: UserType) {
    try {
      const payload = userToPayload(userData);
      console.log(payload);
      const createUser = await api.post(
        this.uri,
        payload
      );
      return createUser;
    } catch (error: any) {
      console.error(error);
      throw Error(i18n.t('unexpected_error'));
    }
  }
}