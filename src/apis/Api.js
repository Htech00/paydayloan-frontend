// import axios from "axios";

// // const baseURL = "http://sapphire-loan.test";
// // const baseURL = "http://127.0.0.1:8000";

// const baseURL = "http://192.168.1.46";
// // const baseURL = "https://api-pro.sentiflex.com";

// let Api = axios.create({
//   baseURL: baseURL,
//   headers: {
//     'x-sentinel-key': '050adbc2-4805-4684-8b92-722412dc1387',
//    'Accept-Encoding': 'gzip, deflate, br',
//     'Connection': 'keep-alive'
//   }
// });

// Api.defaults.withCredentials = true;

// // Api.defaults.withXSRFToken = true;
// //ok

// Api.defaults.headers.common['Accept'] = '*/*';


// Api.defaults.maxRedirects = 0;

// export default Api;

import axios from "axios";

const Api = axios.create({
  //baseURL: "http://192.168.1.46",Base url for the frontend localhost
  baseURL: "http://192.168.1.46", // Base url for the server on same domain origin
  withCredentials: true,
  headers: {
    'x-sentinel-key': '6552a219-b30a-4764-95b4-d7996a74ed7c',
    'Accept-Encoding': 'gzip, deflate, br',
    'Connection': 'keep-alive',
    'Accept': 'application/json'
  }
});

// Api.defaults.withCredentials = true;

// Only if you really need this
// Api.defaults.maxRedirects = 0;

export default Api;
