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
            <ScrollableArea
              class="h-100 scroll-area"
            >
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
            <div class="main-content">
              <nuxt :key="$route.fullPath" />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "vuex";

export default defineComponent({
  name: "DefaultLayout",
  computed: {
    ...mapState(["isFilterPanelExpanded"]),
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
