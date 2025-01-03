<template>
  <div class="header-search">
    <button class="d-flex align-items-center">
      <span> {{ computedCategory }} </span>
      <img src="~/assets/images/down-arrow.svg" />
    </button>
    <div class="d-flex align-items-center search-cont">
      <button>
        <img src="~/assets/images/small-search.svg" alt="search button" />
      </button>
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search from 8 Million+ assets"
      />
    </div>
    <button @click="performSearch" class="img-search">
      <img src="~/assets/images/image-search-icon.svg" alt="search icon" />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "TopHeaderSearch",

  data() {
    return {
      searchQuery: "",
    };
  },

  computed: {
    routeSection() {
      return this.$route.path.split("/")[1];
    },
    computedCategory(): string {
      const keyword = this.routeSection;
      const categoryMap: { [key: string]: string } = {
        "3d-illustrations": "3D",
        "lottie-animations": "Animations",
        "illustrations": "Illustrations",
        "icons": "Icons",
      };
      return categoryMap[keyword] || "All";
    },
  },

  methods: {
    performSearch() {
      // Implement search logic here
      console.log("Searching for:", this.searchQuery);
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

  button:first-of-type {
    border: none;
    padding-inline: 10px 9px;
    font-weight: 600;
    border-right: 1px solid #b4bad6;
  }
}

.search-cont {
  margin-right: 10px;
  padding: 5px;
  flex: 1;
  button {
    border-right: none !important;
    // background-color: red;
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
