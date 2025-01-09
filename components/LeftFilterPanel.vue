<template>
  <div class="left-filter-panel">
    <div style="overflow-y: hidden;">
      <div style="overflow-y: auto;">
        <!-- Exclusive -->
        <div class="cont">
          <BaseSwitchBtn v-model="isExclusive" class="switch-btn">
            <template #leftLabel> Iconscout Exclusive </template>
          </BaseSwitchBtn>
        </div>

        <!-- assets -->
        <div class="cont">
          <BaseAccordion
            class="accord"
            uid="asset"
            :expanded="assetAccordion"
            @toggle="assetAccordion = !assetAccordion"
          >
            <template #title> Asset </template>
            <template #content>
              <div v-for="opt in assetOptions" :key="opt" class="radio-comp">
                <BaseRadioBtn
                  :id="formatText(opt)"
                  name="assetType"
                  v-model="assetValue"
                  :modelValue="opt"
                  :label="opt"
                />
              </div>
            </template>
          </BaseAccordion>
        </div>

        <!-- Price -->
        <div class="cont">
          <BaseAccordion
            class="accord"
            uid="price"
            :expanded="priceAccordion"
            @toggle="priceAccordion = !priceAccordion"
          >
            <template #title> Price </template>
            <template #content>
              <div v-for="opt in pricingOptions" :key="opt" class="radio-comp">
                <BaseRadioBtn
                  name="pricing"
                  :id="opt"
                  v-model="priceValue"
                  :modelValue="opt"
                  :label="opt"
                />
              </div>
            </template>
          </BaseAccordion>
        </div>

        <!-- View -->
        <div class="cont">
          <BaseAccordion
            class="accord"
            uid="view"
            :expanded="viewAccordion"
            @toggle="viewAccordion = !viewAccordion"
          >
            <template #title> View </template>
            <template #content>
              <div v-for="opt in viewsOptions" :key="opt" class="radio-comp">
                <BaseRadioBtn
                  name="views"
                  :id="opt"
                  v-model="viewValue"
                  :modelValue="opt"
                  :label="opt"
                />
              </div>
            </template>
          </BaseAccordion>
        </div>

        <!-- Sort -->
        <div class="cont">
          <BaseAccordion
            class="accord"
            uid="sort"
            :expanded="sortAccordion"
            @toggle="sortAccordion = !sortAccordion"
          >
            <template #title> Sort by </template>
            <template #content>
              <div v-for="opt in sortByOptions" :key="opt" class="radio-comp">
                <BaseRadioBtn
                  name="sort"
                  :id="opt"
                  v-model="sortValue"
                  :modelValue="opt"
                  :label="opt"
                />
              </div>
            </template>
          </BaseAccordion>
        </div>

        <!-- Category -->
        <div class="cont">
          <BaseAccordion class="accord" uid="category" :expanded="categoryAccordion" @toggle="categoryAccordion = !categoryAccordion">
            <template #title> Categories </template>
          </BaseAccordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { assetOptions } from "~/data/data";
import type { prices, sortOptions, viewOptions } from '~/data/dataTypes';

export default defineComponent({
  name: "LeftFilterPanel",
  data() {
    return {
      assetAccordion: true,
      priceAccordion: true,
      viewAccordion: true,
      sortAccordion: true,
      categoryAccordion: true,
      isExclusive: false,
      assetValue: "all assets",
      priceValue: "free" as prices,
      viewValue: "pack" as viewOptions,
      sortValue: "popular" as sortOptions,
      assetOptions,
      pricingOptions: ["free", "premium"],
      viewsOptions: ["pack", "individual"],
      sortByOptions: ["popular", "latest", "relevant", "color"],
      categoriesOption: [],
    };
  },
  methods: {
    formatText(text: string = ""): string {
      return text
        .replace(/-/g, " ")
        .replace(/\.\w+$/, "")
        .replace(/\s+/g, "-");
    },
  },
});
</script>

<style lang="scss" scoped>
.left-filter-panel {
  width: 260px;
  position: sticky;

  .cont {
    padding: 20px 24px;
    border-bottom: 1px solid #ebedf5;

    .radio-comp {
      padding-bottom: 8px;
      padding-left: 4px;
    }
  }
}
</style>
