<template>
  <div class="left-filter-panel">
    <div style="overflow-y: hidden">
      <div style="overflow-y: auto">
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
                  v-model="filters.assetValue"
                  @change="getData(formatText(opt))"
                  :value="opt"
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
                  v-model="filters.priceValue"
                  @change="getData(formatText(opt))"
                  :value="opt"
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
                  v-model="filters.viewValue"
                  @change="getData(formatText(opt))"
                  :value="opt"
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
                  v-model="filters.sortValue"
                  @change="getData(formatText(opt))"
                  :value="opt"
                  :label="opt"
                />
              </div>
            </template>
          </BaseAccordion>
        </div>

        <!-- Category -->
        <div class="cont">
          <BaseAccordion
            class="accord"
            uid="category"
            :expanded="categoryAccordion"
            @toggle="categoryAccordion = !categoryAccordion"
          >
            <template #title> Categories </template>
          </BaseAccordion>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { assetOptions } from "~/data/data";
import type { prices, sortOptions, viewOptions } from "~/data/dataTypes";
import { mapState, mapMutations } from "vuex";

export default Vue.extend({
  name: "LeftFilterPanel",
  data() {
    return {
      assetAccordion: true,
      priceAccordion: true,
      viewAccordion: true,
      sortAccordion: true,
      categoryAccordion: true,
      isExclusive: false,
      assetOptions,
      pricingOptions: ["free", "premium"],
      viewsOptions: ["pack", "individual"],
      sortByOptions: ["popular", "latest", "relevant", "color"],
      categoriesOption: [],
      filters: {
        assetValue: "all assets",
        priceValue: "free" as prices,
        viewValue: "pack" as viewOptions,
        sortValue: "popular" as sortOptions,
      },
    };
  },
  mounted() {
    this.filters.assetValue = (this.routeSection as string) || "all assets";
    this.filters.priceValue = this.filterOptions.price || "free";
    this.filters.sortValue = this.filterOptions.sort || "popular";
    this.filters.viewValue = this.filterOptions.view || "pack";
  },
  computed: {
    ...mapState({
      filterOptions: (state: any) => state.options,
    }),
    routeSection() {
      return this.$route.path.split("/")[1].replace(/-/g, " ");
    },
  },
  methods: {
    ...mapMutations(["setApiLoading", "updateAnOptionProperty"]),
    formatText(text: string = ""): string {
      return text
        .replace(/-/g, " ")
        .replace(/\.\w+$/, "")
        .replace(/\s+/g, "-");
    },
    getData(val: string): void {
      if (this.$route.params.keyword === undefined) {
        return;
      }
      this.$store.commit('updateAnOptionProperty', { key: "asset", value: val });
      this.$store.commit('setApiLoading',{
        loading: true,
        type: this.$route.path.split("/")[1],
      });
      try {
        this.$router.push(`/${val}/${this.$route.params.keyword}`);
      } catch (error) {
        console.log("Error fetching search suggestion:", error);
      }
      this.$store.commit('setApiLoading',{
        loading: true,
        type: this.$route.path.split("/")[1],
      });
      console.log("the route still:", this.$store.state.options);
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
