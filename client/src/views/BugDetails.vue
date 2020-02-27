<template>
  <div class="container-fluid bugDetails">
    <div class="row">
      <div class="col-6 details">
        <h1>Title: {{ bug.title }}</h1>
        <div class="d-flex flex-row justify-content-between">
          <h5>Reported By: {{ bug.reportedBy }}</h5>
          <div class="d-flex">
            Status:
            <p
              v-bind:class="{ closed: bug.closed, open: !bug.closed }"
            >{{ bug.closed ? "Closed" : "Open" }}</p>
          </div>
        </div>
        <p>{{ bug.description }}</p>
        <div>
          <button
            @click="toggleBugEdit"
            class="btn btn-sm btn-success note-btn float-left"
            type="button"
          >Edit Bug</button>
          <button @click="closeBug" class="btn btn-sm btn-danger note-btn float-right">Close Bug</button>
        </div>
        <div v-if="editBugForm" class="editBugForm">
          <form @submit="editBug" class="form-group">
            Change what:
            <textarea
              v-model="editedBug.description"
              class="form-control"
              cols="30"
              rows="3"
              maxlength="300"
              placeholder="What you want"
            ></textarea>
            <button class="btn btn-sm btn-success note-btn mt-2" type="submit">Submit Bug</button>
          </form>
        </div>
      </div>
      <div class="col-6 notes">
        <div class="row">
          <div class="col-12 d-flex justify-content-between mb-1">
            <h2 class="bottom-border">Notes</h2>
            <button @click="toggleForm" class="btn btn-success note-btn" type="button">Add Note</button>
          </div>
          <div class="col-12 mb-4" v-if="showForm">
            <div id="form">
              <form @submit="addNote" class="form-group">
                Who's reporting:
                <input
                  v-model="newNote.reportedBy"
                  class="form-control"
                  required
                  type="text"
                  placeholder="Creator of Note"
                />
                What is the report:
                <textarea
                  v-model="newNote.content"
                  class="form-control"
                  cols="30"
                  rows="3"
                  maxlength="300"
                  placeholder="What you want"
                ></textarea>
                <button class="btn btn-sm btn-success note-btn" type="submit">Submit Note</button>
              </form>
            </div>
          </div>
        </div>
        <div class="row">
          <table style="width:100%">
            <tr>
              <th>Who done it</th>
              <th>What did they do when they did it</th>
              <th>Delete what was done</th>
            </tr>
            <notes v-for="note in notes" :key="note.id" :noteData="note" />
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Notes from "@/components/Notes.vue";
export default {
  name: "BugDetails",
  data() {
    return {
      showForm: false,
      editBugForm: false,
      isOpen: true,
      isClosed: false,
      newNote: {
        reportedBy: "",
        content: "",
        bug: ""
      },
      editedBug: {
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
    toggleBugEdit() {
      if (this.editBugForm == false) {
        this.editBugForm = true;
      } else if (this.editBugForm == true) {
        this.editBugForm = false;
      }
    },
    addNote() {
      let note = {
        reportedBy: this._data.newNote.reportedBy,
        content: this._data.newNote.content,
        bug: this.$route.params.id
      };
      this.$store.dispatch("addNote", note);
      this.newNote = {
        reportedBy: "",
        content: "",
        bug: ""
      };
    },
    closeBug() {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this super important bug!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal(
            "Poof! Your imaginary bug has been squashed and he leaves behind a wife and two kids....",
            {
              icon: "success"
            }
          );
          let bugId = this.$route.params.id;
          this.$store.dispatch("closeBug", bugId);
        } else {
          swal("Your imaginary file is safe...ly in our possession still ");
        }
      });
    },
    editBug() {
      let editedBug = {
        description: this._data.editedBug.description,
        id: this.$route.params.id
      };
      this.$store.dispatch("editBug", editedBug);
      this.editedBug = {
        description: ""
      };
    }
  },
  mounted() {
    this.$store.dispatch("getBugById", this.$route.params.id);
    this.$store.dispatch("getNotes", this.$route.params.id);
    if (this.bug.closed == false) {
      this.isOpen = true;
      this.isClosed = false;
    } else if (this.bug.closed == true) {
      this.isOpen = false;
      this.isClosed = true;
    }
  },
  computed: {
    bug() {
      return this.$store.state.activeBug;
    },
    notes() {
      return this.$store.state.notes;
    }
  },
  components: {
    Notes
  }
};
</script>
<style scoped>
.bugDetails {
  margin-top: 10pt;
}
.details {
  display: flex;
  flex-direction: column;
}
.bottom-border {
  border-bottom: 3px solid yellow;
}
.closed {
  color: red;
}
.open {
  color: greenyellow;
}
.note-btn {
  color: yellow;
  border: 1pt solid yellow;
}
.note-btn:hover {
  color: white;
  border: 1pt solid white;
  box-shadow: 3pt 3pt 3pt black;
}
</style>
