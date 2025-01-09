<template>
  <div
    :style="{ maxWidth: maxWidth }"
    class="mx-auto d-flex justify-content-between align-items-center bottom-area"
  >
    <div class="copy">
      © 2021 Design Barn Inc. Made with in <span :key="currentCountry" class="country">{{ currentCountry }}</span>
    </div>
    <div>
      <img src="~/assets/images/payemt-ads.svg" alt="" srcset="" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BottomArea",
  props: {
    maxWidth: {
      type: String,
      default: "100%",
    },
  },
  data() {
    return {
      countries: [
        "United States",
        "Malaysia",
        "India",
        "Canada",
        "Singapore",
        "South Korea",
        "United Kingdom",
        "China",
        "France",
        "Maldives",
        "Netherlands",
        "Kazakhstan",
        "Turkey",
        "Ukraine",
        "Vietnam",
      ],
      currentIndex: 0,
    };
  },
  computed: {
    currentCountry() {
      return this.countries[this.currentIndex];
    },
  },
  mounted() {
    this.startCountryRotation();
  },
  methods: {
    startCountryRotation() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 1) % this.countries.length;
      }, 2000);
    },
  },
});
</script>

<style lang="scss" scoped>
.bottom-area {
  .copy {
    font-family: Karla;
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    color: #424866;
  }
}

.country {
  display: inline-block;
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.country-enter-active,
.country-leave-active {
  opacity: 1;
}

.country-enter,
.country-leave-to {
  opacity: 0;
}
</style>
