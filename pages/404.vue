<template>
  <div class="not-found">
    <img src="~/assets/images/2079322.jpg" height="404px" alt="404 page" />
    <h1>Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <nuxt-link to="/">Go back to Home</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFoundPage",
  layout: "error",
  head() {
    return {
      title: "404 Error",
    };
  },
});
</script>

<style lang="scss" scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
  display: grid;
  place-content: center;

  h1 {
    font-size: 2em;
    margin-bottom: 20px;
  }
  p {
    margin-bottom: 20px;
  }
  a {
    color: #007bff;
    text-decoration: none;
  }
}
</style>
