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

function getCategoryName(assetType: string): string {
  console.log('me: ', assetType);

  const categoryMap: { [key: string]: string } = {
    'all-assets': "All",
    "3d-illustrations": "3D",
    "lottie-animations": "Animations",
    illustrations: "Illustrations",
    icons: "Icons",
  };
  console.log('now: ', categoryMap[assetType]);

  return categoryMap[assetType];
}

export default Vue.extend({
  name: "Search",
  data() {
    return {
      assetOptions,
      searchTerm: "",
      getCategoryName,
      isFocused: false,
      showSuggestionPanel: false,
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
    // "$route.params.keyword": {
    //   handler: function (newSearch, oldSearch) {
    //     console.log("newSearch ", newSearch, ' oldSearch ', oldSearch);
    //     if (newSearch && newSearch.toLowerCase() !== this.searchTerm.toLowerCase()) {
    //       this.searchTerm = newSearch;
    //     }
    //   },
    //   deep: true,
    //   immediate: true,
    // },
  },
  methods: {
    ...mapMutations([
      "setSearchQuery",
      "setApiLoading",
      "setSearchQuery",
      "setPageOption",
      "updateAnOptionProperty",
      "resetOptions",
    ]),
    handleFocus() {
      this.isFocused = true;
      this.showSuggestionPanel = true;
    },
    handleBlur() {
      this.isFocused = false;
      this.showSuggestionPanel = false;
    },
    switchAsset(val: string) {
      const formattedVal = val.toLowerCase().replace(/\s+/g, "-");
      console.log('ok: ', formattedVal);
      this.updateAnOptionProperty({ key: "asset", value: formattedVal });
      if (this.storeSearchTerm) {
        this.resetOptions();
        this.updateAnOptionProperty({ key: "query", value: this.searchTerm });
        this.$router.push(`/${formattedVal}/${this.storeSearchTerm}`);
      }
    },
    performSearch() {
      if (this.searchTerm.length) {
        this.showSuggestionPanel = false;
        // this.resetOptions();
        this.updateAnOptionProperty({ key: "query", value: this.searchTerm });
        this.$router.push(`/${this.storeAsset}/${this.storeSearchTerm}`);
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
