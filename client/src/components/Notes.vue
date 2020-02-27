<template>
  <tr>
    <td>{{noteData.reportedBy}}</td>
    <td>{{noteData.content}}</td>
    <td @click="deleteNote">
      <i class="far fa-trash-alt"></i>
    </td>
  </tr>
</template>

<script>
export default {
  name: "Notes",
  props: ["noteData"],
  methods: {
    deleteNote() {
      swal({
        title: "Are you sure you want to delete note?",
        text:
          "Once deleted, you will not be able to recover this super important note!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal(
            "Poof! Your imaginary file has been totally deleted and not kept on our private server for our own persoanl use!",
            {
              icon: "success"
            }
          );
          let note = {
            noteId: this.noteData.id,
            bugId: this.noteData.bug
          };
          this.$store.dispatch("deleteNote", note);
        } else {
          swal("Your imaginary file is safe!...for now");
        }
      });
    }
  }
};
</script>

<style>
td i {
  color: red;
}
td i:hover {
  color: red;
  cursor: pointer;
  text-shadow: 0 0 3px red;
}
</style>