<template>
  <section>
    <button
      class="btn btn-link block w-100 d-flex justify-content-between align-items-center"
      type="button"
      :data-target="`#collapse-${uid}`"
      :aria-controls="`collapse-${uid}`"
      @click="toggle"
    >
      <span>
        <slot name="title" />
      </span>
      <svg
        :class="{ rotated: expanded }"
        width="10"
        height="6"
        viewBox="0 0 10 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.71934 0.279313C9.5416 0.100415 9.30117 0 9.05056 0C8.79994 0 8.55951 0.100415 8.38178 0.279313L4.97622 3.67957L1.6181 0.279313C1.44036 0.100415 1.19993 0 0.949319 0C0.698706 0 0.458276 0.100415 0.28054 0.279313C0.191627 0.368606 0.121055 0.474841 0.0728944 0.59189C0.0247341 0.708939 -6.10352e-05 0.834485 -6.10352e-05 0.961285C-6.10352e-05 1.08809 0.0247341 1.21363 0.0728944 1.33068C0.121055 1.44773 0.191627 1.55396 0.28054 1.64326L4.3027 5.71588C4.39089 5.80591 4.49581 5.87736 4.6114 5.92613C4.727 5.97489 4.85099 6 4.97622 6C5.10145 6 5.22544 5.97489 5.34104 5.92613C5.45664 5.87736 5.56156 5.80591 5.64974 5.71588L9.71934 1.64326C9.80825 1.55396 9.87882 1.44773 9.92698 1.33068C9.97514 1.21363 9.99994 1.08809 9.99994 0.961285C9.99994 0.834485 9.97514 0.708939 9.92698 0.59189C9.87882 0.474841 9.80825 0.368606 9.71934 0.279313Z"
          fill="#8F95B2"
        />
      </svg>
    </button>

    <div
      :id="`collapse-${uid}`"
      class="collapse"
      :class="{ show: expanded }"
      :aria-labelledby="`heading-${uid}`"
    >
      <slot name="content" />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Accordion",
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    uid: {
      type: String,
      required: true,
    },
  },

  methods: {
    toggle() {
      this.$emit("toggle");
    },
  },
});
</script>

<style lang="scss" scoped>
button {
  text-align: left;
  font-family: "Averta Std", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 17.3px;
  color: #1c2033;
  padding: 0;
  text-decoration: none !important;
  &:hover {
    color: #1c2033;
  }
  &:focus {
    outline: none;
    box-shadow: none;
  }
}

svg {
  transition: transform 0.3s ease;
  &.rotated {
    transform: rotate(180deg);
  }
}

.collapse {
  padding-top: 18px;
}
</style>
