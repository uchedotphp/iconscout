<template>
  <div class="container-fluid px-0 wrapper">
    <TopHeader />
    <TopSubHeader class="sub-header" />
    <main>
      <b-container fluid class="px-0 secondary-navigation-area">
        <b-row no-gutters>
          <b-col cols="auto">
            <FiltersMenu />
          </b-col>
          <b-col>
            <div class="h-100 scroll-area">
              <SecondaryNavigation />
            </div>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid class="px-0">
        <b-row no-gutters>
          <b-col cols="auto">
            <!-- Side filter panel -->
            <LeftFilterPanel
              v-if="isFilterPanelExpanded"
              class="filterSidebar"
            />
          </b-col>
          <b-col>
            <div class="main-content h-100">
              <LoadingShimmer
                v-if="apiLoading.loading"
                :numberOfShimmers="shimmerCount"
              />
              <Nuxt v-else :key="$route.fullPath" />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
  name: "DefaultLayout",

  data() {
    return {
      shimmerCount: 30,
    };
  },

  mounted() {
    this.calculateShimmers();
    window.addEventListener("resize", this.calculateShimmers);
    // try to set store data from the route
    this.updateAnOptionProperty({
      key: "asset",
      value: this.routeSection,
    });
    this.$route.query?.keyword &&
      this.updateAnOptionProperty({
        key: "query",
        value: this.$route.query.keyword,
      });
    this.$route.query?.price &&
      this.updateAnOptionProperty({
        key: "price",
        value: this.$route.query.price,
      });
    this.$route.query?.sort &&
      this.updateAnOptionProperty({
        key: "sort",
        value: this.$route.query.sort,
      });
    this.$route.query?.view &&
      this.updateAnOptionProperty({
        key: "view",
        value: this.$route.query.view,
      });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.calculateShimmers);
  },

  computed: {
    ...mapState(["isFilterPanelExpanded", "apiLoading", "options"]),
    ...mapState({
      assetType: (state: any) => {
        const { options } = state;
        return options.asset;
      },
      searchTerm: (state: any) => {
        const { options } = state;
        return options.query;
      },
      routeSection(this: any): string {
        return this.$route.path.split("/")[1];
      },
    }),
  },
  methods: {
    ...mapMutations(["updateAnOptionProperty"]),
    calculateShimmers() {
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      const shimmerWidth = 150;
      const shimmerHeight = 150;
      this.shimmerCount =
        Math.floor(containerWidth / shimmerWidth) *
        Math.floor(containerHeight / shimmerHeight);
    },
  },
});
</script>

<style lang="scss" scoped>
.sub-header {
  margin-top: 6px;
}

.secondary-navigation-area {
  top: 81px;
  position: sticky;
  z-index: 999;
  background-color: #fafafc;

  .scroll-area {
    flex: 1;
    padding-inline: 43px;
  }
}

.filterSidebar {
  position: sticky;
  top: 124px;
  border-right: 1px solid #ebedf5;
}

main {
  .main-content {
    padding: 20px 40px;
  }
}
</style>
