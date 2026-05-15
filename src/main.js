import Vue from 'vue';
import App from './App.vue';
import vSelect from 'vue-select';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-select/dist/vue-select.css';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;

Vue.component('v-select', vSelect);

Vue.use(Toast, {
  closeButton: false,
  draggable: false,
  maxToasts: 3,
  position: POSITION.BOTTOM_RIGHT
});

new Vue({
  render: (h) => h(App)
}).$mount('#app');
