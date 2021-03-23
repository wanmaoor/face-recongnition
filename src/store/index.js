import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    countingMode: "非读数模式",
  },
  mutations: {
    change_mode: (state, payload) => {
      state.countingMode = payload;
    },
  },
  actions: {},
  modules: {},
});
