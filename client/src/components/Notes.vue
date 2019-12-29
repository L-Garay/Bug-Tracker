<template>
  <tr>
    <td>{{noteData.reportedBy}}</td>
    <td>{{noteData.content}}</td>
    <td @click="deleteNote">
      <i class="far fa-trash-alt"></i>
      <p>{{noteData.id}}</p>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Notes",
  props: ["noteData"],
  methods: {
    deleteNote() {
      let note = {
        noteId: this.noteData.id,
        bugId: this.noteData.bug
      };
      this.$store.dispatch("deleteNote", note);
    }
  }
};
</script>

<style>
</style>