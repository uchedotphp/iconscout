import Vue from "vue";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { searchSuggestions } from "~/data/data";

export default Vue.extend({
  data() {
    return {
      searchSuggestions,
      showGetStartedOverlay: false,
      isEnd: false,
      isLoadingMoreData: false,
      subMessage: "Please try something else",
    };
  },

  fetchOnServer: true,
  async fetch({ store, params, route }) {
    const routeSection = route.path.split("/")[1];
    // check store for data
    const query = store.state.options.query;
    if (query.length === 0) {
      store.commit("updateAnOptionProperty", {
        key: "query",
        value: params.keyword,
      });
    }
    if (!store.state.apiLoading.loading) {
      store.commit("setApiLoading", { loading: true, type: routeSection });
    }

    if (process.client) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }

    try {
      const res = await store.dispatch("getSearchResults", {
        asset: routeSection,
      });
    } catch (error) {
      console.log("error fetching data: ", error);
    }
    store.commit("setApiLoading", { loading: false, type: routeSection });
  },

  computed: {
    ...mapState({
      filteredOptions: "options",
      apiResponse: "apiResponse",
    }),
    ...mapGetters({
      data: "apiData",
      isLastPage: "isLastPage",
      restrictGuestUser: "restrictGuestUser",
    }),
    routeSection() {
      return this.$route.path.split("/")[1];
    },
  },

  methods: {
    ...mapMutations([
      "setSearchQuery",
      "setApiLoading",
      "setPerPageOption",
      "setPageOption",
      "updateAnOptionProperty",
    ]),
    ...mapActions(["getSearchResults"]),
    getSearchSuggestion(val) {
      this.$store.commit("updateAnOptionProperty", {
        key: "query",
        value: val,
      });

      this.setApiLoading({
        loading: true,
        type: this.routeSection,
      });
      try {
        this.$router.push(`/${this.routeSection}/${val}`);
      } catch (error) {
        console.log("Error fetching search suggestion:", error);
      }
      this.setApiLoading({
        loading: false,
        type: this.routeSection,
      });
      console.log("the route still:", this.$store.state.options);
    },

    setupObserver() {
      const options = {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            if (this.isLastPage) {
              observer.disconnect();
            } else {
              if (this.restrictGuestUser) {
                this.showGetStartedOverlay = true;
                observer.disconnect();
              } else {
                this.setApiLoading({
                  loading: true,
                  type: this.routeSection,
                });
                // window.scrollTo({
                //   top: 0,
                //   behavior: "smooth",
                // });
                try {
                  const val = this.$route.params.keyword;
                  this.updateAnOptionProperty({ key: "query", value: val });
                  await this.getSearchResults({
                    loadMoreData: true,
                    asset: this.routeSection,
                  });
                } catch (error) {
                  console.log("Error fetching more data:", error);
                }
                this.setApiLoading({
                  loading: false,
                  type: this.routeSection,
                });
              }
            }
          }
        });
      }, options);
      const infiniteScrollTrigger = this.$refs.infiniteScrollTrigger;
      if (infiniteScrollTrigger) {
        observer.observe(infiniteScrollTrigger);
      }
    },
  },
});
