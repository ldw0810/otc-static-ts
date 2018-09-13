import Vue, { AsyncComponent } from 'vue'
import Router, { RouteConfig, Route, NavigationGuard } from 'vue-router'
import {RouterPath} from '../typings/globle'

const HelloWorld: AsyncComponent = (): any => import('../components/HelloWorld.vue')
const page: RouterPath = {
  notFound: (): any => import('../components/page/notFound.vue'),
  error: (): any => import('../components/page/error.vue')
}
Vue.use(Router)

const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/error',
    name: 'error',
    component: page.error
  },
  {
    path: '*',
    name: 'notFound',
    component: page.notFound
  }
]

const router: Router = new Router({
  mode: 'history',
  base: '/',
  routes
})

export default router
