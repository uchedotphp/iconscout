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
    const query = route.params?.keyword;
    const asset = routeSection;
    const price = route.query?.price || store.state.options.price;
    const page = route.query?.page || store.state.options.page;
    const per_page = route.query?.per_page || store.state.options.per_page;
    const sort = route.query?.sort || store.state.options.sort;
    const view = route.query?.view || store.state.options.view;

    let formatAsset = "3d";
    switch (asset) {
      case "all-assets":
        formatAsset = "3d";
        break;
      case "3d-illustrations":
        formatAsset = "3d";
        break;
      case "lottie-animations":
        formatAsset = "lottie";
        break;
      case "illustrations":
        formatAsset = "illustration";
        break;
      case "icons":
        formatAsset = "icon";
        break;

      default:
        formatAsset = "3d";
        break;
    }
    if (route.params?.keyword) {

      // TODO: check if this is necessary
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
        query,
        asset: formatAsset,
        price,
        page,
        per_page,
        sort,
        view,
        loadMoreData: false,
      });
    } catch (error) {
      console.log("error fetching data: ", error);
    }
    store.commit("setApiLoading", { loading: false, type: routeSection });
  },

  computed: {
    ...mapState({
      // filteredOptions: "options",
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
    searchedKeyword() {
      return this.$route.params.keyword;
    }
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
                try {
                  const routeSection = this.$route.path.split("/")[1];
                  const query = this.$route.params.keyword;
                  const asset = routeSection;
                  const price = this.$route.query.price || this.$store.state.options.price;
                  const page = this.$store.state.apiResponse.current_page + 1;
                  const per_page =
                    this.$route.query.per_page || this.$store.state.options.per_page;
                  const sort = this.$route.query.sort || this.$store.state.options.sort;
                  const view = this.$route.query.view || this.$store.state.options.view;

                  this.$router.replace({
                    path: `/${this.$route.path.split("/")[1]}/${
                      this.$route.params.keyword
                    }`,
                    query: { ...this.$route.query, page },
                  });

                  let formatAsset = "3d";
                  switch (asset) {
                    case "all-assets":
                      formatAsset = "3d";
                      break;
                    case "3d-illustrations":
                      formatAsset = "3d";
                      break;
                    case "lottie-animations":
                      formatAsset = "lottie";
                      break;
                    case "illustrations":
                      formatAsset = "illustration";
                      break;
                    case "icons":
                      formatAsset = "icon";
                      break;

                    default:
                      formatAsset = "3d";
                      break;
                  }
                  const val = this.$route.params.keyword;
                  this.updateAnOptionProperty({ key: "query", value: val });
                  await this.getSearchResults({
                    loadMoreData: true,
                    query,
                    asset: formatAsset,
                    price,
                    page,
                    per_page,
                    sort,
                    view,
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
