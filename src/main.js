import './assets/images/icons/favicon.ico';
import Vue from "vue";
import App from "./App.vue";
import router from './router';
import {store} from './store'
new Vue({
  el: "#vue-app",
  router,
  store,
  render: h => h(App)
});
