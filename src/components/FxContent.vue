<template>
  <div class="content">
    <div class="heading">
      <img src="/favicon.png" />
      <h1>FX Trading Dashboard</h1>
    </div>

    <BaseDropdown label="Exchange" :options="exchangeOptions" />
    <BaseDropdown label="Primary Symbol" :options="symbolOptions" @selected-option="selectedTicker = $event" />

    <FxChart :selected-ticker-details="selectedTickerDetails" />
  </div>
</template>

<script>
import axios from 'axios';
import { API_KEY } from '@/constants';
import deviceTypeMixin from '@/mixins/deviceTypeMixin';
import BaseDropdown from './BaseDropdown.vue';
import FxChart from './FxChart.vue';

export default {
  name: 'FxContent',
  components: {
    BaseDropdown,
    FxChart
  },
  mixins: [deviceTypeMixin],
  data: function () {
    return {
      allTickers: [],
      exchangeOptions: [{ name: 'Forex (FX)', value: 'fx' }],
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
      // API call limitation: Max limit is 1000 and since there are over 1000 Fx tickers we will never retrieve the full list
      axios
        .get('https://api.massive.com/v3/reference/tickers?market=fx', {
          headers: { Authorization: `Bearer ${API_KEY}` },
          params: { limit: 1000 }
        })
        .then((response) => {
          this.allTickers = response.data.results;
          this.symbolOptions = this.allTickers.map((result) => {
            return { name: `${result.ticker.substring(2)} - ${result.name}`, value: result.ticker };
          });
        })
        .catch((error) => console.log(error.response.data.error));
    }
  }
};
</script>

<style lang="scss">
.content {
  margin: 0 auto;
  max-width: 800px;
  padding: 20px;

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
