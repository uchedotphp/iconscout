<template>
  <div class="sub-header">
    <h1>
      <template v-if="apiLoading.loading">
        Searching {{ searchedKeyword }} {{ computedCategory }}...
      </template>
      <template v-else>
        {{ totalAssetCount }} {{ searchedKeyword }} {{ computedCategory }}
        <template v-if="currentPage > 1"> - Page {{ currentPage }} </template>
      </template>
    </h1>
    <h2 v-if="!apiLoading.loading">
      {{ totalAssetCount }} {{ computedCategory }} exclusively selected by our
      designer community.
    </h2>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "TopSubHeader",
  computed: {
    ...mapState(["apiLoading"]),
    ...mapState({
      searchQuery: (state: any) => {
        const { options } = state;
        return options.query;
      },
      currentPage: (state: any) => state.apiResponse.current_page,
    }),

    ...mapGetters(["totalAssetCount"]),

    searchedKeyword() {
      return (
        this.$route.params.keyword.charAt(0).toUpperCase() +
          this.$route.params.keyword.slice(1) ||
        this.searchQuery.charAt(0).toUpperCase() + this.searchQuery.slice(1)
      );
    },

    routeSection(): string {
      return this.$route.path.split("/")[1];
    },

    computedCategory(): string {
      const keyword = this.routeSection as string;
      const availableCategories = [
        "3d-illustrations",
        "lottie-animations",
        "illustrations",
        "icons",
      ];
      if (availableCategories.includes(keyword)) {
        return keyword
          .split("-")
          .map((word) => {
            if (word.toLowerCase() === "3d") {
              return "3D";
            }
            return word.charAt(0).toUpperCase() + word.slice(1);
          })
          .join(" ");
      } else {
        return "Assets";
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.sub-header {
  background-color: #fafafc;
  padding: 24px 40px;

  h1 {
    color: var(--ics-black);
    font-family: "Averta Std", sans-serif;
    font-size: 35px;
    font-weight: 700;
    line-height: 52.5px;
    padding-bottom: 4px;
    text-transform: capitalize;
  }

  h2 {
    color: var(--ics-gray);
    font-family: "Averta Std", sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
    padding-top: 4px;
  }
}
</style>
