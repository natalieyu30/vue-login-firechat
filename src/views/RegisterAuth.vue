<template>
  <div class="login w-1/2 m-auto mt-8 p-6 rounded-lg bg-gray-100" >
    <h1>Register</h1>
    <form @submit.prevent="Register" class="flex flex-col " >
      <input v-model="email" type="text" placeholder="Email" class="block"/>
      <input v-model="password" type="password" placeholder="Password" />
      <input type="submit" value="Register">
      <p>Have an account? 
        <router-link to="/login" class="underline">Login Here</router-link>
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

    const Register = () => {
      db
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
        .then(data => console.log(data))
        .catch(err =>alert(err.message))
    }
    return { email, password, Register}
  }
}
</script>

<style>

</style>