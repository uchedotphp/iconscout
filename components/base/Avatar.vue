<template>
  <article
    v-if="!isImgAvaialble"
    class="display-initials relative-position"
    :style="alternateStyles"
    @click="handleClick"
  >
    <span>{{ displayInitials }}</span>
  </article>
  <img
    v-else
    :src="imageUrl"
    class="img-style"
    alt="user avatar"
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Avatar',
  props: {
    width: {
      type: Number,
      default: 2.5
    },
    height: {
      type: Number,
      default: 2.5
    },
    imageUrl: {
      type: String,
      default: ''
    },
    firstName: {
      type: String,
      default: 'Icon'
    },
    lastName: {
      type: String,
      default: 'Scout'
    },
    isBgWhite: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isImgAvaialble () {
      return this.imageUrl
    },
    displayInitials () {
      return String(
        this.firstName.charAt(0) + this.lastName.charAt(0)
      ).toUpperCase()
    },
    alternateStyles () {
      return {
        width: `${this.width}rem`,
        height: `${this.height}rem`,
        background: this.isBgWhite ? 'white' : '$light-blue'
      }
    }
  },
  methods: {
    handleClick(event: Event) {
      this.$emit("click", event);
    },
  },
})
</script>

<style lang="scss" scoped>
.display-initials {
  display: grid;
  place-content: center;
  height: 2rem;
  width: 2rem;
  border-radius: 9999px;
  background: #fafafc;
  border: 3px solid var(--ics-blue);

  span {
    font-size: 14px;
    font-weight: 700;
    color: #003CBE;
  }
}

.img-style {
  border-radius: 9999px;
  height: 40px;
  width: 40px;
}
</style>
