import Vue from 'vue'
import Router from 'vue-router'
import RouteConfig from './router/index.js';

Vue.use(Router)
export default function createRouter () {
  return new Router({
    mode: 'history',
    routes: RouteConfig
  })
}