<template>
  <!-- <div> -->
    <Nuxt />
  <!-- </div> -->
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'IndexPage',
  data() {
    return {
      pageTitle: 'My assessement'
    }
  },
  head() {
    return {
      title: this.pageTitle,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'This is the home page'
        }
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
