import Vue from 'vue'
import Router, {RouteConfig} from 'vue-router'
import languageDataList from '../locale'
import {$getLanguage, $title} from '../utils'
import {AsyncComponent, Component} from "vue/types/options";

let languageData: GlobeType.LanguageData | undefined = languageDataList.find(
  item => item.language === $getLanguage()
)

const page: { [key: string]: Component | AsyncComponent } = {
  notFound: (): any => import('../components/page/notFound.vue'),
  error: (): any => import('../components/page/error.vue'),
  home: (): any => import('../components/page/home.vue')
}
Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'home',
    component: page.home
  },
  {
    path: '/error',
    name: 'error',
    meta: {
      error: 2
    },
    component: page.error
  },
  {
    path: '*',
    name: 'notFound',
    meta: {
      error: 1
    },
    component: page.notFound
  }
]

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes
})
router.beforeEach((to, from, next) => {
  if (to.meta.error !== from.meta.error) {
    if (languageData) {
      if (to.meta.error === 1) {
        $title(languageData.data.public.not_found)
      } else if (to.meta.error === 2) {
        $title(languageData.data.public.server_maintenance)
      }
    } else {
      $title()
    }
  }
  next()
})
export default router
