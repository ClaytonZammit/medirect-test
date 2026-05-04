<template>
  <div class="content">
    <div class="heading">
      <img src="/favicon.png" />
      <h1>FX Trading Dashboard</h1>
    </div>

    <BaseDropdown label="Exchange" :options="exchangeOptions" :disabled="true" />
    <BaseDropdown label="Primary Symbol" :options="symbolOptions" @selected-value="selectedTicker = $event" />

    <FxChart v-if="selectedTickerDetails" :selected-ticker-details="selectedTickerDetails" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_KEY } from '@/constants';
import BaseDropdown from './BaseDropdown.vue';
import FxChart from './FxChart.vue';

const DEFAULT_SYMBOL_OPTION = { name: 'Select Primary Symbol', value: '', disabled: true };

export default {
  name: 'FxContent',
  components: {
    BaseDropdown,
    FxChart
  },
  data: function () {
    return {
      allTickers: [],
      exchangeOptions: [{ name: 'Forex (FX)', value: 'fx' }],
      symbolOptions: [DEFAULT_SYMBOL_OPTION],
      selectedTicker: null,
      selectedTickerDetails: null
    };
  },
  watch: {
    selectedTicker(value) {
      this.selectedTickerDetails = this.allTickers.find((details) => details.ticker === value);
    }
  },
  mounted() {
    this.getCurrencyPairs();
  },
  methods: {
    getCurrencyPairs() {
      // API call limitation: Max limit is 1000 and since there are over 1000 FX tickers it was required to make a second call
      // in descending order with a smaller limit to get the remaining values.
      const request1 = axios.get('https://api.massive.com/v3/reference/tickers?market=fx', {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { limit: 1000 }
      });
      const request2 = axios.get('https://api.massive.com/v3/reference/tickers?market=fx', {
        headers: { Authorization: `Bearer ${API_KEY}` },
        params: { limit: 300, order: 'desc' }
      });

      Promise.all([request1, request2])
        .then(([response1, response2]) => {
          const results1 = response1.data.results;
          let results2 = response2.data.results;
          const lastAscTicker = results1[results1.length - 1].ticker;
          const firstDuplicateIndex = results2.findIndex((result) => result.ticker === lastAscTicker);
          results2 = results2.slice(0, firstDuplicateIndex).sort((a, b) => this.compareStrings(a.ticker, b.ticker));

          this.allTickers = [...results1, ...results2];
          this.symbolOptions = this.allTickers.map((result) => ({
            name: `${result.ticker.substring(2)} - ${result.name}`,
            value: result.ticker
          }));
          this.symbolOptions.unshift(DEFAULT_SYMBOL_OPTION);
        })
        .catch((error) => this.$toast.error(error.response.data.error));
    },
    compareStrings(stringA, stringB) {
      {
        if (stringA < stringB) {
          return -1;
        }
        if (stringA > stringB) {
          return 1;
        }
        return 0;
      }
    }
  }
};
</script>

<style lang="scss">
.content {
  margin: 0 auto;
  max-width: 800px;
  padding: 12px;

  .heading {
    align-items: center;
    column-gap: 5px;
    display: flex;
    justify-content: center;

    h1 {
      font-size: 24px;
      font-weight: bold;
    }
  }
}
</style>
