import axios from "axios";
import qs from "querystring";
import { getUrlParam } from "../common/js/utils";

/**
 * 普通get请求
 * @param {*} url
 * @param {*} params
 */
export const get = async (url, params) => {
  const res = await axios.get(url, {
    params
  });
  return res.data;
};

/**
 * 普通post请求
 * @param url
 * @param params
 * @returns {*}
 */
export const post = async (url, params) => {
  const res = await axios.post(url, qs.stringify(params), {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  });
  return res;
};

/**
 * json格式的Post请求
 * @param url
 * @param params
 * @returns {*}
 */
export const postJson = async (url, params) => {
  const res = await axios.post(url, params, {
    headers: {
      "Content-Type": "application/json"
    }
  });
  return res;
};
