import { shallowMount } from '@vue/test-utils';
import FxFlag from '@/components/FxFlag.vue';

describe('FxFlag.vue', () => {
  it('should render the image with the correct src when srcUrl is not null', () => {
    const src = 'https://flagcdn.com/eu.svg';
    const wrapper = shallowMount(FxFlag, {
      propsData: {
        srcUrl: src
      }
    });
    const img = wrapper.find('img');

    expect(img.attributes('src')).toBe(src);
    expect(img.classes('hide')).toBe(false);
  });

  it('should apply the class hide when srcUrl is null', () => {
    const src = null;
    const wrapper = shallowMount(FxFlag, {
      propsData: {
        srcUrl: src
      }
    });
    const img = wrapper.find('img');

    expect(img.classes('hide')).toBe(true);
  });
});
