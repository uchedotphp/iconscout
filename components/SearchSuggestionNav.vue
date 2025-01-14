<template>
  <div class="align-items-center search-suggestion-nav">
    <BaseBtn
      v-if="showLeftButton"
      class="nav-scroll-btn left-arrow"
      @click="scrollLeft"
    >
      <template #iconRight>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.459285 7.71045L6.11929 13.3605C6.21225 13.4542 6.32285 13.5286 6.44471 13.5793C6.56657 13.6301 6.69727 13.6563 6.82929 13.6563C6.9613 13.6563 7.092 13.6301 7.21386 13.5793C7.33572 13.5286 7.44632 13.4542 7.53929 13.3605C7.72554 13.1731 7.83008 12.9196 7.83008 12.6555C7.83008 12.3913 7.72554 12.1378 7.53929 11.9505L2.58929 6.95045L7.53928 2.00045C7.72554 1.81309 7.83008 1.55964 7.83008 1.29545C7.83008 1.03127 7.72554 0.777815 7.53928 0.590452C7.44667 0.495964 7.33622 0.420794 7.21435 0.369297C7.09247 0.317801 6.96159 0.291002 6.82928 0.290453C6.69698 0.291002 6.56609 0.317801 6.44422 0.369297C6.32234 0.420794 6.2119 0.495964 6.11928 0.590452L0.459285 6.24045C0.35778 6.33409 0.276772 6.44775 0.221364 6.57425C0.165957 6.70075 0.137352 6.83735 0.137352 6.97545C0.137352 7.11355 0.165957 7.25016 0.221364 7.37666C0.276772 7.50316 0.35778 7.61681 0.459285 7.71045Z"
            fill="#767FAD"
          />
        </svg>
      </template>
    </BaseBtn>

    <BaseBtn
      v-if="showRightButton"
      class="nav-scroll-btn right-arrow"
      @click="scrollRight"
    >
      <template #iconRight>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.54071 6.28955L1.88071 0.639549C1.78775 0.54582 1.67715 0.471426 1.55529 0.420657C1.43343 0.369889 1.30273 0.34375 1.17071 0.34375C1.0387 0.34375 0.907997 0.369889 0.786138 0.420657C0.664278 0.471426 0.553677 0.54582 0.460714 0.639548C0.274463 0.826911 0.169922 1.08036 0.169922 1.34455C0.169922 1.60873 0.274463 1.86219 0.460714 2.04955L5.41071 7.04955L0.460712 11.9995C0.274461 12.1869 0.16992 12.4404 0.16992 12.7045C0.16992 12.9687 0.274461 13.2222 0.460712 13.4095C0.553327 13.504 0.663772 13.5792 0.785647 13.6307C0.907522 13.6822 1.0384 13.709 1.17071 13.7095C1.30302 13.709 1.4339 13.6822 1.55578 13.6307C1.67765 13.5792 1.7881 13.504 1.88071 13.4095L7.54071 7.75955C7.64222 7.66591 7.72323 7.55226 7.77863 7.42576C7.83404 7.29926 7.86265 7.16265 7.86265 7.02455C7.86265 6.88645 7.83404 6.74984 7.77863 6.62334C7.72323 6.49684 7.64222 6.38319 7.54071 6.28955Z"
            fill="#767FAD"
          />
        </svg>
      </template>
    </BaseBtn>

    <nav ref="scrollContainer">
      <ul class="d-flex data-nav">
        <li v-for="(suggestion, index) in suggestions" :key="index" class="">
          <BaseBtn @click="selectSuggestion(suggestion)">
            <template #label> {{ suggestion }} {{ asset }} </template>
          </BaseBtn>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SearchSuggestionNav",
  props: {
    suggestions: {
      type: Array as () => string[],
      required: true,
    },
    asset: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showLeftButton: false,
      showRightButton: true,
    };
  },

  mounted() {
    const container = this.$refs.scrollContainer;
    // Initial button visibility
    this.updateScrollButtons();

    // Add event listener to track scrolling
    // @ts-ignore
    container.addEventListener("scroll", this.updateScrollButtons);
  },

  beforeDestroy() {
    const container = this.$refs.scrollContainer;
    // @ts-ignore
    container.removeEventListener("scroll", this.updateScrollButtons);
  },

  methods: {
    selectSuggestion(suggestion: string) {
      this.$emit("selected", suggestion);
    },

    updateScrollButtons() {
      const container = this.$refs.scrollContainer;
      // @ts-ignore
      this.showLeftButton = container.scrollLeft > 0;
      // @ts-ignore
      this.showRightButton = container.scrollLeft + container.offsetWidth < container.scrollWidth;
    },

    scrollLeft() {
      const container = this.$refs.scrollContainer;
      // @ts-ignore
      container.scrollBy({ left: -container.offsetWidth, behavior: "smooth" });
      // container.scrollBy({ left: -200, behavior: "smooth" });
    },
    scrollRight() {
      const container = this.$refs.scrollContainer;
      // @ts-ignore
      container.scrollBy({ left: container.offsetWidth, behavior: "smooth" });
      // container.scrollBy({ left: 200, behavior: "smooth" });
    },
  },
});
</script>

<style lang="scss" scoped>
.search-suggestion-nav {
  position: relative;
  height: 38px;
  margin-top: 13px;

  .nav-scroll-btn {
    border: 1px solid #b4bad6;
    border-radius: 50%;
    position: absolute;
    height: 100%;
    z-index: 2;
    background-color: white;
    padding-inline: 15px;

    &.left-arrow {
      left: -14px;
    }

    &.right-arrow {
      right: -14px;
    }
  }

  nav {
    width: 100%;
    overflow-x: auto;
    position: absolute;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }

    .data-nav {
      > *:not(:last-child) {
        margin-right: 10px;
      }

      button {
        background-color: #f8f9fa;
        padding: 7px 12px;
        border: 1px solid #e4e9f2;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
        &:hover {
          background-color: #ebedf5;
        }
      }
    }
  }
}
</style>
