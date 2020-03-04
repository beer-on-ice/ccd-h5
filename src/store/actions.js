import api from '../api/common'
import axios from 'axios';

export default {
  async getServerMap({ commit }) {
    try {
      const { data } = await api.getServer();
      axios.defaults.baseURL = data.zuulServerUrl;
      commit('setServerMap', data || []);
    } catch (e) {
      console.log('setServerMap', e);
    }
  }
}
