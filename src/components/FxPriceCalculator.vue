<template>
  <div :class="{ positive: difference > 0, negative: difference < 0, equal: difference == 0 }" class="price-difference">
    <span v-if="difference > 0">&#9650;</span>
    <span v-else-if="difference < 0">&#9660;</span>
    <span v-else>&#8212;</span>
    <span class="values">{{ difference }} ({{ percentage }}%)</span>
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
    difference(props) {
      const diff = props.end - props.start;
      const isNegative = diff < 0;
      const diffStr = diff.toFixed(5);

      // Check for case when diff is negative but insignificant when up to 5 decimal places
      return diffStr == 0 && isNegative ? '0.00000' : diffStr;
    },
    percentage(props) {
      const percentage = (this.difference / props.start) * 100;

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

@media (min-width: 992px) {
  .price-difference {
    margin-left: auto;
  }
}
</style>
