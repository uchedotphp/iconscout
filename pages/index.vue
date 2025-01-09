<template>
  <div>
    <h1>Welcome. Please put a search term in the input box to get started.</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapMutations } from "vuex";

export default defineComponent({
  name: "Index",
  mounted() {
    console.log("mounting");
    this.setSearchQuery("");
    this.setAssetType("all-assets");
  },

  methods: {
    ...mapMutations(["setSearchQuery", "setAssetType"]),
  },
});
</script>

<style scoped>
h1 {
  color: var(--ics-black);
  font-weight: 700;
  text-align: center;
  margin-top: 100px;
  font-size: 24px;
}
</style>
