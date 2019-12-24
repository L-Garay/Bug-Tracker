import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

let _api = axios.create({
  baseURL: "//localhost:3000/api"
});

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    bugs: [],
    activeBug: {},
    notes: []
  },
  mutations: {
    addBug(state, bugData) {
      state.bugs.push(bugData);
      console.log(state.bugs);
    }
  },
  actions: {
    async addBug({ commit, dispatch }, bugData) {
      debugger;
      let res = await _api.post("bugs", bugData);
      commit("addBug", res.data);
    }
  },
  modules: {}
});
