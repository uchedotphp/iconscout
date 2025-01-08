<template>
  <span>
    <NuxtLink to="/">
      <img src="~/assets/images/iconScout-logo.svg" />
    </NuxtLink>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Logo",
});
</script>

<style scoped>
/* .logo {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo img {
  max-width: 100%;
  height: auto;
} */
</style>
