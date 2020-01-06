<template>
  <tr>
    <td>
      <router-link
        class="bug"
        :to="{name: 'bugDetails', params: {id: bugData.id}}"
      >{{bugData.title}}</router-link>
    </td>
    <td>{{bugData.reportedBy}}</td>
    <td v-bind:class="{closed: isClosed, open: isOpen}">{{bugData.closed}}</td>
    <td>{{bugData.updatedAt}}</td>
  </tr>
</template>

<script>
export default {
  name: "Bug",
  props: ["bugData"],
  data() {
    return {
      isClosed: false,
      isOpen: true
    };
  },
  mounted() {
    if (this.bugData.closed == false) {
      this.isOpen = true;
      this.isClosed = false;
    } else if (this.bugData.closed == true) {
      this.isOpen = false;
      this.isClosed = true;
    }
  }
};
</script>

<style scoped>
.closed {
  color: red;
}
.open {
  color: greenyellow;
}
.bug {
  color: black;
}
</style>
