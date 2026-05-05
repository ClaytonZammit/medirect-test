import { shallowMount } from '@vue/test-utils';
import FxPriceCalculator from '@/components/FxPriceCalculator.vue';

describe('FxPriceCalculator.vue', () => {
  describe('difference', () => {
    it('should calculate the value of difference based on props.start and props.end', () => {
      const wrapper = shallowMount(FxPriceCalculator, {
        propsData: {
          start: 50,
          end: 65
        }
      });

      expect(wrapper.vm.difference).toBe(15);
    });
  });

  describe('formattedDifference', () => {
    it('should format the value of difference to 5 decimal places', () => {
      const wrapper = shallowMount(FxPriceCalculator, {
        propsData: {
          start: 50,
          end: 65
        }
      });

      expect(wrapper.vm.formattedDifference).toBe('15.00000');
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

  describe('formattedPercentage', () => {
    it('should calculate the value of percentage based on difference and props.start', () => {
      const wrapper = shallowMount(FxPriceCalculator, {
        propsData: {
          start: 50,
          end: 65
        }
      });

      expect(wrapper.vm.formattedPercentage).toBe('30.00');
    });
  });
});
