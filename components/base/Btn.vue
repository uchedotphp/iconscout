<template>
  <button
    class="btn text-nowrap btn-default d-flex align-items-center base-button"
    :class="{ disabled: disabled }"
    @click="handleClick"
    :type="type"
    :disabled="disabled"
  >
    <slot v-if="$slots.iconLeft" name="iconLeft" />
    <span v-if="$slots.label">
      <slot name="label" />
    </span>
    <slot v-if="$slots.iconRight" name="iconRight" />
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Btn",
  props: {
    id: {
      type: String,
      default: "",
    },
    type: {
      type: String as PropType<"button" | "submit" | "reset">,
      default: "button",
    },
    disabled: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    handleClick(event: Event) {
      this.$emit("click", event);
    },
  },
});
</script>

<style lang="scss" scoped>
.base-button {
  font-family: var(--ics-font-family);
  &.disabled {
    cursor: not-allowed;
  }
}

/*:slotted {
  background: red;
}*/

img {
  max-width: 100%;
  height: auto;
}
</style>
