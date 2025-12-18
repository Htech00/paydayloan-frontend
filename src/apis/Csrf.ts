// import Api from "./Api";
// import Cookie from "js-cookie";

// export default {
//   getCookie() {
//     const token = Cookie.get("XSRF-TOKEN");

//     if (token) {
//       return new Promise(resolve => {
//         resolve(token);
//       });
//     }

//     return Api.get("/sanctum/csrf-cookie");
//   },
//   deleteCookies() {
//     const token = Cookie.get("XSRF-TOKEN");

//     if (token) {
//       Cookie.remove(token)
//     }
//   }
// };


import Api from "./Api";
import Cookie from "js-cookie";

export default {
  async getCookie() {
    const token = Cookie.get("XSRF-TOKEN");

    // If token already exists, do nothing
    if (token) {
      return;
    }

    // Fetch CSRF cookie from backend
    await Api.get("/sanctum/csrf-cookie");
  },

  deleteCookies() {
    // Correctly remove by COOKIE NAME
    Cookie.remove("XSRF-TOKEN");
    Cookie.remove("creditflex_session");
  }
};
