<template>
  <div class="chart-buttons">
    <button
      v-for="value of BUTTON_VALUES"
      :key="value"
      :value="value"
      :class="{ active: value === selectedValue }"
      @click="selectedValue = value">
      {{ value }}
    </button>
  </div>
</template>

<script>
const BUTTON_VALUES = ['1d', '1w', '1m', '3m', '6m', '1y', 'all'];

export default {
  name: 'FxChartButtons',
  props: {
    ticker: { type: String, required: true }
  },
  emits: {
    'selected-value': String
  },
  data: function () {
    return {
      BUTTON_VALUES,
      selectedValue: '1m'
    };
  },
  watch: {
    selectedValue(value) {
      this.$emit('selected-value', value);
    },
    ticker() {
      this.$emit('selected-value', this.selectedValue);
    }
  },
  mounted() {
    this.$emit('selected-value', this.selectedValue);
  }
};
</script>

<style lang="scss">
@use '~@/../../assets/styles/variables' as *;

.chart-buttons {
  border-top: 1px solid $text-light-color;
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;
  padding: 20px 10px 0;

  button {
    background-color: $white-color;
    border: 1px solid transparent;
    border-radius: 8px;
    color: $text-dark-color;
    cursor: pointer;
    flex: 1 0 auto;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 15px;
    text-transform: uppercase;
    width: 65px;

    &:hover {
      background-color: $button-hover-background-color;
      color: $white-color;
    }

    &.active {
      background-color: $button-active-background-color;
      color: $white-color;
    }
  }
}
</style>
