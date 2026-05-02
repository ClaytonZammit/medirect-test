<template>
  <div v-if="selectedTickerDetails" class="chart-container">
    <div class="row">
      <FxFlag :srcUrl="baseCountryFlagUrl" />
      <FxFlag :srcUrl="targetCountryFlagUrl" />
      <div class="currency-symbols">{{ selectedTickerDetails.base_currency_symbol }} - {{ selectedTickerDetails.currency_symbol }}</div>
    </div>
    <div class="row">
      <BaseField label="Exchange" value="FX" />
      <BaseField label="Current Price" :value="currentPrice" />
      <FxPriceCalculator :open="startPrice" :close="closePrice" />
    </div>
    <FxChartButtons :ticker="selectedTickerDetails.ticker" @selected-value="setChartParameters($event)" />
    <FxChartGenerator :data="chartData" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_KEY, CURRENCY_COUNTRY_CODES } from '@/constants';
import BaseField from './BaseField.vue';
import FxChartButtons from './FxChartButtons.vue';
import FxChartGenerator from './FxChartGenerator.vue';
import FxFlag from './FxFlag.vue';
import FxPriceCalculator from './FxPriceCalculator.vue';

const FLAG_CDN = 'https://flagcdn.com/';

export default {
  name: 'FxChart',
  components: {
    BaseField,
    FxChartButtons,
    FxChartGenerator,
    FxFlag,
    FxPriceCalculator
  },
  props: ['selectedTickerDetails'],
  data: function () {
    return {
      chartData: null
    };
  },
  computed: {
    baseCountryFlagUrl() {
      if (this.selectedTickerDetails) {
        const countryCode = CURRENCY_COUNTRY_CODES[this.selectedTickerDetails.base_currency_symbol].toLowerCase();
        return `${FLAG_CDN}${countryCode}.svg`;
      }

      return null;
    },
    targetCountryFlagUrl() {
      if (this.selectedTickerDetails) {
        const countryCode = CURRENCY_COUNTRY_CODES[this.selectedTickerDetails.currency_symbol].toLowerCase();
        return `${FLAG_CDN}${countryCode}.svg`;
      }

      return null;
    },
    startPrice() {
      let start = 0;

      if (this.chartData && this.chartData.results) {
        const lastResult = this.chartData.results[this.chartData.results.length - 1];
        start = lastResult.o;
      }

      return start;
    },
    closePrice() {
      let close = 0;

      if (this.chartData && this.chartData.results) {
        const lastResult = this.chartData.results[this.chartData.results.length - 1];
        close = lastResult.c;
      }

      return close;
    },
    currentPrice() {
      return this.closePrice.toFixed(5);
    }
  },
  methods: {
    setChartParameters(selectedButton) {
      const toDate = new Date();
      const ticker = this.selectedTickerDetails.ticker;
      let multiplier = '';
      let timespan = '';
      let fromStr = '';
      let toStr = this.getFormattedDate(toDate);

      switch (selectedButton) {
        case '1d': {
          this.getChartData(ticker);
          break;
        }
        case '1w': {
          const from = new Date();
          from.setDate(from.getDate() - 7);
          multiplier = 4;
          timespan = 'hour';
          fromStr = this.getFormattedDate(from);

          const params = { multiplier, timespan, fromStr, toStr };
          this.getChartData(ticker, params);
          break;
        }
        case '1m': {
          const from = new Date();
          from.setMonth(from.getMonth() - 1);
          multiplier = 1;
          timespan = 'day';
          fromStr = this.getFormattedDate(from);

          const params = { multiplier, timespan, fromStr, toStr };
          this.getChartData(ticker, params);
          break;
        }
        case '3m': {
          const from = new Date();
          from.setMonth(from.getMonth() - 3);
          multiplier = 3;
          timespan = 'day';
          fromStr = this.getFormattedDate(from);

          const params = { multiplier, timespan, fromStr, toStr };
          this.getChartData(ticker, params);
          break;
        }
        case '6m': {
          const from = new Date();
          from.setMonth(from.getMonth() - 6);
          multiplier = 6;
          timespan = 'day';
          fromStr = this.getFormattedDate(from);

          const params = { multiplier, timespan, fromStr, toStr };
          this.getChartData(ticker, params);
          break;
        }
        case '1y': {
          const from = new Date();
          from.setFullYear(from.getFullYear() - 1);
          multiplier = 15;
          timespan = 'day';
          fromStr = this.getFormattedDate(from);

          const params = { multiplier, timespan, fromStr, toStr };
          this.getChartData(ticker, params);
          break;
        }
        case 'all': {
          const from = new Date();
          from.setFullYear(from.getFullYear() - 2);
          multiplier = 1;
          timespan = 'month';
          fromStr = this.getFormattedDate(from);

          const params = { multiplier, timespan, fromStr, toStr };
          this.getChartData(ticker, params);
          break;
        }
        default:
          this.$toast.error('The date range selected is not valid. Please select another option.');
          return;
      }
    },
    getChartData(ticker, params = null) {
      if (params) {
        const { multiplier, timespan, fromStr, toStr } = params;
        axios
          .get(`https://api.massive.com/v2/aggs/ticker/${ticker}/range/${multiplier}/${timespan}/${fromStr}/${toStr}`, {
            headers: { Authorization: `Bearer ${API_KEY}` }
          })
          .then((response) => {
            this.chartData = response.data;
          })
          .catch((error) => this.$toast.error(error.response.data.error));
      } else {
        axios
          .get(`https://api.massive.com/v2/aggs/ticker/${ticker}/prev`, {
            headers: { Authorization: `Bearer ${API_KEY}` }
          })
          .then((response) => {
            this.chartData = response.data;
          })
          .catch((error) => this.$toast.error(error.response.data.error));
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

.chart-container {
  background-color: $light-grey-color;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 20px;
  row-gap: 20px;

  .row {
    column-gap: 10px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;

    .currency-symbols {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
