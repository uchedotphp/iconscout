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
                  @change="getData('asset', formatText(opt))"
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
                  @change="getData('price', formatText(opt))"
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
                  @change="getData('view', formatText(opt))"
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
                  @change="getData('sort', formatText(opt))"
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
import { mapState, mapMutations, mapActions } from "vuex";

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
  watch: {
    routeSection: {
      handler: function handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          console.log("psss: ", newValue);

          if (newValue.toLowerCase() === "3d illustrations") {
            this.filters.assetValue = "3D illustrations";
          } else {
            this.filters.assetValue = newValue.toLowerCase();
          }
        }
      },
      // immediate: true,
    },
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
    ...mapActions(["getSearchResults"]),
    formatText(text: string = ""): string {
      return text
        .replace(/-/g, " ")
        .replace(/\.\w+$/, "")
        .replace(/\s+/g, "-");
    },

    async getData(type: string, val: string): Promise<void> {
      console.log("type: ", type, " val: ", val);

      if (this.$route.params.keyword === undefined) {
        return;
      }

      this.$store.commit("setApiLoading", {
        loading: true,
        type: this.$route.path.split("/")[1],
      });

      if (type === "asset") {
        try {
          this.$router.push(`/${val}/${this.$route.params.keyword}`);
        } catch (error) {
          console.log("Error fetching search suggestion:", error);
        }
      } else {
        this.$router.replace({
          path: `/${this.$route.path.split("/")[1]}/${
            this.$route.params.keyword
          }`,
          query: { ...this.$route.query, [type]: val },
        });
        console.log('pricing: ', this.$route.query.price)
        try {
          const routeSection = this.$route.path.split("/")[1];
          const query = this.$route.params.keyword;
          const asset = routeSection;
          const price =
            this.$route.query.price || this.$store.state.options.price;
          const page = 1;
          const per_page =
            this.$route.query.per_page || this.$store.state.options.per_page;
          const sort = this.$route.query.sort || this.$store.state.options.sort;
          const view = this.$route.query.view || this.$store.state.options.view;

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
            loadMoreData: false,
            query,
            asset: formatAsset,
            price,
            page,
            per_page,
            sort,
            view,
          });
        } catch (error) {
          console.log("Error fetching search suggestion:", error);
        }
      }

      this.$store.commit("setApiLoading", {
        loading: false,
        type: this.$route.path.split("/")[1],
      });
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
