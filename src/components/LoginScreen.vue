<template>
  <div class="hello">
    <form v-if="isLogin" @submit.prevent="login()">
      <h1>Log In</h1>
      <label for>
        Username:
        <input v-model="loginCreds.email" type="text" />
      </label>
      <label for>
        Password:
        <input v-model="loginCreds.password" type="text" />
      </label>
      <button type="submit">Login</button>
    </form>
    <form v-else @submit.prevent="signup()">
      <h1>Sign Up</h1>
      <label for>
        Username:
        <input v-model="signupCreds.email" type="text" />
      </label>
      <label for>
        Password:
        <input v-model="signupCreds.password" type="text" />
      </label>
      <button type="submit">Signup</button>
    </form>
    <p>
      I'm looking to
      <span @click="toggleLogin">
        {{ isLogin ? "Login" : "Sign Up" }}
      </span>
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LoginScreen",
  data() {
    return {
      isLogin: false,
      loginCreds: {
        email: null,
        password: null
      },
      signupCreds: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    ...mapActions("auth", ["attemptLogin", "attemptSignup"]),
    toggleLogin() {
      this.isLogin = !this.isLogin;
    },
    signup() {
      this.attemptSignup(this.signupCreds).then(res => {
        console.log(res);
      });
    },
    login() {
      let token = decodeURIComponent(window.location.search)
        .substring(1)
        .split("confirmation_token=")[1];
      this.attemptLogin({ token, ...this.loginCreds })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
</style>
