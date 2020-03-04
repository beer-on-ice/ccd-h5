function setServerMap(state, data) {
  state.servermap = data;
}

function saveOrderData(state, data) {
  state.orderData = data;
}

function getDepartData(state, data) {
  state.departData = data;
}

function setUserInfo(state, data) {
  state.userInfo = data;
}

export default {
  setServerMap,
  saveOrderData,
  getDepartData,
  setUserInfo
}
