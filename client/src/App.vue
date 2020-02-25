<template>
  <div id="app" class="container-fluid">
    <div id="nav" class="row">
      <div class="col-12 d-flex justify-content-between">
        <img class="bug-logo" src="./assets/sm-bug.png" />
        <router-link to="/">
          <h2>BugTracker</h2>
        </router-link>
        <img class="bug-logo" src="./assets/sm-bug.png" />
      </div>
    </div>
    <div id="foot" class="row">
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url("./assets/grass.jpg");
  height: 100vh;
}

#nav {
  padding: 30px;
  background-color: rgb(0, 128, 0, 0.6);
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: burlywood;
}
.bug-logo {
  height: 30px;
  width: 31px;
  color: white;
}
</style>
