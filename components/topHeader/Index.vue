<template>
  <header class="top-header">
    <nav>
      <ul class="d-flex align-items-center">
        <li>
          <nuxt-link to="/">
            <img src="~/assets/images/iconScout-logo.svg" />
          </nuxt-link>
        </li>
        <li>
          <TopHeaderSearch />
        </li>
        <li>
          <TopHeaderLinks />
        </li>
        <li>
          <TopHeaderRegistrationBtns />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "TopHeader",
});
</script>

<style lang="scss" scoped>
.top-header {
  position: sticky;
  z-index: 1000;
  background-color: #ffffff;
  padding: 12px 24px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08), 0px 8px 12px rgba(0, 0, 0, 0.04);

  nav {
    ul {
      width: 100%;

      li:last-child {
        margin-left: auto;
      }
      li {
        &:not(:last-child) {
          margin-right: 29px;
        }
      }
    }
  }
}
</style>
