<template>
  <div class="welcome">
    <h1 class="text-capitalize">Million+ of {{ ads }} available</h1>
    <div class="d-flex justify-content-center search-area">
      <Search class="w-100" />
    </div>

    <div class="text-center mt-2">
      Trending:
      <span v-for="(trend, index) in trending" :key="trend">
        <NuxtLink
          :to="goToLink(trend)"
          @click.native.prevent="formatLink($event, trend)"
          class="font-weight-bold"
          >{{ trend }}</NuxtLink
        ><span v-if="index !== trending.length - 1" class="mr-1">,</span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";

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
    ads(): string {
      return this.asset === "all-assets"
        ? "assets"
        : this.asset.replace(/-/g, " ");
    },
  },

  methods: {
    ...mapMutations(["updateAnOptionProperty"]),
    goToLink(query: string) {
      // @ts-ignore
      return `/${this.$formatText.addHypen(this.asset)}/${query}`;
    },
    formatLink(event: Event, query: string) {
      // @ts-ignore
      this.$helpers.gotoRoute({ asset: this.asset, query });
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
    font-family: var(--ics-font-family);
  }

  .search-area {
    max-width: 800px;
    margin-top: 20px;
    margin-inline: auto;
  }
}
</style>
