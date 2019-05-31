<template>
  <div>
    <LoginWidget v-if="isLoggedIn" />
    <LoginScreen v-if="!isLoggedIn" />
    <div v-else>
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
  }
};
</script>

<style lang="scss" scoped></style>
