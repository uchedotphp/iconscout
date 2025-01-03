<template>
  <section :class="scrollClass">
    <slot></slot>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ScrollableArea",
  props: {
    direction: {
      type: String,
      default: "horizontal",
      validator: (value: string) => ["vertical", "horizontal"].includes(value),
    },
  },
  computed: {
    scrollClass() {
      return this.direction === "horizontal"
        ? "scroll-horizontal"
        : "scroll-vertical";
    },
  },
});
</script>

<style scoped>
.scroll-vertical {
  overflow-y: auto;
  overflow-x: hidden;
}

.scroll-horizontal {
  overflow-x: auto;
  overflow-y: hidden;
}
</style>
