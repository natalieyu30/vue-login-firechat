<template>
  <div id="nav">
    <router-link to="/firebase">Firebase</router-link> |
    <router-link to="/twitterui">Twitter UI</router-link> 
  </div>
  <router-view/>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import db from '@/data/firebase';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      db.auth().onAuthStateChanged((user) => {
        if (!user) {
          router.replace('/login');
          user.value = 'undefied'
        } else if (route.path == '/login' || route.path == '/register') {
          router.replace('/firebase-home');
        } 
      })
    })
  }
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  color: #444;
}

#nav {
  padding: 14px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #444;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  color: salmon;
}
</style>
