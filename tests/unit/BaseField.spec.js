import { shallowMount } from '@vue/test-utils';
import BaseField from '@/components/BaseField.vue';

describe('BaseField.vue', () => {
  const wrapper = shallowMount(BaseField, {
    propsData: {
      label: 'Exchange',
      value: 'FX'
    }
  });

  it('should render label', () => {
    expect(wrapper.find('.label').text()).toBe('Exchange');
  });

  it('should render value', () => {
    expect(wrapper.find('.value').text()).toBe('FX');
  });
});
