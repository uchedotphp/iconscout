<template>
  <div class="result-view">
    <!-- scroll menu -->
    <div
      style="position: relative; height: 38px; margin-top: 13px"
      class="align-items-center"
    >
      <SearchSuggestionNav
        :suggestions="searchSuggestions"
        asset="icons"
        @selected="getSearchSuggestion($event)"
      />
    </div>

    <section class="mt-4">
      <h2 class="text-capitalize">
        <NuxtLink to="#" no-prefetch>
          Explore {{ filteredOptions.query }} Icon Packs
        </NuxtLink>
      </h2>
      <div ref="tilesContainer" class="card-container">
        <div v-for="item in data" :key="item.id">
          <IconCardData :data="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { searchSuggestions } from "~/data/data";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "Icons",
  layout: "search",

  data() {
    return {
      pageTitle: "Icons",
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

  methods: {
    ...mapMutations(["setSearchQuery", "setApiLoading"]),
    ...mapActions(["getSearchResults"]),

    async getSearchSuggestion(val: string) {
      this.setApiLoading(true);
      try {
        this.setSearchQuery(val);
        await this.getSearchResults();
      } catch (error) {
        console.log("error getting search suggestion: ", error);
      }
      this.setApiLoading(false);
    },
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
