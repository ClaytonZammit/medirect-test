<template>
  <div class="content">
    <h1 class="heading">FX Trading Dashboard</h1>

    <BaseDropdown label="Exchange" :options="exchangeOptions" />
    <BaseDropdown label="Primary Symbol" :options="symbolOptions" @selected-option="selectedTicker = $event" />

    <!-- <img :src="baseCountryFlagUrl" height="20" width="30" />
    <img :src="targetCountryFlagUrl" height="20" width="30" /> -->
  </div>
</template>

<script>
import axios from 'axios';
import { CURRENCY_COUNTRY_CODES } from '@/constants';
import deviceTypeMixin from '@/mixins/deviceTypeMixin';
import BaseDropdown from './BaseDropdown.vue';

const API_KEY = 'G8XpDTrOCsNbQJopzJVyBGyzJLsWYtP9';
const FLAG_CDN = 'https://flagcdn.com/';

export default {
  name: 'FxContent',
  components: {
    BaseDropdown
  },
  mixins: [deviceTypeMixin],
  data: function () {
    return {
      CURRENCY_COUNTRY_CODES,
      allTickers: [],
      exchangeOptions: [{ name: 'Forex (FX)', value: 'fx' }],
      symbolOptions: [],
      selectedTicker: null,
      baseCountryFlagUrl: null,
      targetCountryFlagUrl: null
    };
  },
  watch: {
    selectedTicker(value) {
      const selectedTickerDetails = this.allTickers.find((details) => details.ticker === value);
      const baseCountryCode = CURRENCY_COUNTRY_CODES[selectedTickerDetails.base_currency_symbol].toLowerCase();
      const targetCountryCode = CURRENCY_COUNTRY_CODES[selectedTickerDetails.currency_symbol].toLowerCase();
      this.baseCountryFlagUrl = `${FLAG_CDN}${baseCountryCode}.svg`;
      this.targetCountryFlagUrl = `${FLAG_CDN}${targetCountryCode}.svg`;
    }
  },
  mounted() {
    this.getCurrencyPairs();
  },
  methods: {
    getCurrencyPairs() {
      // API call limitation: Max limit is 1000 and since there are over 1000 Fx tickers we will never retrieve the full list
      axios
        .get('https://api.polygon.io/v3/reference/tickers?market=fx', {
          headers: { Authorization: `Bearer ${API_KEY}` },
          params: { limit: 1000 }
        })
        .then((response) => {
          this.allTickers = response.data.results;
          this.symbolOptions = this.allTickers.map((result) => {
            return { name: `${result.ticker.substring(2)} - ${result.name}`, value: result.ticker };
          });
          console.log(this.allTickers);
        })
        .catch((error) => console.log(error.response.data.error));
    }
  }
};
</script>

<style lang="scss">
.content {
  padding: 20px;

  .heading {
    color: #4f4f4f;
    font-size: 20px;
    text-align: center;
  }
}
</style>
