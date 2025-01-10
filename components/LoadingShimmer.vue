<template>
  <div class="contt" :class="[assetType === 'icons' ? 'icons' : 'assets']">
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
    <div
      class="loading-shimmer"
      :class="[assetType === 'icons' ? 'icons' : 'assets']"
    >
      <div class="shimmer"></div>
    </div>
  </div>
</template>

<script lang="ts">
// import { PropType } from "vue";
import Vue from "vue";
import { mapState } from 'vuex'

export default Vue.extend({
  name: "LoadingShimmer",
  computed: {
    ...mapState({
      assetType: (state: any) => {
        const { options } = state;
        const assetType = options.asset;
        return assetType;
      },
    }),
  },
});
</script>

<style lang="scss" scoped>
.contt {
  display: grid;
  gap: 12px;
  &.assets {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  &.icons {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}
.loading-shimmer {
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    to right,
    #f6f7f8 0%,
    #edeef1 20%,
    #f6f7f8 40%,
    #f6f7f8 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  &.assets {
    height: 210px;
  }
  &.icons {
    height: 140px;
  }
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>
