<template>
  <div :style="{ maxWidth: maxWidth }" class="mx-auto d-flex align-items-center justify-content-between top-area">
    <div class="d-flex align-items-center logo-area">
      <img src="~/assets/images/iconscout_logo_for_white_bg.svg" alt="logo" />
      <p>Design Resource Marketplace</p>
    </div>

    <div class="f-s-14 asset-count">
      <span>
        5,663,871
      </span>
       graphic resources & counting
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopArea",
  data() {
    return {
      message: "Welcome to the Top Area!",
    };
  },
  props: {
    maxWidth: {
      type: String,
      default: "100%",
    },
  },
});
</script>

<style lang="scss" scoped>
.top-area {
  padding-block: 24px;

  .logo-area {
    font-family: "Averta Std", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: -0.02em;

    img {
      padding-right: 16px;
    }
  }

  .asset-count {
    span {
      color: var(--ics-light-blue);
    }
  }
}
</style>
