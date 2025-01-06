<template>
  <footer class="footer">
    <div class="mx-auto content">
      <div class="top">
        <div class="content">
          <FooterTopArea max-width="1100px" />
          <FooterMiddleArea max-width="1113px" class="middle" />
        </div>
      </div>
      <div class="bottom">
        <div class="content">
          <FooterBottomArea max-width="1100px" />
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FooterComponent",
});
</script>

<style lang="scss" scoped>
.footer {
  .top {
    background-color: #ebedf5;
  }
  .middle {
    padding-block: 24px;
    border-top: 1px solid #D8DBEB;
  }
  .bottom {
    background-color: #d8dbeb;
    padding-block: 24px;
  }
}
.content {
  // max-width: 1100px;
}
</style>
