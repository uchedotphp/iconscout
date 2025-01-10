<template>
  <div class="container-fluid px-0 wrapper">
    <TopHeader :hideSearch="true" />
    <main>
      <Nuxt :key="$route.fullPath" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>

<style lang="scss" scoped>
</style>
