import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "vue-awesome/icons";
import Icon from "vue-awesome/components/Icon";
Vue.component("v-icon", Icon);

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.use(BootstrapVue);

import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
Vue.component("l-map", LMap);
Vue.component("l-tile-layer", LTileLayer);
Vue.component("l-marker", LMarker);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
