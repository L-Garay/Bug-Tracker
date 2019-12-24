<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-between pt-3">
        <h2>Current Bug Report</h2>
        <button class="btn btn-success" type="button" @click="toggleForm">Add a Bug</button>
      </div>
      <div class="col-12" v-if="showForm">
        <div id="form">
          <form class="form-group" @submit="addBug">
            <div>
              Title:
              <input
                v-model="newBug.title"
                class="form-control"
                required
                type="text"
                placeholder="Title of Bug"
              />
            </div>
            <div>
              Reporter:
              <input
                v-model="newBug.reportedBy"
                class="form-control"
                required
                type="text"
                placeholder="Who's reporting the Bug"
              />
            </div>
            <div>
              Problem:
              <textarea
                v-model="newBug.description"
                class="form-control"
                cols="30"
                rows="3"
                maxlength="300"
                placeholder="Describe the Problem"
              ></textarea>
            </div>
            <button class="btn btn-success bug-submit-btn" type="submit">Submit Bug</button>
          </form>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <table style="width:100%">
          <!-- v-for="bug in bugs" :key="bug.id" -->
          <tr>
            <th>Title</th>
            <th>Reported By</th>
            <th>Status</th>
            <th>Last Modified</th>
          </tr>
          <!-- <bug :bugData="bug" /> -->
          <tr>
            <td>James</td>
            <td>Tiki</td>
            <td>20</td>
            <td>07/22/2017</td>
          </tr>
          <tr>
            <td>Mike</td>
            <td>Bean</td>
            <td>27</td>
            <td>05/22/2018</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Bug from "@/components/BugList.vue";

export default {
  name: "home",
  data() {
    return {
      showForm: false,
      newBug: {
        title: "",
        reportedBy: "",
        description: ""
      }
    };
  },
  methods: {
    toggleForm() {
      if (this.showForm == false) {
        this.showForm = true;
      } else if (this.showForm == true) {
        this.showForm = false;
      }
    },
    addBug() {
      let bug = { ...this.newBug };
      debugger;
      this.$store.dispatch("addBug", bug);
      this.newBug = {
        title: "",
        reportedBy: "",
        description: ""
      };
    }
  },
  components: {
    Bug
  }
};
</script>
<style>
table {
  border: 2px solid black;
  border-collapse: collapse;
}
th {
  border-bottom: 2px solid green;
  border-collapse: collapse;
}
#form {
  padding: 10pt 5pt 0pt 5pt;
  border: 2px solid yellow;
  background-color: mediumseagreen;
  color: white;
  margin: 8pt 0;
}
.bug-submit-btn {
  margin: 15px 0 0 0;
  color: yellow;
}
</style>
