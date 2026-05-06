import { shallowMount } from '@vue/test-utils';
import BaseDropdown from '@/components/BaseDropdown.vue';

describe('BaseDropdown.vue', () => {
  const options = [
    { label: 'EURUSD - Euro - United States dollar', value: 'C:EURUSD' },
    { label: 'USDEUR - United States dollar - Euro', value: 'C:USDEUR' }
  ];

  const wrapper = shallowMount(BaseDropdown, {
    stubs: {
      'v-select': true
    },
    propsData: {
      label: 'Primary Symbol',
      options
    }
  });

  it('should render label', () => {
    expect(wrapper.find('label').text()).toBe('Primary Symbol');
  });

  it('should emit selected-value when option is selected', () => {
    wrapper.vm.setSelectedValue(options[0].value);

    expect(wrapper.emitted('selected-value')[0]).toEqual(['C:EURUSD']);
  });
});
