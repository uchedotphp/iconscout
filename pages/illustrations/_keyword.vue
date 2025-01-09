<template>
  <div class="result-view">
    <!-- scroll menu -->
    <div
      style="position: relative; height: 38px; margin-top: 13px"
      class="align-items-center"
    >
      <SearchSuggestionNav
        :suggestions="searchSuggestions"
        asset="assets"
        @selected=""
      />
    </div>

    <section class="mt-4">
      <h2 class="text-capitalize">
        <NuxtLink to="#" no-prefetch>
          {{ filteredOptions.query }}
        </NuxtLink>
      </h2>
      <div ref="tilesContainer" class="card-container">
        <div v-for="item in data" :key="item.id">
          <CardData :data="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { searchSuggestions } from "~/data/data";
import { mapState, mapGetters } from "vuex";

export default Vue.extend({
  name: "Illustrations",
  layout: "search",

  data() {
    return {
      pageTitle: "Illustrations",
      searchSuggestions,
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

  async fetch({ store }) {
    store.commit("setApiLoading", true);
    try {
      const res = await store.dispatch("getSearchResults", {
        per_page: 20,
        page: 1,
      });
      console.log("fetching data pos: ", res);
    } catch (error) {
      console.log("error fetching data: ", error);
    }
    store.commit("setApiLoading", false);
  },

  computed: {
    ...mapState({ filteredOptions: "options" }),
    ...mapGetters({ data: "apiData" }),
  },
});
</script>

<style lang="scss" scoped>
.card-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}
</style>
