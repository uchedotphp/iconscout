<template>
  <ul class="d-flex align-items-center header-links">
    <li>
      <button class="d-flex align-items-center">
        <span>
          explore
        </span>
        <img src="~/assets/images/angle-down.svg" alt="angle-down arrow">
      </button>
    </li>
    <li>
      <button class="d-flex align-items-center">
        <span>
          tools
        </span>
        <img src="~/assets/images/angle-down.svg" alt="angle-down arrow">
      </button>
    </li>
    <li>
      <button>all features</button>
    </li>
    <li>
      <button class="d-flex align-items-center">
        <img src="~/assets/images/gift.svg" alt="angle-down arrow">
        <span>
          free asset
        </span>
      </button>
    </li>
    <li>
      <button class="d-flex align-items-center">
        <span>
          learn
        </span>
        <img src="~/assets/images/angle-down.svg" alt="angle-down arrow">
      </button>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopHeaderLinks",
  data() {
    return {
      // Add your data properties here if needed
    };
  },
  methods: {
    // Add your methods here if needed
  },
  mounted() {
    // Add your mounted logic here if needed
  },
});
</script>

<style lang="scss" scoped>
ul.header-links {
  li {
    margin-right: 16px;
    &:last-child {
      margin-right: 0;
    }

    button {
      font-family: "Averta Std", sans-serif;
      font-size: 16px;
      font-weight: 600;
      line-height: 19.78px;
      text-transform: capitalize;
    }
  }
}
</style>
