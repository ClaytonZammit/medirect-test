jest.mock('@/services/restClient', () => ({
  createRestClient: jest.fn()
}));

import { shallowMount } from '@vue/test-utils';
import { createRestClient } from '@/services/restClient';
import FxContent from '@/components/FxContent.vue';

describe('FxContent.vue', () => {
  let listTickersMock;

  beforeEach(() => {
    listTickersMock = jest.fn();

    createRestClient.mockReturnValue({
      listTickers: listTickersMock
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call API on mount and update symbolOptions on success', async () => {
    listTickersMock
      .mockReturnValueOnce(
        Promise.resolve({
          results: [{ name: 'Euro - United States dollar', ticker: 'C:EURUSD' }]
        })
      )
      .mockReturnValueOnce(
        Promise.resolve({
          results: [
            { name: 'United States dollar - Euro', ticker: 'C:USDEUR' },
            { name: 'Euro - United States dollar', ticker: 'C:EURUSD' }
          ]
        })
      );

    const wrapper = shallowMount(FxContent);

    await wrapper.vm.$nextTick();

    expect(listTickersMock).toHaveBeenCalledTimes(2);
    expect(wrapper.vm.symbolOptions.length).toBe(2);
    expect(wrapper.vm.symbolOptions[0]).toEqual({ label: 'EURUSD - Euro - United States dollar', value: 'C:EURUSD' });
  });

  it('should call API on mount and show a toast error on fail', async () => {
    listTickersMock.mockReturnValue(
      Promise.reject({
        response: { data: { error: 'API listTickers failed' } }
      })
    );

    const toastError = jest.fn();
    shallowMount(FxContent, {
      mocks: {
        $toast: {
          error: toastError
        }
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(toastError).toHaveBeenCalledWith('API listTickers failed');
  });

  it('should update selectedTickerDetails when ticker changes', async () => {
    listTickersMock.mockReturnValue(
      Promise.resolve({
        results: [{ name: 'Euro - United States dollar', ticker: 'C:EURUSD' }]
      })
    );

    const wrapper = shallowMount(FxContent);
    wrapper.setData({
      allTickers: [
        { name: 'Euro - United States dollar', ticker: 'C:EURUSD' },
        { name: 'United States dollar - Euro', ticker: 'C:USDEUR' }
      ]
    });
    wrapper.setData({
      selectedTicker: 'C:EURUSD'
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.selectedTickerDetails).toEqual(wrapper.vm.allTickers[0]);
  });

  it('should sort correctly when compareStrings is called', () => {
    const result = FxContent.methods.compareStrings;

    expect(result('C:EURUSD', 'C:USDEUR')).toBe(-1);
    expect(result('C:USDEUR', 'C:EURUSD')).toBe(1);
    expect(result('C:EURUSD', 'C:EURUSD')).toBe(0);
  });
});
