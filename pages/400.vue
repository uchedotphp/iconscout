<template>
  <div class="error-page">
    <h1>Error 400 - Bad Request</h1>
    <p>The server could not understand the request due to invalid syntax.</p>
    <nuxt-link to="/">Go back to home</nuxt-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Error400Page',
});
</script>

<style scoped>
.error-page {
  text-align: center;
  margin-top: 50px;
}

.error-page h1 {
  font-size: 2em;
  margin-bottom: 20px;
}

.error-page p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.error-page a {
  color: #42b983;
  text-decoration: none;
}
</style>
