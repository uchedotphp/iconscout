<template>
  <div v-show="showPanel" class="suggestion-panel">
    <h3>
      Recent Search
    </h3>
    <ul>
      <li
        v-for="(suggestion, index) in suggestions"
        :key="index"
        @click="selectSuggestion(suggestion)"
      >
        {{ suggestion }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "SuggestionPanel",
  props: {
    suggestions: {
      type: Array as () => string[],
      required: true,
    },
    showPanel: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    selectSuggestion(suggestion: string) {
      this.$emit("select", suggestion);
    },
  },
});
</script>

<style lang="scss" scoped>
.suggestion-panel {
  position: absolute;
  bottom: -80px;
  z-index: 1;
  width: 100%;
  padding: 25px;
  background: var(--ics-white);
  border-radius: 8px;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.08), 0px 12px 16px rgba(0, 0, 0, 0.04);
  border: 1px solid #d8dbeb;

  h3 {
    font-size: var(--ics-font-size-sm);
    line-height: 24px;
    font-weight: 700;
  }
}

.suggestion-panel li {
  padding: 5px;
  cursor: pointer;
}

.suggestion-panel li:hover {
  background-color: #f0f0f0;
}
</style>
