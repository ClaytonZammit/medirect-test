jest.mock('@/services/restClient', () => ({
  createRestClient: jest.fn()
}));

import flushPromises from 'flush-promises';
import { shallowMount } from '@vue/test-utils';
import { createRestClient } from '@/services/restClient';
import FxChartButtons from '@/components/FxChartButtons.vue';

describe('FxChartButtons.vue', () => {
  const toastErrorMock = jest.fn();
  const wrapperFactory = () =>
    shallowMount(FxChartButtons, {
      mocks: {
        $toast: {
          error: toastErrorMock
        }
      },
      propsData: {
        ticker: 'C:EURUSD'
      }
    });
  let getForexAggregatesMock;
  let getPreviousForexAggregatesMock;

  beforeEach(() => {
    getForexAggregatesMock = jest.fn();
    getPreviousForexAggregatesMock = jest.fn();

    createRestClient.mockReturnValue({
      getForexAggregates: getForexAggregatesMock,
      getPreviousForexAggregates: getPreviousForexAggregatesMock
    });
  });

  it('should call setChartParameters on mounted', () => {
    const setChartParametersSpy = jest.spyOn(FxChartButtons.methods, 'setChartParameters');
    getForexAggregatesMock.mockResolvedValue();

    wrapperFactory();

    expect(setChartParametersSpy).toHaveBeenCalledTimes(1);
  });

  describe('selectedValue', () => {
    it('should set previousValue and call setChartParameters when hasError is not true and selectedValue is not equal to previousValue', async () => {
      const setChartParametersSpy = jest.spyOn(FxChartButtons.methods, 'setChartParameters');
      getForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      await wrapper.vm.$nextTick();

      setChartParametersSpy.mockClear();

      wrapper.setData({
        selectedValue: '6m'
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.previousValue).toBe('1m');
      expect(setChartParametersSpy).toHaveBeenCalledTimes(1);
    });

    it('should set previousValue and call setChartParameters when hasError is true and selectedValue is not equal to previousValue', async () => {
      const setChartParametersSpy = jest.spyOn(FxChartButtons.methods, 'setChartParameters');
      getForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      await wrapper.vm.$nextTick();

      setChartParametersSpy.mockClear();

      wrapper.setData({
        hasError: true,
        selectedValue: '6m'
      });

      await wrapper.vm.$nextTick();

      expect(wrapper.vm.previousValue).toBe('1m');
      expect(setChartParametersSpy).toHaveBeenCalledTimes(1);
    });

    it('should neither set previousValue nor call setChartParameters when hasError is true and selectedValue is equal to previousValue', async () => {
      const setChartParametersSpy = jest.spyOn(FxChartButtons.methods, 'setChartParameters');
      getForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      await wrapper.vm.$nextTick();

      setChartParametersSpy.mockClear();

      wrapper.setData({
        hasError: true,
        selectedValue: '1m'
      });

      await wrapper.vm.$nextTick();

      expect(setChartParametersSpy).not.toHaveBeenCalled();
    });
  });

  it('should call setChartParameters when ticker changes', async () => {
    const setChartParametersSpy = jest.spyOn(FxChartButtons.methods, 'setChartParameters');
    getForexAggregatesMock.mockResolvedValue();

    const wrapper = wrapperFactory();

    await wrapper.vm.$nextTick();

    setChartParametersSpy.mockClear();

    wrapper.setProps({
      ticker: 'C:USDEUR'
    });

    await wrapper.vm.$nextTick();

    expect(setChartParametersSpy).toHaveBeenCalledTimes(1);
  });

  describe('setChartParameters', () => {
    beforeAll(() => {
      jest.useFakeTimers();
      jest.setSystemTime(new Date('2026-05-06T00:00:00Z'));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it('should call getChartData with no params when selectedValue is 1d', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: '1d'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith();
    });

    it('should call getChartData with params when selectedValue is 1w', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: '1w'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith({
        from: '2026-04-29',
        multiplier: 4,
        timespan: 'hour',
        to: '2026-05-06'
      });
    });

    it('should call getChartData with params when selectedValue is 1m', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: '1m'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith({
        from: '2026-04-06',
        multiplier: 1,
        timespan: 'day',
        to: '2026-05-06'
      });
    });

    it('should call getChartData with params when selectedValue is 3m', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: '3m'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith({
        from: '2026-02-06',
        multiplier: 3,
        timespan: 'day',
        to: '2026-05-06'
      });
    });

    it('should call getChartData with params when selectedValue is 6m', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: '6m'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith({
        from: '2025-11-06',
        multiplier: 6,
        timespan: 'day',
        to: '2026-05-06'
      });
    });

    it('should call getChartData with params when selectedValue is 1y', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: '1y'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith({
        from: '2025-05-06',
        multiplier: 15,
        timespan: 'day',
        to: '2026-05-06'
      });
    });

    it('should call getChartData with params when selectedValue is all', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: 'all'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).toHaveBeenCalledTimes(1);
      expect(getChartDataSpy).toHaveBeenCalledWith({
        from: '2024-05-06',
        multiplier: 1,
        timespan: 'month',
        to: '2026-05-06'
      });
    });

    it('should not call getChartData and show a toast error when selectedValue is none of the available options', () => {
      const getChartDataSpy = jest.spyOn(FxChartButtons.methods, 'getChartData');
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue();

      const wrapper = wrapperFactory();

      getChartDataSpy.mockClear();

      wrapper.setData({
        selectedValue: 'test'
      });

      wrapper.vm.setChartParameters();

      expect(getChartDataSpy).not.toHaveBeenCalled();
      expect(toastErrorMock).toHaveBeenCalledWith('The date range selected is not valid. Please select another option.');
    });
  });

  describe('getChartData', () => {
    it('should call getForexAggregates if params is not null and emit chart-response on success', async () => {
      getForexAggregatesMock.mockResolvedValueOnce().mockResolvedValue({
        results: [{ c: 25.123456789, t: 1777334400000 }],
        ticker: 'C:EURUSD'
      });

      const wrapper = wrapperFactory();

      getForexAggregatesMock.mockClear();

      wrapper.vm.getChartData({
        from: '2026-04-06',
        multiplier: 1,
        timespan: 'day',
        to: '2026-05-06'
      });

      await flushPromises();

      expect(getForexAggregatesMock).toHaveBeenCalledTimes(1);
      expect(wrapper.emitted('chart-response')[1][0]).toEqual({
        results: [{ c: 25.123456789, t: 1777334400000 }],
        ticker: 'C:EURUSD'
      });
    });

    it('should call getForexAggregates if params is not null and show a toast error on fail', async () => {
      getForexAggregatesMock.mockResolvedValueOnce().mockRejectedValueOnce({
        response: { data: { error: 'Too Many Requests' } }
      });

      const wrapper = wrapperFactory();

      getForexAggregatesMock.mockClear();

      wrapper.vm.getChartData({
        from: '2026-04-06',
        multiplier: 1,
        timespan: 'day',
        to: '2026-05-06'
      });

      await flushPromises();

      expect(getForexAggregatesMock).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.hasError).toBe(true);
      expect(wrapper.vm.previousValue).toBe('1m');
      expect(toastErrorMock).toHaveBeenCalledWith('Too Many Requests');
    });

    it('should call getPreviousForexAggregates if params is null and emit chart-response on success', async () => {
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockResolvedValue({
        results: [{ c: 25.123456789, t: 1777334400000 }],
        ticker: 'C:EURUSD'
      });

      const wrapper = wrapperFactory();

      wrapper.vm.getChartData();

      await flushPromises();

      expect(getPreviousForexAggregatesMock).toHaveBeenCalledTimes(1);
      expect(wrapper.emitted('chart-response')[1][0]).toEqual({
        results: [{ c: 25.123456789, t: 1777334400000 }],
        ticker: 'C:EURUSD'
      });
    });

    it('should call getPreviousForexAggregates if params is null and show a toast error on fail', async () => {
      getForexAggregatesMock.mockResolvedValue();
      getPreviousForexAggregatesMock.mockRejectedValue({
        response: { data: { error: 'Too Many Requests' } }
      });

      const wrapper = wrapperFactory();

      wrapper.vm.getChartData();

      await flushPromises();

      expect(getPreviousForexAggregatesMock).toHaveBeenCalledTimes(1);
      expect(wrapper.vm.hasError).toBe(true);
      expect(wrapper.vm.previousValue).toBe('1m');
      expect(toastErrorMock).toHaveBeenCalledWith('Too Many Requests');
    });
  });

  it('should return a date string formatted as yyyy-MM-dd when getFormattedDate is called', () => {
    const result = FxChartButtons.methods.getFormattedDate;

    expect(result(new Date('2025-09-20T12:00:00'))).toBe('2025-09-20');
    expect(result(new Date(2026, 4, 13))).toBe('2026-05-13');
  });
});
