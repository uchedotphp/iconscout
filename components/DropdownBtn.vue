<template>
  <b-dropdown
    variant="none"
    :disabled="disabled"
    id="dropdown-1"
    :text="dropdownText"
    class="drop-button"
    :toggle-class="['p-0 text-capitalize border-light', { 'font-weight-bold' : boldText }]"
    :class="{ disabled: disabled }"
  >
    <template v-if="options.length">
      <b-dropdown-item
        v-for="option in options"
        :key="option"
        @click="handleClick(option)"
        class="drop-option text-capitalize font-weight-bold"
        link-class="drop-option"
      >
        {{ option }}
      </b-dropdown-item>
    </template>
  </b-dropdown>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DropdownBtn",
  props: {
    dropdownText: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<string[]>,
      default: () => [],
    },
    boldText: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClick(option: string) {
      this.$emit("click", option);
    },
  },
});
</script>

<style lang="scss" scoped>
.drop-button {
  font-family: "Averta Std", sans-serif;
  justify-content: center;
  color: white !important;
  outline: none;
  &.disabled {
    cursor: not-allowed;
  }
}

.drop-option {
  color: red;
}
</style>
