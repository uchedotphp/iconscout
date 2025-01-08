<template>
  <div class="d-flex align-items-center registration-buttons">
    <BaseAvatar v-if="isUserLoggedIn" />
    <template v-else>
      <BaseBtn @click="handleLogin" class="login">
        <template #label> Login </template>
      </BaseBtn>
      <BaseBtn @click="handleRegister" class="register">
        <template #label> Signup </template>
      </BaseBtn>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "TopHeaderRegistrationBtns",
  computed: {
    ...mapState({ isUserLoggedIn: "isLoggedIn" }),
  },
  methods: {
    handleLogin() {
      this.$store.commit("logInUser");
    },
    handleRegister() {
      this.$store.commit("logInUser");
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
