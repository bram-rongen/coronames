import Vue from "vue";
import App from "./App.vue";
import VueNativeSock from "vue-native-websocket";
import store from "./store";
import VueMoment from "vue-moment";
import "vue-material-design-icons/styles.css";
// import "normalize.css";

Vue.config.productionTip = false;

const protocol = window.location.protocol === "https:" ? "wss" : "ws";

const wsUrl = process.env.VUE_APP_WS_URL
  ? process.env.VUE_APP_WS_URL
  : `${protocol}://${window.location.hostname}:${window.location.port}/`;

Vue.use(VueNativeSock, wsUrl, {
  reconnection: true,
  store,
  format: "json"
});

Vue.use(VueMoment);

new Vue({
  render: h => h(App),
  store
}).$mount("#app");
