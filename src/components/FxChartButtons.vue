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
import { createRestClient } from '@/services/restClient';

const BUTTON_VALUES = ['1d', '1w', '1m', '3m', '6m', '1y', 'all'];

export default {
  name: 'FxChartButtons',
  props: {
    ticker: { type: String, required: true }
  },
  emits: {
    'chart-response': Object
  },
  data: function () {
    return {
      BUTTON_VALUES,
      hasError: false,
      previousValue: '1m',
      selectedValue: '1m'
    };
  },
  watch: {
    selectedValue(value, oldValue) {
      if (!this.hasError || value !== this.previousValue) {
        this.previousValue = oldValue;
        this.setChartParameters();
      }
    },
    ticker() {
      this.setChartParameters();
    }
  },
  mounted() {
    this.setChartParameters();
  },
  methods: {
    setChartParameters() {
      const toDate = new Date();
      let multiplier = '';
      let timespan = '';
      let from = '';
      let to = this.getFormattedDate(toDate);

      switch (this.selectedValue) {
        case '1d': {
          this.getChartData();
          break;
        }
        case '1w': {
          const fromDate = new Date();
          fromDate.setDate(fromDate.getDate() - 7);
          multiplier = 4;
          timespan = 'hour';
          from = this.getFormattedDate(fromDate);

          const params = { multiplier, timespan, from, to };
          this.getChartData(params);
          break;
        }
        case '1m': {
          const fromDate = new Date();
          fromDate.setMonth(fromDate.getMonth() - 1);
          multiplier = 1;
          timespan = 'day';
          from = this.getFormattedDate(fromDate);

          const params = { multiplier, timespan, from, to };
          this.getChartData(params);
          break;
        }
        case '3m': {
          const fromDate = new Date();
          fromDate.setMonth(fromDate.getMonth() - 3);
          multiplier = 3;
          timespan = 'day';
          from = this.getFormattedDate(fromDate);

          const params = { multiplier, timespan, from, to };
          this.getChartData(params);
          break;
        }
        case '6m': {
          const fromDate = new Date();
          fromDate.setMonth(fromDate.getMonth() - 6);
          multiplier = 6;
          timespan = 'day';
          from = this.getFormattedDate(fromDate);

          const params = { multiplier, timespan, from, to };
          this.getChartData(params);
          break;
        }
        case '1y': {
          const fromDate = new Date();
          fromDate.setFullYear(fromDate.getFullYear() - 1);
          multiplier = 15;
          timespan = 'day';
          from = this.getFormattedDate(fromDate);

          const params = { multiplier, timespan, from, to };
          this.getChartData(params);
          break;
        }
        case 'all': {
          const fromDate = new Date();
          fromDate.setFullYear(fromDate.getFullYear() - 2);
          multiplier = 1;
          timespan = 'month';
          from = this.getFormattedDate(fromDate);

          const params = { multiplier, timespan, from, to };
          this.getChartData(params);
          break;
        }
        default:
          this.$toast.error('The date range selected is not valid. Please select another option.');
          return;
      }
    },
    async getChartData(params = null) {
      const restClient = createRestClient();
      let request;
      this.hasError = false;

      if (params) {
        const { multiplier, timespan, from, to } = params;

        request = restClient.getForexAggregates({
          forexTicker: this.ticker,
          multiplier,
          timespan,
          from,
          to
        });
      } else {
        request = restClient.getPreviousForexAggregates({
          forexTicker: this.ticker
        });
      }

      try {
        const response = await request;
        this.$emit('chart-response', response);
      } catch (error) {
        this.hasError = true;
        this.selectedValue = this.previousValue;
        this.$toast.error(error.response.data.error);
      }
    },
    getFormattedDate(date) {
      return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    }
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
