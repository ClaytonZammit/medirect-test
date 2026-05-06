jest.mock('@/services/restClient', () => ({
  createRestClient: jest.fn()
}));

import flushPromises from 'flush-promises';
import { shallowMount } from '@vue/test-utils';
import { createRestClient } from '@/services/restClient';
import FxContent from '@/components/FxContent.vue';

describe('FxContent.vue', () => {
  const toastErrorMock = jest.fn();
  const wrapperFactory = () =>
    shallowMount(FxContent, {
      mocks: {
        $toast: {
          error: toastErrorMock
        }
      }
    });
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

  it('should call API twice on mount and update symbolOptions on success', async () => {
    listTickersMock
      .mockResolvedValueOnce({
        results: [{ name: 'Euro - United States dollar', ticker: 'C:EURUSD' }]
      })
      .mockResolvedValueOnce({
        results: [
          { name: 'United States dollar - Euro', ticker: 'C:USDEUR' },
          { name: 'Euro - United States dollar', ticker: 'C:EURUSD' }
        ]
      });

    const wrapper = wrapperFactory();

    await flushPromises();

    expect(listTickersMock).toHaveBeenCalledTimes(2);
    expect(wrapper.vm.symbolOptions.length).toBe(2);
    expect(wrapper.vm.symbolOptions[0]).toEqual({ label: 'EURUSD - Euro - United States dollar', value: 'C:EURUSD' });
  });

  it('should call API on mount and show a toast error on fail', async () => {
    listTickersMock.mockRejectedValue({
      response: { data: { error: 'Too Many Requests' } }
    });

    wrapperFactory();

    await flushPromises();

    expect(toastErrorMock).toHaveBeenCalledWith('Too Many Requests');
  });

  it('should update selectedTickerDetails when ticker changes', async () => {
    listTickersMock
      .mockResolvedValueOnce({
        results: [{ name: 'Euro - United States dollar', ticker: 'C:EURUSD' }]
      })
      .mockResolvedValueOnce({
        results: [
          { name: 'United States dollar - Euro', ticker: 'C:USDEUR' },
          { name: 'Euro - United States dollar', ticker: 'C:EURUSD' }
        ]
      });

    const wrapper = wrapperFactory();
    wrapper.setData({
      allTickers: [
        { name: 'Euro - United States dollar', ticker: 'C:EURUSD' },
        { name: 'United States dollar - Euro', ticker: 'C:USDEUR' }
      ],
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
