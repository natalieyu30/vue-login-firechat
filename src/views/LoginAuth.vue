<template>
  <div class="login w-1/2 m-auto mt-8 p-6 rounded-lg bg-gray-100" >
    <h1>Login</h1>
    <form @submit.prevent="Login" class="flex flex-col " >
      <input v-model="email" type="text" placeholder="Email" class="block"/>
      <input v-model="password" type="password" placeholder="Password" />
      <input type="submit" value="Login">
      <p>Need an account? 
        <router-link to="/register" class="underline">Register Here</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import {ref} from 'vue';
import db from '@/data/firebase';


export default {
  setup() {
    const email = ref('');
    const password = ref('');

    const Login = () => {
      db
        .auth()
        .signInWithEmailAndPassword(email.value, password.value)
        .then(data => console.log(data))
        .catch(err =>alert(err.message))
    }
    return { email, password, Login}
  }
}
</script>

<style>

</style>