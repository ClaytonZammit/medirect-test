jest.mock('@/services/restClient', () => ({
  createRestClient: jest.fn()
}));
jest.mock('@/assets/svgs/xag.svg', () => 'xag.svg', { virtual: true });
jest.mock('@/assets/svgs/xau.svg', () => 'xau.svg', { virtual: true });

import { shallowMount } from '@vue/test-utils';
import FxChart from '@/components/FxChart.vue';

describe('FxChart.vue', () => {
  const wrapperFactory = () =>
    shallowMount(FxChart, {
      propsData: {
        tickerDetails: {
          base_currency_symbol: 'EUR',
          currency_symbol: 'USD',
          name: 'Euro - United States dollar',
          ticker: 'C:EURUSD'
        }
      }
    });

  describe('startPrice', () => {
    it('should return a value when chartData is not empty', () => {
      const wrapper = wrapperFactory();
      wrapper.setData({
        chartData: [{ c: 25.123456789 }, { c: 75.987654321 }]
      });

      expect(wrapper.vm.startPrice).toBe(25.123456789);
    });

    it('should return 0 when chartData is empty', () => {
      const wrapper = wrapperFactory();
      wrapper.setData({
        chartData: []
      });

      expect(wrapper.vm.startPrice).toBe(0);
    });
  });

  describe('endPrice', () => {
    it('should return a value when chartData is not empty', () => {
      const wrapper = wrapperFactory();
      wrapper.setData({
        chartData: [{ c: 25.123456789 }, { c: 75.987654321 }]
      });

      expect(wrapper.vm.endPrice).toBe(75.987654321);
    });

    it('should return 0 when chartData is empty', () => {
      const wrapper = wrapperFactory();
      wrapper.setData({
        chartData: []
      });

      expect(wrapper.vm.endPrice).toBe(0);
    });
  });

  it('should format the value of formattedEndPrice to 5 decimal places', () => {
    const wrapper = wrapperFactory();
    wrapper.setData({
      chartData: [{ c: 25.123456789 }, { c: 75.987654321 }]
    });

    expect(wrapper.vm.formattedEndPrice).toBe('75.98765');
  });

  describe('chartResponse', () => {
    it('should set chartData when chartResponse updates', async () => {
      const wrapper = wrapperFactory();
      wrapper.setData({
        chartResponse: {
          results: [{ c: 25.123456789 }, { c: 75.987654321 }],
          ticker: 'C:EURUSD'
        }
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.chartData).toEqual(wrapper.vm.chartResponse.results);
    });

    describe('currencyPair', () => {
      it('should set currencyPair when chartResponse.ticker is equal to tickerDetails.ticker', async () => {
        const wrapper = wrapperFactory();
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:EURUSD'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.currencyPair).toBe('EUR - USD');
      });

      it('should not set currencyPair when chartResponse.ticker is not equal to tickerDetails.ticker', async () => {
        const wrapper = wrapperFactory();
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:USDEUR'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.currencyPair).toBe('');
      });
    });

    describe('baseCountryFlagUrl', () => {
      it('should set baseCountryFlagUrl when chartResponse.ticker is equal to tickerDetails.ticker and tickerDetails.base_currency_symbol is in CURRENCY_COUNTRY_CODES', async () => {
        const wrapper = wrapperFactory();
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:EURUSD'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.baseCountryFlagUrl).toBe('https://flagcdn.com/eu.svg');
      });

      it('should set baseCountryFlagUrl when chartResponse.ticker is equal to tickerDetails.ticker and tickerDetails.base_currency_symbol is XAG or XAU', async () => {
        const wrapper = wrapperFactory();
        wrapper.setProps({
          tickerDetails: {
            base_currency_symbol: 'XAG',
            currency_symbol: 'EUR',
            name: 'Silver (one troy ounce) - Euro',
            ticker: 'C:XAGEUR'
          }
        });
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:XAGEUR'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.baseCountryFlagUrl).toBe('xag.svg');
      });

      it('should not set baseCountryFlagUrl when chartResponse.ticker is not equal to tickerDetails.ticker', async () => {
        const wrapper = wrapperFactory();
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:USDEUR'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.baseCountryFlagUrl).toBeNull();
      });
    });

    describe('quoteCountryFlagUrl', () => {
      it('should set quoteCountryFlagUrl when chartResponse.ticker is equal to tickerDetails.ticker and tickerDetails.quoteCountryFlagUrl is in CURRENCY_COUNTRY_CODES', async () => {
        const wrapper = wrapperFactory();
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:EURUSD'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.quoteCountryFlagUrl).toBe('https://flagcdn.com/us.svg');
      });

      it('should set quoteCountryFlagUrl when chartResponse.ticker is equal to tickerDetails.ticker and tickerDetails.quoteCountryFlagUrl is XAG or XAU', async () => {
        const wrapper = wrapperFactory();
        wrapper.setProps({
          tickerDetails: {
            base_currency_symbol: 'EUR',
            currency_symbol: 'XAU',
            name: 'Euro - Gold (one troy ounce)',
            ticker: 'C:EURXAU'
          }
        });
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:EURXAU'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.quoteCountryFlagUrl).toBe('xau.svg');
      });

      it('should not set quoteCountryFlagUrl when chartResponse.ticker is not equal to tickerDetails.ticker', async () => {
        const wrapper = wrapperFactory();
        wrapper.setData({
          chartResponse: {
            results: [{ c: 25.123456789 }, { c: 75.987654321 }],
            ticker: 'C:USDEUR'
          }
        });

        await wrapper.vm.$nextTick();

        expect(wrapper.vm.quoteCountryFlagUrl).toBeNull();
      });
    });
  });
});
