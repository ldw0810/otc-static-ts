// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import vuexI18n from 'vuex-i18n'
import './style/index.styl'
import {$getLanguage} from './utils'
import languageDataList from './locale'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  preLoad: 1.2
})
Vue.use(vuexI18n.plugin, store)
// 存储token
if (localStorage.getItem('userToken') && !store.state.userToken) {
  store.commit('saveToken', localStorage.getItem('userToken'))
}
// 自动设置语言
for (let i = 0; i < languageDataList.length; i++) {
  Vue.i18n.add(languageDataList[i].language, languageDataList[i].data)
}
// 自动设置语言
Vue.i18n.set($getLanguage())
// filters
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
