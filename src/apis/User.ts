import Api from "./Api";
import store from "@/store";

export default {
  async register(form) {
    // await Csrf.getCookie();

    return Api.post("/api/user/register", form);
  },

  async getBanks() {
    // await Csrf.getCookie();

    return Api.get("/api/banks");
  },

  async checkExistingUser(ippisNumber, phoneNumber, email) {
    // await Csrf.getCookie();

    return Api.get(`api/user/details/ippis?ippis=${ippisNumber}&phone_number=${phoneNumber}&email=${email}`);
  },

  async validateAccount(form) {
    // await Csrf.getCookie();

    return Api.post("api/banks/account/validate", form);
  },

  async resetPassword(form) {
    const tokenData = store.getters['auth/token'];
    return Api.post("api/admin/user/password/reset", form, {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  },

  async login(form) {
    // await Csrf.getCookie();

    return Api.post("/api/user/login", form);
  },

  async logout() {
    // await Csrf.getCookie();
    // Api.post("/logout");
    // await Csrf.deleteCookies();
  },

  async auth() {
    const tokenData = store.getters['auth/token'];
    return Api.get("/api/user", {
      headers: {
        Authorization: 'Bearer '+tokenData['token']
      }
    });
  }
};