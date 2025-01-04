<template>
  <div class="wrapper">
    <TopHeader />
    <TopSubHeader class="sub-header" />
    <main class="h-100">
      <div class="d-flex align-items-center secondary-navigation-area">
        <FiltersMenu />
        <ScrollableArea class="scroll-area">
          <SecondaryNavigation />
        </ScrollableArea>
      </div>
      <b-container fluid class="px-0 h-100">
        <b-row no-gutters class="h-100">
          <b-col cols="auto">
            <!-- Side filter panel -->
            <LeftFilterPanel v-if="isFilterPanelExpanded" />
          </b-col>
          <b-col class="h-100 overflow-hidden">
            <div class="h-100 overflow-auto">
              <nuxt :key="$route.fullPath" />
            </div>
          </b-col>
        </b-row>
      </b-container>
    </main>
    <BottomFooter />
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
  top: 74.59px;
  position: sticky;
  z-index: 1000;
  background-color: #fafafc;

  .scroll-area {
    flex: 1;
    padding-inline: 43px;
  }
}
</style>
