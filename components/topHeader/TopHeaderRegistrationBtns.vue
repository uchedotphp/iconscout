<template>
  <div class="d-flex align-items-center registration-buttons">
    <BaseAvatar v-if="isUserLoggedIn" @click="handleLogin('logout')" />
    <template v-else>
      <BaseBtn @click="handleLogin('login')" class="login">
        <template #label> Login </template>
      </BaseBtn>
      <BaseBtn @click="handleLogin('login')" class="register">
        <template #label> Signup </template>
      </BaseBtn>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
  name: "TopHeaderRegistrationBtns",
  computed: {
    ...mapState({ isUserLoggedIn: "isLoggedIn" }),
  },
  methods: {
    ...mapMutations(["toggleLogin"]),
    handleLogin(type: "login" | "signup" | "logout") {
      this.toggleLogin(type);
    },
  },
});
</script>

<style lang="scss" scoped>
.registration-buttons {
  button {
    border: none;
    font-size: 16px;
    font-weight: 600;
    line-height: 24px;
    padding: 10px 20px;
    border-radius: 999px;

    &:first-child {
      margin-right: 12px;
    }
    &.login {
      border: 1px solid #d8dbeb;
      color: var(--ics-black);
      &:hover {
        background-color: var(--ics-hover);
      }
    }
    &.register {
      background-color: var(--ics-blue);
      color: #ffffff;
    }
  }
}
</style>
