import axios from "axios";

// const baseURL = "http://sapphire-loan.test";
// const baseURL = "http://127.0.0.1:8000";

const baseURL = "/";
// const baseURL = "https://api-pro.sentiflex.com";

let Api = axios.create({
  baseURL: baseURL,
  headers: {
    'x-sentinel-key': '050adbc2-4805-4684-8b92-722412dc1387'
  }
});

// Api.defaults.withCredentials = true;

// Api.defaults.withXSRFToken = true;
//ok

Api.defaults.headers.common['Accept'] = 'application/json';


Api.defaults.maxRedirects = 0;

export default Api;