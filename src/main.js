import Vue from "vue";
import App from "./App";
import Vuex from 'vuex';
import TokenService from "./services/TokenService";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import Paginate from 'vuejs-paginate';
import NumberFormat from './mixins/numerralFormat';
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';
import 'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.css';
import router from "./router";
import store from './store';

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";


import VModal from 'vue-js-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

let url = 'http://testapp.uz:10000/';
store.commit('setBaseUrl', url);
const axiosInstance = axios.create({
  baseURL: url,
});
if (TokenService.getToken()) {
  axiosInstance.defaults.headers.common.Authorization = 'Bearer ' + TokenService.getToken();
}
axiosInstance.interceptors.response.use( response => response, error => {
  if (error.response && error.response.status === 401) {
    TokenService.removeAll(axiosInstance);
    router.push('/login');
  }
  return Promise.reject(error);
});

window.api = axiosInstance;
Vue.prototype.$api = axiosInstance;

Vue.prototype.$Chartist = Chartist;


Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VModal);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(VueMoment);
Vue.component('VueCtkDateTimePicker', VueCtkDateTimePicker);
Vue.component('paginate', Paginate);
Vue.mixin(NumberFormat);


/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: h => h(App),
  router,
  data: {
    Chartist: Chartist
  }
});
