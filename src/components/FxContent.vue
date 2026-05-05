<template>
  <div class="content">
    <div class="heading">
      <img src="/favicon.png" />
      <h1>FX Trading Dashboard</h1>
    </div>

    <BaseDropdown label="Exchange" :options="exchangeOptions" :disabled="true" />
    <BaseDropdown label="Primary Symbol" :options="symbolOptions" @selected-value="selectedTicker = $event" />

    <FxChart v-if="selectedTickerDetails" :ticker-details="selectedTickerDetails" />
  </div>
</template>

<script>
import { createRestClient } from '@/services/restClient';
import BaseDropdown from './BaseDropdown.vue';
import FxChart from './FxChart.vue';

export default {
  name: 'FxContent',
  components: {
    BaseDropdown,
    FxChart
  },
  data: function () {
    return {
      allTickers: [],
      exchangeOptions: [{ label: 'Forex (FX)', value: 'fx' }],
      symbolOptions: [],
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
      const restClient = createRestClient();
      const request1 = restClient.listTickers({
        market: 'fx',
        limit: 1000
      });
      const request2 = restClient.listTickers({
        market: 'fx',
        order: 'desc',
        limit: 300
      });

      Promise.all([request1, request2])
        .then(([response1, response2]) => {
          const results1 = response1.results;
          let results2 = response2.results;
          const lastAscTicker = results1[results1.length - 1].ticker;
          const firstDuplicateIndex = results2.findIndex((result) => result.ticker === lastAscTicker);
          results2 = results2.slice(0, firstDuplicateIndex).sort((a, b) => this.compareStrings(a.ticker, b.ticker));

          this.allTickers = [...results1, ...results2];
          this.symbolOptions = this.allTickers.map((result) => ({
            label: `${result.ticker.substring(2)} - ${result.name}`,
            value: result.ticker
          }));
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
