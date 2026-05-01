import { DEVICE_TYPE } from '@/constants';

export default {
  data() {
    return {
      width: window.innerWidth
    };
  },
  computed: {
    deviceType() {
      if (this.width < 768) {
        return DEVICE_TYPE.MOBILE;
      } else if (this.width < 992) {
        return DEVICE_TYPE.TABLET;
      } else {
        return DEVICE_TYPE.DESKTOP;
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.width = window.innerWidth;
    }
  }
};
