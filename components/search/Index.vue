<template>
  <section
    :class="[
      'position-relative header-search',
      { 'header-search-focused': isFocused },
    ]"
  >
    <!-- dropdown -->
    <span class="assets-selection">
      <DropdownBtn
        :dropdownText="getCategoryName(storeAsset)"
        :options="assetOptions"
        id="filter-options"
        class="dropdown-btn"
        @click="switchAsset"
      />
    </span>
    <div class="d-flex align-items-center search-container">
      <BaseBtn @click="performSearch">
        <template #iconLeft>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11 17.0002C14.3137 17.0002 17 14.314 17 11.0002C17 7.68654 14.3137 5.00024 11 5.00024C7.68629 5.00024 5 7.68654 5 11.0002C5 14.314 7.68629 17.0002 11 17.0002Z"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M19 19.0002L15.24 15.2402"
              stroke="black"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </template>
      </BaseBtn>
      <!-- input box -->
      <SearchInputBox
        v-model.trim="searchTerm"
        @focus="handleFocus"
        @blur="handleBlur"
        @keyupenter="performSearch"
        @clearSearch="searchTerm = ''"
        :placeholder="placeHolderText"
        class="w-100"
      />
    </div>
    <!-- Not in use for available features currently -->
    <BaseBtn disabled>
      <template #iconLeft>
        <img src="~/assets/images/image-search-icon.svg" alt="search icon" />
      </template>
    </BaseBtn>

    <!-- suggestion panel -->
    <SearchSuggestionPanel :showPanel="showSuggestionPanel" :suggestions="[]" />
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import { assetOptions } from "~/data/data";
import { mapState, mapMutations } from "vuex";
import { assetType } from "~/data/dataTypes";

function getCategoryName(assetType: string): string {
  const categoryMap: { [key: string]: string } = {
    "all-assets": "All",
    "3d-illustrations": "3D",
    "lottie-animations": "Animations",
    illustrations: "Illustrations",
    icons: "Icons",
  };
  return categoryMap[assetType];
}

export default Vue.extend({
  name: "Search",
  data() {
    return {
      assetOptions,
      getCategoryName,
      isFocused: false,
      showSuggestionPanel: false,
    };
  },
  computed: {
    ...mapState({
      storeAsset: (state: any) => {
        const { options } = state;
        const assetType = options.asset;
        return assetType;
      },
      storeSearchTerm: (state: any): string => state.options.query,
      defaultAnimationPlayer: (state: any) => state.animationPlayer,
    }),
    searchTerm: {
      get(): string {
        // @ts-ignore
        return this.$formatText.addSpace(this.$store.state.options.query);
      },
      set(value: string) {
        this.updateAnOptionProperty({ key: "query", value });
      },
    },
    placeHolderText(): string {
      const text =
        this.storeAsset === "all-assets"
          ? "assets"
          : this.storeAsset.replace(/-/g, " ");
      return `Search from Million+ of ${text}`;
    },
  },
  methods: {
    ...mapMutations(["updateAnOptionProperty", "resetOptions"]),
    handleFocus() {
      this.isFocused = true;
      this.showSuggestionPanel = true;
    },
    handleBlur() {
      this.isFocused = false;
      this.showSuggestionPanel = false;
    },
    formattedSearchQueryWithSpace(q: string): string {
      // Replace spaces with hyphens in the search query
      return q.trim().replace(/-/g, " ");
    },

    switchAsset(val: assetType) {
      // @ts-ignore
      const formattedVal = this.$formatText.addHypen(val);
      this.resetOptions();
      this.updateAnOptionProperty({ key: "asset", value: formattedVal });
      const searchTerm = this.$route.params.keyword || this.storeSearchTerm;

      if (searchTerm) {
        // @ts-ignore
        this.$helpers.gotoRoute({
          asset: formattedVal,
          query: searchTerm,
        });
      }
    },

    performSearch() {
      if (this.storeSearchTerm.length) {
        this.showSuggestionPanel = false;
        // @ts-ignore
        this.$helpers.gotoRoute({
          asset: this.storeAsset,
          query: this.storeSearchTerm,
        });
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.header-search {
  background-color: #ebedf5;
  border-radius: 8px;
  width: 100%;
  display: flex;
  align-items: center;
  padding-right: 10px;

  button {
    border: none;
    padding: 0;
    border-radius: 9999px;
    &:hover {
      background-color: var(--ics-white);
    }
  }

  .assets-selection {
    font-weight: 600;
    border-right: 1px solid var(--ics-dark-gray);
    .dropdown-btn {
      padding: 8px 10px;
    }
  }
}

.header-search-focused {
  outline: 1px solid #0092e4;
}

.search-container {
  padding: 9px;
  margin-block: 8px;
  flex: 1;
  button {
    border-right: none !important;
    margin-right: 9px;
  }
}
</style>
