<template>
  <div class="d-flex align-items-center justify-content-between input-box">
    <input
      :value="value"
      @input="onInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keyup.enter="keyupEnter"
      :type="type"
      :placeholder="placeholder"
      class="col p-0"
    />
    <BaseBtn v-if="value.length" class="col-auto p-0 clear" @click="clearSearch">
      <template #iconRight>
        <svg
          width="21"
          height="21"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="ui-svg-inline"
        >
          <path
            d="M13.41,12l4.3-4.29a1,1,0,1,0-1.42-1.42L12,10.59,7.71,6.29A1,1,0,0,0,6.29,7.71L10.59,12l-4.3,4.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0L12,13.41l4.29,4.3a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42Z"
          ></path>
        </svg>
      </template>
    </BaseBtn>
  </div>
</template>

<script lang="ts">
import { PropType } from "vue";
import Vue from "vue";

export default Vue.extend({
  name: "InputBox",
  props: {
    value: {
      type: String as PropType<string>,
      required: true,
    },
    placeholder: {
      type: String as PropType<string>,
      default: "",
    },
    type: {
      type: String as PropType<string>,
      default: "text",
    },
  },
  methods: {
    onInput(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("input", target.value);
    },
    handleFocus() {
      this.$emit("focus");
    },
    handleBlur() {
      this.$emit("blur");
    },
    keyupEnter() {
      this.$emit("keyupenter");
    },
    clearSearch() {
      this.$emit("input", "");
    }
  },
});
</script>

<style lang="scss" scoped>
.input-box {
  width: 100%;
  &::placeholder {
    font-family: "Averta Std", sans-serif;
    font-size: var(--ics-font-size-sm);
    font-weight: 400;
    line-height: 24px;
    color: var(--ics-light-black);
  }

  .clear {
    border-radius: 9999px;
    &:hover {
      background-color: var(--ics-white);
    }
  }
}
</style>
