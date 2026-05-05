<template>
  <div :class="{ positive: difference > 0, negative: difference < 0, equal: difference === 0 }" class="price-difference">
    <span v-if="difference > 0">&#9650;</span>
    <span v-else-if="difference < 0">&#9660;</span>
    <span v-else>&#8212;</span>
    <span class="values">{{ formattedDifference }} ({{ formattedPercentage }}%)</span>
  </div>
</template>

<script>
export default {
  name: 'FxPriceCalculator',
  props: {
    start: { type: Number, required: true },
    end: { type: Number, required: true }
  },
  computed: {
    difference() {
      return this.end - this.start;
    },
    formattedDifference() {
      if (Math.abs(this.difference).toFixed(5) === '0.00000') {
        return '0.00000';
      }

      return this.difference.toFixed(5);
    },
    formattedPercentage() {
      const percentage = (this.difference / this.start) * 100;

      // NaN is a rare case that is returned only when loading the component for the first time while the API fails due to too many requests
      return isNaN(percentage) ? '0.00' : percentage.toFixed(2);
    }
  }
};
</script>

<style lang="scss">
@use '~@/../../assets/styles/variables' as *;

.price-difference {
  align-items: center;
  border-radius: 8px;
  font-weight: bold;
  line-height: 22px;
  padding: 10px;

  &.positive {
    background-color: $positive-background-color;
    color: $positive-text-color;
  }

  &.negative {
    background-color: $negative-background-color;
    color: $negative-text-color;
  }

  &.equal {
    background-color: $white-color;
  }

  .values {
    margin-left: 5px;
  }
}

@media (min-width: 768px) {
  .price-difference {
    margin-left: auto;
  }
}
</style>
