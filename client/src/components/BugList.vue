<template>
  <div class="bug">
    <router-link :to="{name: 'bugDetails', params: {id: bugData.id}}">
      <tr>
        <td>{{bugData.title}}</td>
        <td>{{bugData.reportedBy}}}</td>
        <td>{{bugData.status}}</td>
        <td>{{bugData.lastModified}}</td>
      </tr>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Bug",
  props: ["bugData"]
};
</script>

<style>
</style>