<template>
  <div
    :style="{ maxWidth: maxWidth }"
    class="mx-auto middle-area d-flex justify-content-between"
  >
    <div
      v-for="(links, key, index) in footerLinks"
      :key="index"
      class="footer-links"
    >
      <h5>{{ key }}</h5>
      <ul>
        <li v-for="(link, index) in links" :key="index">
          <NuxtLink to="#" no-prefetch>{{ link }}</NuxtLink>
        </li>
      </ul>
    </div>

    <div class="app-links">
      <div class="footer-links">
        <h5>Get IconScout for desktop</h5>
        <div>
          <img role="button" src="~/assets/images/apple-windows.svg" alt="apple and windows logo">
        </div>
      </div>

      <div class="footer-links">
        <h5>Get LottieFiles mobile app</h5>
        <div class="d-flex align-items-center">
          <img class="pr-3" src="~/assets/images/apple-download.svg" alt="apple store download">
          <img src="~/assets/images/android-download.svg" alt="android store download">
        </div>
      </div>

      <div class="footer-links">
        <h5>Follow us</h5>
        <img role="button" src="~/assets/images/social-links.svg" alt="social media links">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MiddleArea",
  data() {
    return {
      footerLinks: {
        "Graphic Resources": [
          "Free Icons",
          "Free Emoji Icons",
          "Free Logo Icons",
          "iOS Icons",
          "Sticker Icons",
          "Gradient Icons",
          "Curated Bundle",
          "Calendar of Festival",
          "Free Assets of the day",
          "Explore Design Assets",
        ],
        Products: [
          "Unicon Icon Font",
          "Color editor",
          "Apps & Plugins",
          "Hire designers",
          "IconScout API",
          "Top Illustrations",
          "Top 3D Assets",
          "Reverse Image Search",
          "Unicon Plugin for Figma",
        ],
        Company: [
          "Blog",
          "About",
          "Access features",
          "Sell on IconScout",
          "Startup program",
          "We’re hiring",
        ],
        Legal: [
          "Terms of use",
          "Privacy policy",
          "License agreeement",
          "Contributor terms",
          "Support center",
          "Join discord community",
        ],
      },
    };
  },
  props: {
    maxWidth: {
      type: String,
      default: "100%",
    },
  },
});
</script>

<style lang="scss" scoped>
.middle-area {
  .footer-links {
    h5 {
      font-family: "Averta Std", sans-serif;
      font-size: 14px;
      font-weight: 700;
      line-height: 24px;
      text-align: left;
      padding-bottom: 12px;
      color: #2e334c;
    }

    ul {
      list-style: none;

      li:not(:last-child) {
        padding-bottom: 4px;
      }

      li {
        a {
          text-decoration: none;
          font-family: "Averta Std", sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 24px;
          color: #424866;

          &:hover {
            color: var(--ics-black);
          }

          &.nuxt-link-exact-active {
            color: var(--ics-black);
          }
        }
      }
    }
  }

  .app-links {
    .footer-links:not(:last-child) {
      padding-bottom: 24px;
    }
  }
}
</style>
