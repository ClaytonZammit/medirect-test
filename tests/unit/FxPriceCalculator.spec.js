import { shallowMount } from '@vue/test-utils';
import FxPriceCalculator from '@/components/FxPriceCalculator.vue';

describe('FxPriceCalculator.vue', () => {
  it('should calculate the value of difference based on start and end', () => {
    const wrapper = shallowMount(FxPriceCalculator, {
      propsData: {
        start: 50.123456789,
        end: 65.987654321
      }
    });

    expect(wrapper.vm.difference).toBeCloseTo(15.864197532, 9);
  });

  describe('formattedDifference', () => {
    it('should format the value of difference to 5 decimal places', () => {
      const wrapper = shallowMount(FxPriceCalculator, {
        propsData: {
          start: 50.123456789,
          end: 65.987654321
        }
      });

      expect(wrapper.vm.formattedDifference).toBe('15.86420');
    });

    it('should return 0.00000 when the value of difference is negative and not visible up to 5 decimal points', () => {
      const wrapper = shallowMount(FxPriceCalculator, {
        propsData: {
          start: 0.0000007,
          end: 0.0000003
        }
      });

      expect(wrapper.vm.formattedDifference).toBe('0.00000');
    });
  });

  it('should calculate the value of formattedPercentage based on difference and start', () => {
    const wrapper = shallowMount(FxPriceCalculator, {
      propsData: {
        start: 50.123456789,
        end: 65.987654321
      }
    });

    expect(wrapper.vm.formattedPercentage).toBe('31.65');
  });
});
