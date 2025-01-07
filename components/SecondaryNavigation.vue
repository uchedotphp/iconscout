<template>
  <nav class="h-100 d-flex align-items-center secondary-navigation">
    <ul class="h-100 d-flex align-items-center">
      <li
        v-for="{ id, asset, name } in navigationItems"
        :key="id"
        class="h-100 d-flex align-items-center"
      >
        <NuxtLink
          :to="goToLink({ name, params: $route.params.keyword || '' })"
          class="h-100 nav-item"
          no-prefetch
          >{{ asset }}</NuxtLink
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface NavigationItem {
  id: number;
  asset: string;
  name: string;
}

export default defineComponent({
  name: "SecondaryNavigation",
  data() {
    return {
      navigationItems: [] as NavigationItem[],
    };
  },
  created() {
    this.navigationItems = [
      { id: 1, asset: "All Assets", name: "all-assets" },
      { id: 2, asset: "3D Illustrations", name: "3d-illustrations" },
      { id: 3, asset: "Lottie Animations", name: "lottie-animations" },
      { id: 4, asset: "Illustrations", name: "illustrations" },
      { id: 5, asset: "Icons", name: "icons" },
    ];
  },
  methods: {
    goToLink({ name, params }: { name: string; params: string }) {
      return `/${name}/${params}`;
    },
  },
});
</script>

<style lang="scss" scoped>
.secondary-navigation {
  ul {
    li {
      margin-right: 23px;
      &:last-child {
        margin-right: 0;
      }
      .nav-item {
        text-decoration: none;
        font-family: "Averta Std", sans-serif;
        font-size: 14px;
        font-weight: 600;
        line-height: 21px;
        color: var(--ics-gray-blue);
        padding-block: 12px;
        position: relative;

        &:hover {
          color: var(--ics-black);
        }

        &.nuxt-link-exact-active {
          color: var(--ics-black);
          &::before {
            content: "";
            position: absolute;
            background: var(--ics-black);
            bottom: 0; //TODO:: return to this
            width: 100%;
            height: 2px;
          }
        }
      }
    }
  }
}
</style>
