<template>
  <div :class="['header-search', { 'header-search-focused': isFocused }]">
    <span class="assets">
      <DropdownBtn
        :dropdownText="getCategoryName(storeAsset)"
        :options="assetOptions"
        id="filter-options"
        @click="switchAsset"
      />
    </span>
    <div class="d-flex align-items-center search-cont">
      <BaseBtn @click="performSearch" class="pl-0">
        <template #iconLeft>
          <img src="~/assets/images/small-search.svg" alt="search button" />
        </template>
      </BaseBtn>
      <input
        type="text"
        v-model.trim="searchTerm"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyup.enter="performSearch"
        :placeholder="placeHolderText"
      />
    </div>
    <BaseBtn disabled>
      <template #iconLeft>
        <img src="~/assets/images/image-search-icon.svg" alt="search icon" />
      </template>
    </BaseBtn>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { assetOptions } from "~/data/data";
import { mapState, mapMutations, mapActions } from "vuex";

function getCategoryName(assetType: string): string {
  const categoryMap: { [key: string]: string } = {
    "3d-illustrations": "3D",
    'lottie-animations': "Animations",
    illustrations: "Illustrations",
    icons: "Icons",
  };
  return categoryMap[assetType] || "All";
}

export default Vue.extend({
  name: "TopHeaderSearch",
  data() {
    return {
      assetOptions,
      searchTerm: "",
      getCategoryName,
      isFocused: false,
    };
  },
  mounted() {
    this.searchTerm = this.storeSearchTerm;
  },
  computed: {
    ...mapState({
      storeAsset: (state: any) => {
        const { options } = state;
        const assetType = options.asset;
        return assetType;
      },
      storeSearchTerm: (state: any) => state.options.query,
      currentPage: (state: any) => state.apiResponse.current_page,
    }),
    placeHolderText(): string {
      const text =
        this.storeAsset === "all-assets"
          ? "assets"
          : this.storeAsset.replace(/-/g, " ");
      return `Search from Million+ of ${text}`;
    },
  },

  watch: {
    "$route.param.keyword": {
      immediate: false, // Run on component mount
      async handler(newQuery) {
        this.setApiLoading(true);
        try {
          // const val = this.$route.params.keyword;
          // this.setPageOption(this.currentPage.current_page + 1);
          // console.log("page option: ", this.currentPage.current_page);
          // this.setSearchQuery(val);
          // await this.loadMoreResults();
          console.log("about to rerun search");
        } catch (error) {
          console.log("error fetching more data: ", error);
        }
        this.setApiLoading(false);
      },
    },
  },

  methods: {
    ...mapActions(["loadMoreResults"]),
    ...mapMutations([
      "setSearchQuery",
      "setApiLoading",
      "setSearchQuery",
      "setPageOption",
      "updateAnOptionProperty",
    ]),
    handleFocus() {
      this.isFocused = true;
      console.log("focused: ", this.isFocused);
    },
    handleBlur() {
      this.isFocused = false;
    },
    switchAsset(val: string) {

      const formattedVal = val.toLowerCase().replace(/\s+/g, "-");
      console.log('value: ', formattedVal);
      this.updateAnOptionProperty({ key: "asset", value: formattedVal });
      if (this.storeSearchTerm) {
        this.$router.push(`/${formattedVal}/${this.storeSearchTerm}`);
      }
    },

    performSearch() {
      if (this.searchTerm.length) {
        console.log("searcingg");

        // this.setSearchQuery(this.searchTerm);
        this.$store.commit("setSearchQuery", this.searchTerm);
        const categoryMap: { [key: string]: string } = {
          all: "all-assets",
          "3d": "3d-illustrations",
          lottie: "lottie-animations",
          illustrations: "illustrations",
          icons: "icons",
        };
        this.$router.push(
          `/${categoryMap[this.storeAsset.toLowerCase()]}/${this.searchTerm}`
        );
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.header-search {
  background-color: #ebedf5;
  border-radius: 8px;
  padding-block: 8px;
  width: 360px;
  display: flex;
  align-items: center;
  padding-right: 10px;

  button {
    border: none;
    padding: 0;
  }

  .assets {
    padding: 8px 10px;
    font-weight: 600;
    border-right: 1px solid #b4bad6;
  }
}

.header-search-focused {
  outline: 1px solid #0092e4;
}

.search-cont {
  padding: 9px;
  flex: 1;
  button {
    border-right: none !important;
    padding-right: 9px;
  }
  input {
    width: 100%;
    &::placeholder {
      font-family: "Averta Std", sans-serif;
      font-size: 14px;
      font-weight: 400;
      line-height: 24px;
      color: var(--ics-light-black);
    }
  }
}
</style>
