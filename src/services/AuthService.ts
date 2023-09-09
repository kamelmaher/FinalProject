/** @format */

import ApiClient from "./ApiClicent";

class AuthService {
  LoginUser(email: string, password: string) {
    const data = { email: email, password: password };
    return ApiClient.post("/Auth/login", data);
  }
}

export default new AuthService();
