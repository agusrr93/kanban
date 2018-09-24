<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> ||
       <router-link to="/kanban">Kanban</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#app {
  background: url('http://training-sdm.com/wp-content/uploads/2014/03/asset-management.jpg');
  background-size: 100%;
  min-height: 900px;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
