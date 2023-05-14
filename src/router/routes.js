import DeviceView from "pages/DeviceView.vue";
import IndexPage from "pages/IndexPage.vue";

const routes = [
  {
    path: '/',
    name: 'home',
    component: IndexPage
  },
  {
    path: '/',
    name: 'device',
    component: DeviceView
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
