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
        @selected="getSearchSuggestion($event)"
      />
    </div>

    <section class="mt-4">
      <h2 class="text-capitalize">
        <NuxtLink to="#" no-prefetch>
          Explore {{ filteredOptions.query }} Assets Packs
        </NuxtLink>
      </h2>
      <div ref="tilesContainer" class="card-container">
        <div v-for="item in data" :key="item.id">
          <CardData :data="item" />
        </div>
      </div>
    </section>

    <StopView v-if="showLoginRegister" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { searchSuggestions } from "~/data/data";

export default Vue.extend({
  name: "AllAssets",
  layout: "search",

  data() {
    return {
      pageTitle: "All Assets",
      searchSuggestions,
      assetData: {
        "3D Illustrations": {
          id: 1,
          data: [],
        },
        Animations: {
          id: 2,
          data: [],
        },
        Illustrations: {
          id: 3,
          data: [],
        },
        Icons: {
          id: 4,
          data: [],
        },
      },
      showGetStartedOverlay: false,
      scrolledFolds: 0,
      lastScrollTop: 0,
      showLoginRegister: false,
      twoFoldHeight: 0,
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
    ...mapState({
      filteredOptions: "options",
      isUserLoggedIn: "isLoggedIn",
    }),
    ...mapGetters({ data: "apiData" }),
  },

  mounted() {
    // const query = this.$route.params.keyword;
    // if (query) {
    //   this.setSearchQuery(query);
    // }
    // window.addEventListener("scroll", this.handleScroll);

    if (!this.isUserLoggedIn) {
      console.log("not logged in");

      // window.addEventListener("scroll", this.handleScroll);
      // this.calculateTwoFoldHeight();
    }

    // this.$nextTick(() => {
    //   this.$nuxt.$loading.start()
    //   setTimeout(() => this.$nuxt.$loading.finish(), 12000)
    // })
  },

  // unmounted() {
  //   // Remove scroll listener when component unmounts
  //   window.removeEventListener("scroll", this.handleScroll);
  // },

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
    calculateTwoFoldHeight() {
      // Get the height of the tiles container
      // const tilesContainer = this.$refs.tilesContainer;
      // console.log("the tiles container: ", tilesContainer.offsetHeight);

      // if (tilesContainer) {
      //   this.twoFoldHeight = 2 * tilesContainer.offsetHeight;
      //   console.log("2 folds: ", this.twoFoldHeight);
      // }
    },

    handleScroll() {
      console.log("scrolling: ", this.twoFoldHeight);

      // Check if the scroll position exceeds the two-fold height
      if (window.scrollY >= this.twoFoldHeight) {
        this.showLoginRegister = true;
      } else {
        this.showLoginRegister = false;
      }
    },
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
