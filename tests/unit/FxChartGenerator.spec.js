import { shallowMount } from '@vue/test-utils';
import FxChartGenerator from '@/components/FxChartGenerator.vue';

describe('FxChartGenerator.vue', () => {
  it('should return an object with datasets and labels properties', () => {
    const wrapper = shallowMount(FxChartGenerator, {
      propsData: {
        chartData: [
          { c: 25.123456789, t: 1777334400000 },
          { c: 75.987654321, t: 1777593600000 },
          { c: 50.543216789, t: 1777852800000 }
        ]
      }
    });

    expect(wrapper.vm.data).toEqual({
      datasets: [
        {
          backgroundColor: 'rgba(59, 113, 202, 0.2)',
          borderColor: '#3b71ca',
          data: [25.123456789, 75.987654321, 50.543216789],
          fill: true,
          label: 'Close Price',
          pointHoverRadius: 5,
          pointRadius: 4,
          tension: 0.2
        }
      ],
      labels: ['28/04/26', '01/05/26', '04/05/26']
    });
  });

  describe('datasets', () => {
    it('should return an array when chartData is not empty', () => {
      const wrapper = shallowMount(FxChartGenerator, {
        propsData: {
          chartData: [
            { c: 25.123456789, t: 1777334400000 },
            { c: 75.987654321, t: 1777593600000 },
            { c: 50.543216789, t: 1777852800000 }
          ]
        }
      });

      expect(wrapper.vm.datasets).toEqual([
        {
          backgroundColor: 'rgba(59, 113, 202, 0.2)',
          borderColor: '#3b71ca',
          data: [25.123456789, 75.987654321, 50.543216789],
          fill: true,
          label: 'Close Price',
          pointHoverRadius: 5,
          pointRadius: 4,
          tension: 0.2
        }
      ]);
    });

    it('should return an empty array when chartData is empty', () => {
      const wrapper = shallowMount(FxChartGenerator, {
        propsData: {
          chartData: []
        }
      });

      expect(wrapper.vm.datasets).toEqual([]);
    });
  });

  describe('labels', () => {
    it('should return an array when chartData is not empty', () => {
      const wrapper = shallowMount(FxChartGenerator, {
        propsData: {
          chartData: [
            { c: 25.123456789, t: 1777334400000 },
            { c: 75.987654321, t: 1777593600000 },
            { c: 50.543216789, t: 1777852800000 }
          ]
        }
      });

      expect(wrapper.vm.labels).toEqual(['28/04/26', '01/05/26', '04/05/26']);
    });

    it('should return an empty array when chartData is empty', () => {
      const wrapper = shallowMount(FxChartGenerator, {
        propsData: {
          chartData: []
        }
      });

      expect(wrapper.vm.labels).toEqual([]);
    });
  });

  describe('options', () => {
    it('should return an object with a value for tooltip titles when chartData is not empty', () => {
      const wrapper = shallowMount(FxChartGenerator, {
        propsData: {
          chartData: [
            { c: 25.123456789, t: 1777334400000 },
            { c: 75.987654321, t: 1777593600000 },
            { c: 50.543216789, t: 1777852800000 }
          ]
        }
      });

      expect(wrapper.vm.options.maintainAspectRatio).toBe(false);
      expect(wrapper.vm.options.plugins.legend.onClick()).toBeNull();
      expect(wrapper.vm.options.plugins.tooltip.callbacks.label({ raw: 25.123456789 })).toBe('25.12346');
      expect(wrapper.vm.options.plugins.tooltip.callbacks.title([{ dataIndex: 2 }])).toBe('04 May 2026, 02:00');
      expect(wrapper.vm.options.responsive).toBe(true);
      expect(wrapper.vm.options.scales.x.ticks.font.size).toBe(10);
      expect(wrapper.vm.options.scales.y.ticks.callback(75)).toBe('75.00000');
      expect(wrapper.vm.options.scales.y.ticks.font.size).toBe(10);
    });

    it('should return an object with empty tooltip titles when chartData is empty', () => {
      const wrapper = shallowMount(FxChartGenerator, {
        propsData: {
          chartData: []
        }
      });

      expect(wrapper.vm.options.maintainAspectRatio).toBe(false);
      expect(wrapper.vm.options.plugins.legend.onClick()).toBeNull();
      expect(wrapper.vm.options.plugins.tooltip.callbacks.label({ raw: 25.123456789 })).toBe('25.12346');
      expect(wrapper.vm.options.plugins.tooltip.callbacks.title([{ dataIndex: 2 }])).toBe('');
      expect(wrapper.vm.options.responsive).toBe(true);
      expect(wrapper.vm.options.scales.x.ticks.font.size).toBe(10);
      expect(wrapper.vm.options.scales.y.ticks.callback()).toBe('0.00000');
      expect(wrapper.vm.options.scales.y.ticks.font.size).toBe(10);
    });
  });
});
