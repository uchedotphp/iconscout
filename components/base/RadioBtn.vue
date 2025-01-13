<template>
  <div class="d-flex align-items-center radio-comp">
    <input
      type="radio"
      class="radio-btn-input"
      :id="id"
      :name="name"
      :value="value"
      @change="handleChange"
      :checked="isChecked"
    />
    <label class="radio-label" :for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "RadioBtn",
  model: {
    prop: 'modelValue',
    event: 'change'
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    modelValue: {
      type: [String, Number] as PropType<string | number>,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  computed: {
    isChecked() {
      return this.modelValue == this.value
    }
  },
  methods: {
    handleChange(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit("change", target.value);
    },
  },
});
</script>

<style lang="scss" scoped>
.radio-label {
  margin-bottom: 0;
  padding-left: 8px;
  font-family: "Averta Std", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 17.3px;
  text-transform: capitalize;
  color: #2e334c;
  &:hover {
    color: var(--ics-blue);
    cursor: pointer;
  }
}
</style>
