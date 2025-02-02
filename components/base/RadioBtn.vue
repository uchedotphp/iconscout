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
  padding-left: 12px;
  font-family: var(--ics-font-family);
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

input[type="radio"] {
  appearance: none; /* Remove default styling */
  -webkit-appearance: none; /* For Safari */
  width: 16px;
  height: 16px;
  border: 1px solid #3D92DE;
  border-radius: 50%;
  outline: none;
  display: inline-block;
  position: relative;
  cursor: pointer;
}

input[type="radio"]::before {
  content: "";
  width: 6px;
  height: 6px;
  background-color: #3D92DE;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.2s ease-in-out;
}

input[type="radio"]:checked::before {
  transform: translate(-50%, -50%) scale(1);
}
</style>
