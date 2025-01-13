<template>
  <nav class="h-100 d-flex align-items-center secondary-navigation">
    <ul class="h-100 d-flex align-items-center">
      <li
        v-for="{ id, asset, title } in navigationItems"
        :key="id"
        class="h-100 d-flex align-items-center"
      >
        <router-link
          :to="goToLink(asset)"
          :event="''"
          @click.native.prevent="setAsset($event, asset)"
          class="h-100 nav-item"
          >{{ title }}</router-link
        >
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import Vue from "vue";
import { navItems } from "~/data/data";
import type { assetType } from "~/data/dataTypes";
import { mapState, mapMutations } from "vuex";

interface NavigationItem {
  id: number;
  asset: assetType;
  title: string;
}
export default Vue.extend({
  name: "SecondaryNavigation",
  data() {
    return {
      navigationItems: navItems as NavigationItem[],
    };
  },
  computed: {
    ...mapState({
      storeSearchTerm: (state: any) => {
        const { options } = state;
        return options.query;
      },
    }),
  },
  methods: {
    ...mapMutations(["updateAnOptionProperty", "resetOptions"]),
    setAsset(event: Event, param: assetType): void {
      const storeSearchTerm: string = this.storeSearchTerm;
      this.resetOptions();
      this.updateAnOptionProperty({ key: "asset", value: param });
      this.updateAnOptionProperty({ key: "query", value: storeSearchTerm });
      this.$router.push(`/${param}/${this.storeSearchTerm}`);
    },
    goToLink(asset: assetType) {
      return `/${asset}/${this.storeSearchTerm}`;
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

        // &.nuxt-link-exact-active {
        &.nuxt-link-active, &.nuxt-link-exact-active {
          color: var(--ics-black);
          &::before {
            content: "";
            position: absolute;
            background: var(--ics-black);
            bottom: 0;
            width: 100%;
            height: 2px;
          }
        }
      }
    }
  }
}
</style>
