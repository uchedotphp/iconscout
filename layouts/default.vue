<template>
  <div class="wrapper">
    <TopHeader />
    <main>
      <nuxt :key="$route.fullPath" />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>
