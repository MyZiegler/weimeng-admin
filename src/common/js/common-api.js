import axios from 'axios';
// import cookie from "@/common/js/cookie.js";

const myAxios = axios.create({
  // baseURL: `https://esteelauderpos.com/`,
  baseURL: process.env.BaseUrl,
  // headers: {
  //   'Content-Type': 'application/json;charset=UTF-8'
  // },
  // params: {
  //   // token: cookie.getCookie("token")
  // },
});

export default myAxios;
