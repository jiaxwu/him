import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let store = new Vuex.Store({
  state: {
    wsurl: "ws://127.0.0.1:8080/ws",
    token: "",
    imcli: null,
    userId: 0,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
    setImcli(state, imcli) {
      state.imcli = imcli;
    },
  },
});

export default store;
