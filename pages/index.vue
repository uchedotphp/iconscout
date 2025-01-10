<template>
  <div class="welcome">
    <h1>Over 10.3 Million+ Design Assets</h1>
    <div class="d-flex justify-content-center search-area">
      <TopHeaderSearch class="w-100" />
    </div>

    <div class="text-center mt-2">
      Trending:
      <span v-for="(trend, index) in trending" :key="trend">
        <NuxtLink :to="goToLink(trend)" class="font-weight-bold">{{
          trend
        }}</NuxtLink
        ><span v-if="index !== trending.length - 1" class="mr-1">,</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";
import type { assetType } from "~/data/dataTypes";

export default Vue.extend({
  name: "Index",
  data() {
    return {
      trending: [
        "Christmas",
        "Holiday",
        "Decoration",
        "New Year",
        "Xmas",
        "Music",
        "Arrow",
        "Direction",
        "Sound",
        "Business",
      ] as string[],
    };
  },
  mounted() {
    this.updateAnOptionProperty({ key: "query", value: "" });
    this.updateAnOptionProperty({ key: "asset", value: "all-assets" });
  },

  computed: {
    ...mapState({
      asset: (state: any) => state.options.asset,
    }),
  },

  methods: {
    ...mapMutations(["updateAnOptionProperty"]),
    goToLink(query: string) {
      return `/${this.asset}/${query}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.welcome {
  h1 {
    color: var(--ics-black);
    font-weight: 700;
    text-align: center;
    margin-top: 100px;
    font-size: 48px;
    line-height: 58px;
    font-family: "Averta Std", sans-serif;
  }

  .search-area {
    max-width: 800px;
    margin-top: 20px;
    margin-inline: auto;
  }
}
</style>
