import { shallowMount } from '@vue/test-utils';
import BaseDropdown from '@/components/BaseDropdown.vue';

describe('BaseDropdown.vue', () => {
  const options = [
    { label: 'EURUSD - Euro - United States dollar', value: 'C:EURUSD' },
    { label: 'USDEUR - United States dollar - Euro', value: 'C:USDEUR' }
  ];

  const wrapperFactory = (propsData = {}) =>
    shallowMount(BaseDropdown, {
      propsData: {
        label: 'Primary Symbol',
        options,
        ...propsData
      }
    });

  it('should render label', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.find('label').text()).toBe('Primary Symbol');
  });

  it('should set selectedValue to undefined when options is empty', () => {
    const wrapper = wrapperFactory({ options: [] });

    expect(wrapper.vm.selectedValue).toBeUndefined();
  });

  it('should set id based on the value of label', () => {
    const wrapper = wrapperFactory();

    expect(wrapper.vm.id).toBe('primary-symbol');
  });

  it('should emit selected-value when option is selected', () => {
    const wrapper = wrapperFactory();
    wrapper.vm.setSelectedValue(options[0].value);

    expect(wrapper.emitted('selected-value')[0]).toEqual(['C:EURUSD']);
  });
});
