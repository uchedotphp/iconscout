<template>
  <!-- <div :class="['switch-btn', { 'switch-btn--on': isOn }]" @click="toggle">
    <div class="switch-btn__handle"></div>
  </div> -->
  <div class="custom-control custom-switch">
    <label class="custom-control-label" for="customSwitch1">
      <slot name="leftLabel" />
    </label>
    <input type="checkbox" class="custom-control-input" id="customSwitch1" />
    <!-- <label class="custom-control-label" for="customSwitch1">
      <slot name="rightLabel"> Toggle this switch element </slot>
    </label> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SwitchBtn",
  // props: {
  //   modelValue: {
  //     type: Boolean,
  //     required: true,
  //   },
  // },
  emits: ["update:modelValue"],
  // setup(props, { emit }) {
  //   const isOn = ref(props.modelValue);

  //   const toggle = () => {
  //     isOn.value = !isOn.value;
  //     emit("update:modelValue", isOn.value);
  //   };

  //   return {
  //     isOn,
  //     toggle,
  //   };
  // },
});
</script>

<style scoped>
/* .switch-btn {
  width: 50px;
  height: 25px;
  background-color: #ccc;
  border-radius: 25px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

.switch-btn--on {
  background-color: #4caf50;
}

.switch-btn__handle {
  width: 23px;
  height: 23px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 1px;
  left: 1px;
  transition: left 0.3s;
}

.switch-btn--on .switch-btn__handle {
  left: 26px;
} */
</style>
