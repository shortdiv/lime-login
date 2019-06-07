<template>
  <div>
    <LoginWidget v-if="isLoggedIn" />
    <LoginScreen v-if="!isLoggedIn" />
    <div v-else>
      <button @click="goToApple">Navigate to Apple</button>
      Hello there!
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import LoginScreen from "../components/LoginScreen.vue";
import LoginWidget from "../components/LoginWidget.vue";

export default {
  name: "Home",
  components: {
    LoginScreen,
    LoginWidget
  },
  computed: {
    ...mapGetters("auth", ["isLoggedIn"])
  },
  methods: {
    goToApple() {
      window.location.href =
        "/.netlify/functions/redirect?site=https://apple-security.netlify.com/";
    }
  }
};
</script>

<style lang="scss" scoped></style>
