import Vue from 'vue';
import App from './App.vue';
import Toast, { POSITION } from 'vue-toastification';
import 'vue-toastification/dist/index.css';

Vue.config.productionTip = false;

Vue.use(Toast, {
  draggable: false,
  maxToasts: 3,
  position: POSITION.BOTTOM_RIGHT
});

new Vue({
  render: (h) => h(App)
}).$mount('#app');
