<template>
  <article class="display-card">
    <div class="h-100">
      <a href="#" class="content">
        <!-- <canvas
          :id="data.id"
          ref="iconCanvas"
          width="154"
          height="154"
          style="width: 77px; height: 77px"
        ></canvas> -->
        <picture style="width: 194px">
          <source :srcset="data.urls.thumb" class="img-fluid" />
          <img :src="data.urls.thumb" class="img-fluid" alt="" />
        </picture>
      </a>
    </div>
    <div v-show="showButtons" class="ext-buttons">test</div>
  </article>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "IconCardData",
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showButtons: false,
    };
  },
  mounted() {
    // this.drawCanvas
  },
  computed: {
    // drawCanvas() {
    //   const c = this.$refs.iconCanvas as HTMLCanvasElement;
    //   const ctx = c.getContext("2d");
    //   const base_image = new Image();
    //   base_image.src = this.data.urls.thumb;
    //   base_image.onload = () => {
    //     ctx.drawImage(base_image, 0, 0);
    //   };
    // },
  },
});
</script>

<style lang="scss" scoped>
.display-card {
  &:hover .picture > img {
    transform: scale(1.05);
    transition: transform 0.3s ease;
  }
}
.display-card {
  border-radius: 8px;
  background-color: #fafafc;
  position: relative;
  display: block;
  cursor: pointer;
  height: 140px;
  // transition: background-color 0.3s ease;
  overflow: hidden;
  // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  &:hover {
    // transform: translateY(-5px);
    // box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  .content {
    padding: 8px 12px;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
}

.ext-buttons {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #b4bad6;
  z-index: 2;
  cursor: pointer;
  transition: background-color 0.3s ease;
  // transition: opacity 0.15s linear;
  &:hover {
    opacity: 1;
  }

  &::before {
    content: "";
    display: block;
    opacity: 0;
    // background: rgba(46, 51, 76, 0.1);
    // transition: opacity 0.15s linear;
    transition: background-color 0.3s ease;
    border-radius: 12px;
    pointer-events: none;
  }
}
</style>
