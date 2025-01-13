<template>
  <div
    class="result-view position-relative h-100"
    :class="{ 'force-login': !isUserLoggedIn && currentPage > 2 }"
  >
    <template v-if="data.length">
      <div class="align-items-center search-suggestion-nav">
        <SearchSuggestionNav
          :suggestions="searchSuggestions"
          asset="assets"
          @selected="getSearchSuggestion($event)"
        />
      </div>
      <section class="mt-4">
        <h2 class="text-capitalize">
          <NuxtLink to="#" no-prefetch>
            Explore {{ filteredOptions.query }} Icons Packs
          </NuxtLink>
        </h2>
        <div ref="tilesContainer" class="card-container">
          <div v-for="item in data" :key="item.id">
            <IconCardData :data="item" />
          </div>
        </div>

        <!-- infinite scroll -->
        <div
          ref="infiniteScrollTrigger"
          class="loading-trigger"
          v-if="!isEnd && !showGetStartedOverlay"
        >
          <span v-if="isLoadingMoreData">Loading more animations...</span>
        </div>
      </section>
    </template>
    <NoData v-else class="d-flex align-items-center h-100">
      <template #message>
        No result for {{ filteredOptions.query }} icons
      </template>
      <template #subMessage> {{ subMessage }} </template>
    </NoData>

    <ForceLogin v-if="!isUserLoggedIn && currentPage > 2">
      <template #message>
        View all {{ filteredOptions.query }} 3D Illustrations
      </template>
    </ForceLogin>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import sharedLogic from "~/mixins/sharedLogic";

export default Vue.extend({
  name: "Icons",
  layout: "search",
  mixins: [sharedLogic],

  data() {
    return {
      pageTitle: "Icons",
    };
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: "description",
          name: "description",
          content: "This is the home page",
        },
      ],
    };
  },

  mounted() {
    this.setupObserver();
  },
});
</script>

<style scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}
</style>
