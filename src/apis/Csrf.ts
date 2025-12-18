import Api from "./Api";
import Cookie from "js-cookie";

export default {
  getCookie() {
    const token = Cookie.get("XSRF-TOKEN");

    if (token) {
      return new Promise(resolve => {
        resolve(token);
      });
    }

    return Api.get("/sanctum/csrf-cookie");
  },
  deleteCookies() {
    const token = Cookie.get("XSRF-TOKEN");

    if (token) {
      Cookie.remove(token)
    }
  }
};