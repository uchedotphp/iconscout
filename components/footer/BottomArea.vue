<template>
  <div :style="{ maxWidth: maxWidth }" class="mx-auto d-flex justify-content-between align-items-center bottom-area">
    <div class="copy">© 2021 Design Barn Inc. Made with in India</div>
    <div>
      <img src="~/assets/images/payemt-ads.svg" alt="" srcset="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BottomArea",
  props: {
    maxWidth: {
      type: String,
      default: '100%'
    }
  }
});
</script>

<style lang="scss" scoped>
.bottom-area {
  .copy {
    font-family: Karla;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #424866;
  }
}
</style>
