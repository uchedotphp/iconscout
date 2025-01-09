<template>
  <footer class="bottom-footer">
    <p>&copy; 2023 Your Company. All rights reserved.</p>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BottomFooter",
  data() {
    return {
      countries: [
        "United States",
        "Malaysia",
        "India",
        "Canda",
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
    };
  },
});
</script>

<style scoped>
.bottom-footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1rem;
}
</style>
