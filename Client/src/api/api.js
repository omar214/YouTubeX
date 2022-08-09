import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const API = axios.create({
  baseURL,
  headers: {
    // 'Content-Type': 'application/json',
    // 'Content-Type': 'multipart/form-data',
    authorization: `${localStorage.getItem("access-token")}`,
  },
  transformRequest: [
    function (data, headers) {
      if (data instanceof FormData) {
        headers["Content-Type"] = "multipart/form-data";
      } else {
        headers["Content-Type"] = "application/json";
      }
      if (localStorage.getItem("access-token"))
        headers["authorization"] = `${localStorage.getItem("access-token")}`;
      // Do not change data
      if (data instanceof FormData) {
        return data;
      }
      return JSON.stringify(data);
    },
  ],
});

// api.get(url,
// ,{
//   headers: {
//     authorization: localStorage.getItem("access-token"),
//   },
// })

export default API;
