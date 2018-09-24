<template>
  <div class="home" id="home">
    <div id="welcome">
      <HelloWorld/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  }
}
</script>
<style>
/* #home {
  background: url('http://thezilla.com/wp-content/uploads/2015/07/orange.jpg');
  background-size: 100%;
} */

#welcome {
  font-size: 30px;
  color: #00695c
}
</style>
