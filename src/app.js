import Vue from 'vue'
import App from './compontents/App.vue'
import createRouter from './router.js';
export default function createApp (context) {
  const router = createRouter();
  const app = new Vue({
      router,
      render: h => h(App)
  });
  return {app, router};
}