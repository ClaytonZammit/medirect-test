<template>
  <div class="chart-container">
    <div class="row">
      <FxFlag :srcUrl="baseCountryFlagUrl" />
      <FxFlag :srcUrl="targetCountryFlagUrl" />
      <div class="currency-symbols">{{ tickerDetails.base_currency_symbol }} - {{ tickerDetails.currency_symbol }}</div>
    </div>
    <div class="row">
      <BaseField label="Exchange" value="FX" />
      <BaseField label="Current Price" :value="currentPrice" />
      <FxPriceCalculator :start="startPrice" :end="endPrice" />
    </div>
    <FxChartButtons :ticker="tickerDetails.ticker" @chart-data="chartData = $event" />
    <FxChartGenerator :data="chartData" />
  </div>
</template>

<script>
import { CURRENCY_COUNTRY_CODES } from '@/constants';
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
      chartData: []
    };
  },
  computed: {
    baseCountryFlagUrl() {
      if (CURRENCY_COUNTRY_CODES[this.tickerDetails.base_currency_symbol]) {
        const countryCode = CURRENCY_COUNTRY_CODES[this.tickerDetails.base_currency_symbol].toLowerCase();
        return `${FLAG_CDN}${countryCode}.svg`;
      } else if (this.tickerDetails.base_currency_symbol === 'XAG' || this.tickerDetails.base_currency_symbol === 'XAU') {
        return require(`@/assets/svgs/${this.tickerDetails.base_currency_symbol.toLowerCase()}.svg`);
      }

      return null;
    },
    targetCountryFlagUrl() {
      if (CURRENCY_COUNTRY_CODES[this.tickerDetails.currency_symbol]) {
        const countryCode = CURRENCY_COUNTRY_CODES[this.tickerDetails.currency_symbol].toLowerCase();
        return `${FLAG_CDN}${countryCode}.svg`;
      } else if (this.tickerDetails.currency_symbol === 'XAG' || this.tickerDetails.currency_symbol === 'XAU') {
        return require(`@/assets/svgs/${this.tickerDetails.currency_symbol.toLowerCase()}.svg`);
      }

      return null;
    },
    startPrice() {
      let price = 0;

      if (this.chartData.length > 0) {
        const lastResult = this.chartData[0];
        price = lastResult.c;
      }

      return price;
    },
    endPrice() {
      let price = 0;

      if (this.chartData.length > 0) {
        const lastResult = this.chartData[this.chartData.length - 1];
        price = lastResult.c;
      }

      return price;
    },
    currentPrice() {
      return this.endPrice.toFixed(5);
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
