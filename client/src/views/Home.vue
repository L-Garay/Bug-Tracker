<template>
  <div class="home container-fluid">
    <div class="row">
      <div class="col-12 d-flex justify-content-between pt-3 mb-3">
        <h2>Current Bug Report</h2>
        <button
          class="btn btn-success bug-close-btn"
          type="button"
          data-toggle="modal"
          data-target="#modal"
        >Add a Bug</button>
      </div>
      <div
        class="modal"
        id="modal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Create a Bug</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form class="form-group" @submit.prevent="addBug">
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
                <button class="btn btn-success bug-submit-btn" type="submit">Submit</button>
                <button
                  type="button"
                  class="btn btn-danger bug-close-btn"
                  data-dismiss="modal"
                >Close</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 scrollMe">
        <table class="tableArea" style="width:100%">
          <tr>
            <th>Title</th>
            <th>Reported By</th>
            <th @click="checkList">Status</th>
            <th>Last Modified</th>
          </tr>
          <bug v-for="bug in bugs" :key="bug.id" :bugData="bug" />
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
  mounted() {
    this.$store.dispatch("getBugs");
  },
  data() {
    return {
      showForm: false,
      listOrder: true,
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
      this.$store.dispatch("addBug", bug);
      $("body").removeClass("modal-open");
      $(".modal-backdrop").remove();
      this.newBug = {
        title: "",
        reportedBy: "",
        description: ""
      };
    },
    checkList() {
      if (this.listOrder == true) {
        this.sortList1();
        this.listOrder = false;
      } else if (this.listOrder == false) {
        this.sortList2();
        this.listOrder = true;
      }
    },
    sortList1() {
      this.$store.state.bugs.sort(function(a, b) {
        if (a.closed < b.closed) {
          return -1;
        } else if (a.closed > b.closed) {
          return 1;
        } else if (a.closed == b.closed) {
          return 0;
        }
      });
    },
    sortList2() {
      this.$store.state.bugs.sort(function(a, b) {
        if (a.closed < b.closed) {
          return 1;
        } else if (a.closed > b.closed) {
          return -1;
        } else if (a.closed == b.closed) {
          return 0;
        }
      });
    }
  },
  computed: {
    bugs() {
      return this.$store.state.bugs;
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
  font-size: 1.75rem;
}

#form {
  padding: 10pt 5pt 0pt 5pt;
  border: 2px solid yellow;
  background-color: mediumseagreen;
  color: white;
  margin: 8pt 0;
}
.bug-submit-btn {
  margin: 15px 50pt 0 0;
  color: yellow;
  border: 1pt solid yellow;
}
.bug-submit-btn:hover {
  margin: 15px 50pt 0 0;
  box-shadow: 3pt 3pt 3pt black;
  border: 1pt solid white;
}
.bug-close-btn {
  margin: 15px 0 0 0;
  color: yellow;
  border: 1pt solid yellow;
}
.bug-close-btn:hover {
  margin: 15px 0 0 0;
  box-shadow: 3pt 3pt 3pt black;
  border: 1pt solid white;
}
.close {
  color: green;
}
.close:hover {
  color: red;
  text-shadow: 0 0 3px red;
  cursor: pointer;
}
/* .home {
  max-height: 80vh;
  overflow-y: scroll;
} */
.scrollMe {
  max-height: 75vh;
  overflow-y: scroll;
}
.tableArea {
  background-color: rgb(255, 255, 255, 0.3);
  /* max-height: 50vh; */
}
.modal-header {
  background-color: rgba(223, 247, 9, 0.7);
}
.modal-body {
  background-color: rgb(0, 128, 0, 0.7);
  color: white;
  text-shadow: 1pt 1pt 2pt grey;
}
</style>
