<template>
  <div id="app">
    <div class="view login" v-if="state.username==='' || state.username===null">
      <form @submit.prevent="Login" class="login-form">
        <div class="form-inner">
          <h1>Login to FireChat</h1>
          <label for="username">Username</label>
          <input v-model="inputUsername" type="text" placeholder="Please enter your username...">
          <input type="submit" value="Login">
        </div>
      </form>
    </div>
    <div class="view chat" v-else>
      <header>
        <button @click="Logout" class="logout">Logout</button>
        <h1>Welcome, {{ state.username }}</h1>
      </header>
      <section class="chat-box">
        <div v-for="message in state.messages" :key="message.key" :class="(message.username === state.username ? 'message current-user' : 'message')">
          <div class="message-inner">
            <div class="username">{{message.username}}</div>
            <div class="content">{{message.content}}</div>
          </div>
        </div>
      </section>
      <footer>
        <form @submit.prevent="SendMessage" class="form">
          <input v-model="inputMessage" type="text" placeholder="Write a message ..."/>
          <input type="submit" value="Send">
        </form>
      </footer>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import db from '@/data/firebase';
// @ is an alias to /src

export default {
  setup() {
    const inputUsername = ref("");
    const inputMessage = ref("");

    const state = reactive({
      username:"",
      messages: []
    })

    const Login = () => {
      if (inputUsername.value != "" || inputUsername.value != null) {
        state.username = inputUsername.value;
        inputUsername.value = ""
      }
    }

    const Logout = () => {
      state.username = '';
    }

    const SendMessage = () => {
      const messagesRef = db.database().ref("messages");
      if (inputMessage.value === "" || inputMessage.value === null) {
        return ;
      }
      const message = {
        username: state.username,
        content: inputMessage.value
      }
      messagesRef.push(message);
      inputMessage.value = "";
    }

    onMounted(() =>{
      const messagesRef = db.database().ref("messages");
      messagesRef.on('value', snapshot =>{
        const data = snapshot.val();
        let messages = [];

        Object.keys(data).forEach(key => {
          messages.push({
            id: key,
            username: data[key].username,
            content: data[key].content
          })
        });
        state.messages = messages;
      })
    })

    return { inputUsername, inputMessage, state, Login, Logout, SendMessage }
  }
}
</script>
<style scoped>
.view {
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 46.4px);
  background-color: #ea526f;
}
.login {
  align-items: center;
}
.login-form {
  display: block;
  width: 100%;
  padding: 15px;
}
.form-inner {
  display: block;
  background-color: #fff;
  padding: 50px 15px;
  border-radius: 16px;
  box-shadow: 0px 6px 12px rgba(0,0,0,0.2);
}
.form-inner h1 {
  font-size: 28px;
  margin-bottom: 30px;
  
}
.form-inner label {
  display: block;
  margin-bottom: 5px;
  font-size: 16px;
  color: #888;
  transition: 0.4s;
}
input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
  display: block;
  width: 100%;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 18px;
}
.form-inner input[type="text"] {
  margin-bottom: 15px;
  box-shadow: 0px 0px 0px rgba(0,0,0,0);
  background-color: #f3f3f3;
  transition: 0.4s;
}
.form-inner input[type="text"]::placeholder {
  color: #888;
  transition: 0.4s;
}
.form-inner input[type="submit"] {
  background-color: #ea526f;
  color: #fff;
  font-weight: 600;
  transition: 0.4s;
}
.form-inner input[type="submit"]:hover {
  box-shadow: 0 3px 6px rgba(0,0,0,0.2);
}

.chat {
  flex-direction: column;
}
.chat header {
  position: relative;
  display: block;
  width: 100%;
  padding: 50px 30px 10px;
}
.logout {
  position: absolute;
  top: 15px;
  right: 15px;
  appearance: none;
  border: none;
  /* border: 1px solid white;
  border-radius: 6px; */
  outline: none;
  background: none;
  color: #fff;
  margin-bottom: 10px;
  padding: 7px 10px 5px;
  text-transform: uppercase;
}
.caht header h1 {
  color: #fff;
}
.chat-box {
  border-radius: 24px 24px 0px 0px;
  background-color: #fff;
  box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
  flex: 1 1 100%;
  padding: 30px;
}
.message {
  display: flex;
  margin-bottom: 15px;
}
.username {
  color: #888;
  font-size: 16px;
  margin-bottom: 5px;
  padding: 0 15px;
}
.content {
  display: inline-block;
  padding: 8px 16px;
  background-color: #f3f3f3;
  border-radius: 999px;
  text-align: left;
}
.current-user {
  /* margin-top: 30px; */
  justify-content: flex-end;
  text-align: right;
}
.current-user .message-inner {
  max-width: 75%;
}
.current-user .content {
  color: #fff;
  font-weight: 600;
  background-color: #ec637c;
}

footer {
  position: sticky;
  bottom: 0;
  background-color: #fff;
  padding: 30px;
  box-shadow: 0px 0px 12px rgba(100,100,100,0.2);
}
footer .form {
  display: flex;
}
footer input[type="text"] {
  flex: 1 1 100%;
  background-color: #f3f3f3;
}
footer input[type="submit"] {
  flex-grow: 0;
  color: #fff;
  background-color: #ea526f;
  /* display: block; */
  width: 160px;
  padding: 10px 15px;
  border-radius: 0px 8px 8px 0px;
} 
</style>
