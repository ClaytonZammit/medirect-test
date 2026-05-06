<template>
  <div class="chart-container">
    <div class="row">
      <FxFlag :srcUrl="baseCountryFlagUrl" />
      <FxFlag :srcUrl="quoteCountryFlagUrl" />
      <div class="currency-pair">{{ currencyPair }}</div>
    </div>
    <div class="row">
      <BaseField label="Exchange" value="FX" />
      <BaseField label="Current Price" :value="formattedEndPrice" />
      <FxPriceCalculator :start="startPrice" :end="endPrice" />
    </div>
    <FxChartButtons :ticker="tickerDetails.ticker" @chart-response="chartResponse = $event" />
    <FxChartGenerator :chartData="chartData" />
  </div>
</template>

<script>
import { CURRENCY_TO_COUNTRY_MAP } from '@/constants/currencyToCountryMap';
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
  props: {
    tickerDetails: { type: Object, required: true }
  },
  data: function () {
    return {
      chartData: [],
      chartResponse: null,
      currencyPair: '',
      baseCountryFlagUrl: null,
      quoteCountryFlagUrl: null
    };
  },
  computed: {
    startPrice() {
      if (this.chartData.length > 0) {
        const lastResult = this.chartData[0];
        return lastResult.c;
      }

      return 0;
    },
    endPrice() {
      if (this.chartData.length > 0) {
        const lastResult = this.chartData[this.chartData.length - 1];
        return lastResult.c;
      }

      return 0;
    },
    formattedEndPrice() {
      return this.endPrice.toFixed(5);
    }
  },
  watch: {
    chartResponse(value) {
      this.chartData = value.results;

      if (value.ticker === this.tickerDetails.ticker) {
        this.currencyPair = `${this.tickerDetails.base_currency_symbol} - ${this.tickerDetails.currency_symbol}`;

        if (CURRENCY_TO_COUNTRY_MAP[this.tickerDetails.base_currency_symbol]) {
          const countryCode = CURRENCY_TO_COUNTRY_MAP[this.tickerDetails.base_currency_symbol].toLowerCase();
          this.baseCountryFlagUrl = `${FLAG_CDN}${countryCode}.svg`;
        } else if (this.tickerDetails.base_currency_symbol === 'XAG' || this.tickerDetails.base_currency_symbol === 'XAU') {
          this.baseCountryFlagUrl = require(`@/assets/svgs/${this.tickerDetails.base_currency_symbol.toLowerCase()}.svg`);
        }

        if (CURRENCY_TO_COUNTRY_MAP[this.tickerDetails.currency_symbol]) {
          const countryCode = CURRENCY_TO_COUNTRY_MAP[this.tickerDetails.currency_symbol].toLowerCase();
          this.quoteCountryFlagUrl = `${FLAG_CDN}${countryCode}.svg`;
        } else if (this.tickerDetails.currency_symbol === 'XAG' || this.tickerDetails.currency_symbol === 'XAU') {
          this.quoteCountryFlagUrl = require(`@/assets/svgs/${this.tickerDetails.currency_symbol.toLowerCase()}.svg`);
        }
      }
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

    .currency-pair {
      font-size: 20px;
      font-weight: bold;
    }
  }
}
</style>
