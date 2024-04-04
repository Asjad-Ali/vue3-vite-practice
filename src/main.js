
import { createApp } from "vue";
import App from "./App.vue";
import router from './router'
// import "bootstrap/dist/js/bootstrap.js"
// import "bootstrap/dist/css/bootstrap.min.css"
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const app = createApp(App);

app
  .use(router)

  .component('fa', FontAwesomeIcon) // Register the Vue component globally
  .mount('#app');
