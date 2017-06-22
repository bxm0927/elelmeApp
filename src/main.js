// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import goods from './components/goods/goods'
import ratingsBox from './components/ratingsBox/ratingsBox'
import seller from './components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false

var router = new VueRouter({
  routes: [
    { path: '/goods', component: goods },
    { path: '/ratingsBox', component: ratingsBox },
    { path: '/seller', component: seller }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

// [Vue warn]: Error in nextTick: "TypeError: Cannot read property 'children' of undefined"
// router.push({ path: '/goods' })
