<template>
  <div class="wrapper">
    <TopHeader />
    <TopSubHeader class="sub-header" />
    <main>
      <div class="d-flex align-items-center secondary-navigation-area">
        <!-- <FiltersMenu />
        <ScrollableArea class="scroll-area">
          <SecondaryNavigation />
        </ScrollableArea> -->
      </div>
      <div>
        <!-- <LeftFilterPanel /> -->
        <nuxt :key="$route.fullPath" />
      </div>
    </main>
    <!-- <BottomFooter /> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "DefaultLayout",
});
</script>

<style lang="scss" scoped>
.sub-header {
  margin-top: 6px;
}

.secondary-navigation-area {
  .scroll-area {
    flex: 1;
    padding-inline: 43px;
  }
}
</style>
