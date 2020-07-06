import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App";
import Vuex from 'vuex';
import Api from './services/ApiPlugin';
import TokenService from "./services/TokenService";
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';
import VueMoment from 'vue-moment';
import Paginate from 'vuejs-paginate';
import NumberFormat from './mixins/numerralFormat';
import routes from "./routes/routes";

// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";
import Notifications from "./components/NotificationPlugin";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "nav-item active"
});
import VModal from 'vue-js-modal';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

axios.interceptors.response.use(res => res, error => {
  if (error.response && error.response.status === 401) {
    TokenService.removeToken();
    TokenService.removeRefreshToken();
    router.push({name: 'login'});
  }
  return Promise.reject(error);
});

Vue.prototype.$Chartist = Chartist;

Vue.use(VueRouter);
Vue.use(MaterialDashboard);
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);
Vue.use(Notifications);
Vue.use(VModal);
Vue.use(Api);
Vue.use(Vuex);
Vue.use(VueAxios, axios);
Vue.use(Vuelidate);
Vue.use(VueMoment);
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
