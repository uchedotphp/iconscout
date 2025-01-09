<template>
  <div class="stop-view">
    <h4>
      View all Limit 3D Illustrations
    </h4>

    <BaseBtn>
      <template #label>
        Get Started - It's Free
      </template>
    </BaseBtn>
    <div>
      Already have an account? <NuxtLink to="/">Log In</NuxtLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StopView',
  props: {
    // title: {
    //   type: String,
    //   required: true
    // },
    // description: {
    //   type: String,
    //   required: false,
    //   default: ''
    // }
  }
});
</script>

<style lang="scss" scoped>
.stop-view {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;

  h4 {
    font-family: Averta Std;
font-size: 24px;
font-weight: 700;
line-height: 36px;
text-align: center;
color: #000;
padding-bottom: 20px;
  }
}
</style>
