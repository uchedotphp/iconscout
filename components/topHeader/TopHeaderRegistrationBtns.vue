<template>
  <div class="registration-buttons">
    <button @click="handleLogin">Login</button>
    <button @click="handleRegister">Register</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopHeaderRegistrationBtns',
  methods: {
    handleLogin(): void {
      // Handle login logic here
      console.log('Login button clicked');
    },
    handleRegister(): void {
      // Handle register logic here
      console.log('Register button clicked');
    }
  }
});
</script>

<style lang="scss" scoped>
.registration-buttons {
    button {
      border: none;
      background-color: var(--ics-blue);
      color: #ffffff;
      font-family: 'Averta Std', sans-serif;
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
      // width: 93px;
      // height: 44px;
      padding: 10px 20px;
      border-radius: 999px;

      &:first-child {
        margin-right: 12px;
      }
    }
  }
</style>
