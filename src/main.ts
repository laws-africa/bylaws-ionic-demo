import Vue from 'vue';
import App from './App.vue';
import router from './router';
import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';
import 'indigo-web/css/indigo-web.min.css';

Vue.use(Ionic);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
