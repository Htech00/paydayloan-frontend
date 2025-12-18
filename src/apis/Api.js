import axios from "axios";

// const baseURL = "http://sapphire-loan.test";
// const baseURL = "http://127.0.0.1:8000";

const baseURL = "http://192.168.1.46";
// const baseURL = "https://api-pro.sentiflex.com";

let Api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    'x-sentinel-key': '6552a219-b30a-4764-95b4-d7996a74ed7c'
  },
    maxRedirects: 0,
});

// Api.defaults.withCredentials = true;

// Api.defaults.withXSRFToken = true;
//ok

// Api.defaults.headers.common['Accept'] = 'application/json';


// Api.defaults.maxRedirects = 0;

export default Api;