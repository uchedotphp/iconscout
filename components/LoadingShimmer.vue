<template>
  <div class="contt" :class="assetType">
    <div v-for="(shimmer, index) in numberOfShimmers" :key="index" class="loading-shimmer" :class="assetType">
      <div class="shimmer"></div>
    </div>
  </div>
</template>

<script lang="ts">
// import { PropType } from "vue";
import Vue from "vue";
import { mapState } from "vuex";
const ASSET_TYPE_3D_ILLUSTRATIONS = "3d-illustrations";

export default Vue.extend({
  name: "LoadingShimmer",
  props: {
    numberOfShimmers: {
      type: Number,
      required: true,
    },
  },
  computed: {
    ...mapState({
      assetType: (state: any) => {
        const { apiLoading } = state;
        const assetType =
          apiLoading.type === ASSET_TYPE_3D_ILLUSTRATIONS
            ? "all-assets"
            : apiLoading.type;
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
  &.all-assets {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  &.lottie-animations {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  }
  &.illustrations {
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
  &.all-assets {
    height: 210px;
  }
  // &.3d-illustrations {
  //   height: 210px;
  // }
  &.lottie-animations {
    height: 210px;
  }
  &.illustrations {
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
