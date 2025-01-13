<template>
  <div
    class="result-view position-relative h-100"
    :class="{ 'force-login': restrictGuestUser }"
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
          <b>
            Explore {{ searchedKeyword }} Icons Packs
          </b>
        </h2>
        <div class="card-container">
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
          <span v-if="isLoadingMoreData">Loading more icons...</span>
        </div>
      </section>
    </template>
    <NoData v-else class="d-flex align-items-center h-100">
      <template #message>
        No result for {{ searchedKeyword }} icons
      </template>
      <template #subMessage> {{ subMessage }} </template>
    </NoData>

    <ForceLogin v-if="restrictGuestUser">
      <template #message>
        View all {{ searchedKeyword }} 3D Illustrations
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
          content: "This is the icons page",
        },
      ],
    };
  },
  mounted() {
    // @ts-ignore
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
