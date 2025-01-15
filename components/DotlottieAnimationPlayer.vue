<template>
  <article
    class="display-card"
    :class="{ 'hover-bg': showButtons }"
    @mouseenter="showButtons = true"
    @mouseleave="showButtons = false"
  >
    <div class="h-100">
      <a href="#" class="content position-relative">
        <!-- in dotlottie -->
        <div class="lottie">
          <DotLottiePlayer
            src="https://lottie.host/4db68bbd-31f6-4cd8-84eb-189de081159a/IGmMCqhzpt.lottie"
            autoplay="true"
            loop="true"
          />
        </div>
      </a>
    </div>
    <div v-show="showButtons" class="ext-buttons">
      <button style="top: 12px; right: 12px" class="position-absolute">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="35"
            height="35"
            rx="5.5"
            fill="#EBEDF5"
          />
          <rect
            x="0.5"
            y="0.5"
            width="35"
            height="35"
            rx="5.5"
            stroke="#D8DBEB"
          />
          <path
            d="M25 12H18.7L18.4 11.1C18 9.8 16.9 9 15.6 9H11C9.3 9 8 10.3 8 12V25C8 26.7 9.3 28 11 28H25C26.7 28 28 26.7 28 25V15C28 13.3 26.7 12 25 12ZM20 21H19V22C19 22.6 18.6 23 18 23C17.4 23 17 22.6 17 22V21H16C15.4 21 15 20.6 15 20C15 19.4 15.4 19 16 19H17V18C17 17.4 17.4 17 18 17C18.6 17 19 17.4 19 18V19H20C20.6 19 21 19.4 21 20C21 20.6 20.6 21 20 21Z"
            fill="#596080"
          />
        </svg>
      </button>
      <button style="bottom: 12px; right: 12px" class="position-absolute">
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="35"
            height="35"
            rx="5.5"
            fill="#EBEDF5"
          />
          <rect
            x="0.5"
            y="0.5"
            width="35"
            height="35"
            rx="5.5"
            stroke="#D8DBEB"
          />
          <path
            d="M25 26H11C10.7348 26 10.4804 26.1054 10.2929 26.2929C10.1054 26.4804 10 26.7348 10 27C10 27.2652 10.1054 27.5196 10.2929 27.7071C10.4804 27.8946 10.7348 28 11 28H25C25.2652 28 25.5196 27.8946 25.7071 27.7071C25.8946 27.5196 26 27.2652 26 27C26 26.7348 25.8946 26.4804 25.7071 26.2929C25.5196 26.1054 25.2652 26 25 26ZM17.29 23.71C17.3851 23.801 17.4972 23.8724 17.62 23.92C17.7397 23.9729 17.8691 24.0002 18 24.0002C18.1309 24.0002 18.2603 23.9729 18.38 23.92C18.5028 23.8724 18.6149 23.801 18.71 23.71L22.71 19.71C22.8983 19.5217 23.0041 19.2663 23.0041 19C23.0041 18.7337 22.8983 18.4783 22.71 18.29C22.5217 18.1017 22.2663 17.9959 22 17.9959C21.7337 17.9959 21.4783 18.1017 21.29 18.29L19 20.59V9C19 8.73478 18.8946 8.48043 18.7071 8.29289C18.5196 8.10536 18.2652 8 18 8C17.7348 8 17.4804 8.10536 17.2929 8.29289C17.1054 8.48043 17 8.73478 17 9V20.59L14.71 18.29C14.6168 18.1968 14.5061 18.1228 14.3842 18.0723C14.2624 18.0219 14.1319 17.9959 14 17.9959C13.8681 17.9959 13.7376 18.0219 13.6158 18.0723C13.4939 18.1228 13.3832 18.1968 13.29 18.29C13.1968 18.3832 13.1228 18.4939 13.0723 18.6158C13.0219 18.7376 12.9959 18.8681 12.9959 19C12.9959 19.1319 13.0219 19.2624 13.0723 19.3842C13.1228 19.5061 13.1968 19.6168 13.29 19.71L17.29 23.71Z"
            fill="#596080"
          />
        </svg>
      </button>
    </div>
  </article>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "DotlottieAnimationPlayer",
  props: {
    animationPath: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showButtons: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.display-card {
  border-radius: 8px;
  background-color: #fafafc;
  position: relative;
  height: 210px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.ext-buttons {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  opacity: 0;
}

.display-card:hover .ext-buttons {
  opacity: 1;
}

.pic-on {
  transform: scale(1.05);
  object-fit: cover;
  // transition: transform 0.3s ease;
  transition: transform 0.4s ease;
}
.hover-bg {
  background-color: #e8e8eb;
}
</style>
