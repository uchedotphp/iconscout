<template>
  <div class="error-page status-code h-100">
    <img src="~/assets/images/2079322.jpg" height="404px" alt="404 page" />
    <p>{{ error.message }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ErrorPage",
  head() {
    return {
      title: this.error.statusCode + " Error",
    };
  },
  props: {
    error: {
      type: Object as () => { statusCode: number; message: string },
      required: true,
    },
  },
});
</script>

<style scoped>
.error-page {
  margin-top: 100px;
  display: grid;
  place-content: center;
}

p {
  font-size: 1.5rem;
}
</style>
