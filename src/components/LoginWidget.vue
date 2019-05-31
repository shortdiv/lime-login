<template>
  <div class="account-profile">
    <div class="account-profile--avatar" @click="toggleMenuDrawer">
      <img src="../assets/logo.png" alt="" />
    </div>
    <div v-show="isDrawerOpen">
      <button @click="attemptLogout()">
        <span>Logout</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "LoginWidget",
  data() {
    return {
      isDrawerOpen: false
    };
  },
  methods: {
    ...mapActions("auth", ["attemptLogout"]),
    toggleMenuDrawer() {
      this.isDrawerOpen = !this.isDrawerOpen;
    }
  }
};
</script>

<style lang="scss" scoped>
.account-profile {
  position: fixed;
  height: 30px;
  width: 30px;
  z-index: 10000;
  right: 10px;
  top: 0;
  padding: 1em;
  &--avatar {
    display: block;
    border-radius: 50%;
    padding: 0.5em;
    background: #c0ffff;
    height: 32px;
    width: 32px;
    cursor: pointer;
    & img {
      width: 32px;
    }
  }
}
</style>
