import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import router from "../router";

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
    },
    setAllBugs(state, bugData) {
      state.bugs = bugData;
    },
    setActiveBug(state, bugData) {
      state.activeBug = bugData;
      console.log("ACTIVE BUG", state.activeBug);
    },
    addNote(state, noteData) {
      state.notes.push(noteData);
      console.log("THESE ARE THE NOTES", state.notes);
    },
    setNotes(state, noteData) {
      state.notes = noteData;
    }
  },
  actions: {
    async addBug({ commit, dispatch }, bugData) {
      let res = await _api.post("bugs", bugData);
      commit("addBug", res.data);
      commit("setActiveBug", res.data);
      router.push({
        name: "bugDetails",
        params: { id: res.data.id }
      });
    },
    async getBugs({ commit, dispatch }) {
      let res = await _api.get("bugs");
      commit("setAllBugs", res.data);
    },
    async getBugById({ commit, dispatch }, id) {
      let res = await _api.get("bugs/" + id);
      commit("setActiveBug", res.data);
    },
    async addNote({ commit, dispatch }, noteData) {
      let res = await _api.post("notes", noteData);
      commit("addNote", res.data);
    },
    async getNotes({ commit, dispatch }, id) {
      let res = await _api.get("bugs/" + id + "/notes");
      commit("setNotes", res.data);
    },
    async deleteNote({ commit, dispatch }, note) {
      await _api.delete("notes/" + note.noteId);
      dispatch("getNotes", note.bugId);
    },
    async closeBug({ commit, dispatch }, id) {
      let res = await _api.delete("bugs/" + id);
      commit("setActiveBug", res.data);
    },
    async editBug({ commit, dispatch }, bugData) {
      console.log(bugData.description);
      console.log(bugData.id);

      let res = await _api.put("bugs/" + bugData.id, bugData);
      commit("setActiveBug", res.data);
    }
  },
  modules: {}
});
