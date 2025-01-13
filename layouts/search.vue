<template>
  <div class="wrapper">
    <TopHeader />
    <TopSubHeader class="sub-header" />
    <main>
      <b-container fluid class="px-0 secondary-navigation-area">
        <b-row no-gutters>
          <b-col cols="auto">
            <FiltersMenu />
          </b-col>
          <b-col>
            <ScrollableArea class="h-100 scroll-area">
              <SecondaryNavigation />
            </ScrollableArea>
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
              <LoadingShimmer v-if="apiLoading.loading" />
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
  // mounted() {
  //   console.log('in search layout');

  //   this.updateAnOptionProperty({
  //     key: "query",
  //     value: this.$route.params.keyword,
  //   });
  // },

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
    }),
  },
  methods: {
    ...mapMutations(["updateAnOptionProperty"]),
  },
});
</script>

<style lang="scss" scoped>
.sub-header {
  margin-top: 6px;
}

.secondary-navigation-area {
  top: 82px;
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
