<template>
  <div class="hello">
    <br><br>
    <h1>{{ msg }}</h1>
    <router-link to='/kanban'>
      <div id="start">Start Kanban App</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#start {
  font-size: 40px;
  color:green;
}

</style>
