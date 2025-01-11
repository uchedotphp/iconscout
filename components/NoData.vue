<template>
  <div class="no-data">
    <div square flat class="no-data">
      <section class="text-center">
        <img
          :src="require(`~/assets/images/${imgUrl}`)"
          class="text-center"
        />
      </section>

      <p v-if="$slots.message" class="message">
        <slot name="message" />
      </p>
      <p v-if="$slots.subMessage" class="sub-message">
        <slot name="subMessage" />
      </p>

      <section
        v-if="$slots.default"
        class="full-width flex justify-center"
      >
        <slot />
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NoData",
  props: {
    imgUrl: {
      type: String,
      default: "no-data.jpg",
    },
  },
});
</script>

<style lang="scss" scoped>
.no-data {
  margin-inline: auto;
  max-width: 407px;

  .message {
    font-weight: 700;
    font-size: 24px;
    line-height: 31.25px;
    color: var(--ics-black);
    text-align: center;
    margin-bottom: 12px;
  }

  .sub-message {
    font-weight: 400;
    font-size: 16px;
    line-height: 20.83px;
    color: var(--ics-gray);
    text-align: center;
    margin-bottom: 40px;
  }

  :slotted(button) {
    border-radius: 8px;
    height: 48px;
    span {
      font-weight: 700;
      font-size: 16px;
      line-height: 21px;
    }
  }
}
</style>
