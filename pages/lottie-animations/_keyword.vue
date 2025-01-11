<template>
  <div class="result-view h-100">
    <template v-if="data.length">
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
            Explore {{ filteredOptions.query }} Lottie Animation Packs
          </NuxtLink>
        </h2>
        <div ref="tilesContainer" class="card-container">
          <div v-for="item in data" :key="item.id">
            <AnimationData :data="item" />
          </div>
        </div>

        <!-- infinite scroll -->
        <div ref="infiniteScrollTrigger" class="loading-trigger" v-if="!isEnd">
          <span v-if="isLoadingMoreData">Loading more animations...</span>
        </div>
      </section>
    </template>
    <NoData v-else class="d-flex align-items-center h-100">
      <template #message>
        No result for {{ filteredOptions.query }} assets
      </template>
      <template #subMessage> Please try something else </template>
    </NoData>

    <StopView v-if="showLoginRegister" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { searchSuggestions } from "~/data/data";

export default Vue.extend({
  name: 'LottieAnimations',
  layout: 'search',

  data() {
    return {
      pageTitle: "Lottie Animations",
      searchSuggestions,
      isEnd: false,
      isLoadingMoreData: false,

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
  fetchOnServer: true,
  async fetch({ store, params }) {
    console.log("1");
    // check store for data
    const query = store.state.options.query;
    console.log("query: ", query);

    if (query.length === 0) {
      console.log("adding query: ", params.keyword);
      store.commit("updateAnOptionProperty", { key: "query", value: params.keyword });
    }
    store.commit("setApiLoading", true);
    try {
      const res = await store.dispatch("getSearchResults", { asset: 'lottie-animations' });
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
      apiResponse: "apiResponse",
    }),
    ...mapGetters({ data: "apiData", pagesLeft: "pagesRemaing" }),
  },

  mounted() {
    // console.log('2: ', this.$store.state.options);
    this.updateAnOptionProperty({
      key: "query",
      value: this.$route.params.keyword,
    });

    console.log("in asset page");

    try {
      if (this.data.length) {
        // and its not last page
        this.setupObserver();
      }
    } catch (error) {
      console.log("error setting up observer: ", error);
    }

    if (!this.isUserLoggedIn) {
      console.log("not logged in");
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
    ...mapMutations([
      "setSearchQuery",
      "setApiLoading",
      "setPerPageOption",
      "setPageOption",
      "updateAnOptionProperty",
    ]),
    ...mapActions(["getSearchResults"]),
    async getSearchSuggestion(val: string) {
      this.setApiLoading(true);
      try {
        this.updateAnOptionProperty({ key: "query", value: val });
        await this.getSearchResults({ asset: 'lottie-animations' });
      } catch (error) {
        console.log("error getting search suggestion: ", error);
      }
      this.setApiLoading(false);
    },

    setupObserver() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            this.setApiLoading(true);
            try {
              const val = this.$route.params.keyword;
              this.updateAnOptionProperty({ key: "query", value: val });
              await this.getSearchResults({ loadMoreData: true, asset: 'lottie-animations' });
            } catch (error) {
              console.log("error fetching more data: ", error);
            }
            this.setApiLoading(false);
          }
        });
      }, options);
      const infiniteScrollTrigger = this.$refs.infiniteScrollTrigger as Element;
      if (infiniteScrollTrigger) {
        observer.observe(infiniteScrollTrigger);
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
