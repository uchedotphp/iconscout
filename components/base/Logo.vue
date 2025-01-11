<template>
  <div class="logo">
    <NuxtLink to="/">
      <img src="~/assets/images/iconScout-logo.svg" />
    </NuxtLink>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Logo"
});
</script>

<style scoped>
/* .logo {
  display: flex;
  justify-content: center;
  align-items: center;
}*/

.logo img {
  max-width: 100%;
  width: 100%;
  height: auto;
}
</style>
