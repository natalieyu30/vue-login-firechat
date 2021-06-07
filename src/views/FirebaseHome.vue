<template>
  <div class="home">
    <h1>Welcome, {{ name }}</h1>
    <router-link to='/twitterui'>Twitter</router-link>
    <br>
    <button @click="Logout">Logout</button>
  </div>
</template>

<script>
import { ref, onBeforeMount } from 'vue';
import db from '@/data/firebase';

export default {
  setup() {
    const name = ref('');

    onBeforeMount(() => {
      const user = db.auth().currentUser;
      if (user) {
        name.value = user.email.split('@')[0];
      }
    })

    const Logout = () => {
      db.auth().signOut().then(() =>  console.log('Signed out'))
      .catch(err => alert(err.message))
    }
    return {name, Logout}
  }
}
</script>

<style>

</style>