<template>
  <div class="dropdown">
    <button
      :disabled="disabled"
      class="dropdown-toggle drop-button"
      :class="{ disabled: disabled }"
      type="button"
      :id="id"
      data-toggle="dropdown"
      aria-haspopup="true"
      aria-expanded="false"
    >
      {{ dropdownText }}
    </button>
    <div class="dropdown-menu" :aria-labelledby="id">
      <BaseBtn
        v-for="option in options"
        :key="option"
        @click="handleClick(option)"
        class="dropdown-item"
        type="button"
      >
        <template #label>
          {{ option }}
        </template>
        <!-- <template #iconRight>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
            class="ui-svg-inline ml-3"
          >
            <path
              d="M18.71,7.21a1,1,0,0,0-1.42,0L9.84,14.67,6.71,11.53A1,1,0,1,0,5.29,13l3.84,3.84a1,1,0,0,0,1.42,0l8.16-8.16A1,1,0,0,0,18.71,7.21Z"
            ></path>
          </svg>
        </template> -->
      </BaseBtn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "DropdownBtn",
  props: {
    id: {
      type: String,
      default: "",
    },
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
.dropdown {
  button {
    font-family: "Averta Std", sans-serif;
    font-size: 14px;
    font-weight: 700;
    color: #2e334c;
    outline: none;
    padding: 0;
    background-color: transparent;
    border: none;
    position: relative;
    &.disabled {
      cursor: not-allowed;
    }
    &:focus,
    &:active {
      border: none !important;
      background: none !important;
      background-color: transparent !important;
      color: #2e334c !important;
      outline: none !important;
      box-shadow: none !important;
    }
  }

  .dropdown-menu {
    background-color: #f5f6fa;
    box-shadow: 0px 6px 12px -4px rgba(0, 0, 0, 0.08),
      0px 20px 24px -4px rgba(0, 0, 0, 0.12);
    padding: 8px;
    border-radius: 12px;
    border: 1px solid #ebedf5;
    min-width: 200px;
    position: absolute;
    top: 17px !important;
    left: -10px !important;

    .dropdown-item {
      padding: 8px 16px;
      font-weight: 400;
      color: #000;
      border-radius: 4px;
      text-transform: capitalize;
      justify-content: space-between;
      &:hover {
        background-color: #ffffff;
        color: var(--ics-gray-blue);
      }
    }
  }
}
</style>
