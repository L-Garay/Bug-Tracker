<template>
  <tr>
    <td>
      <router-link
        class="bug"
        :to="{ name: 'bugDetails', params: { id: bugData.id } }"
      >{{ bugData.title }}</router-link>
    </td>
    <td>{{ bugData.reportedBy }}</td>
    <td v-bind:class="{ closed: isClosed, open: isOpen }">{{ bugData.closed ? "Closed" : "Open" }}</td>
    <td>{{ bugData.updatedAt | formatDate }}</td>
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
tr td {
  text-shadow: 1pt 1pt 1pt grey;
  font-size: 1.2rem;
  color: black;
}
</style>
