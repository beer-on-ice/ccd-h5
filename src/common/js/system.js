import { LocalStorage } from "quasar";

/**
 * 获取用户信息
 */
let getUserInfo = function() {
  let info = LocalStorage.getItem("info");
  return info;
};
