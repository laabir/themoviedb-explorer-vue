import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:selectedList?',
      name: 'home',
      component: HomeView,
      props: (route) => ({ selectedList: route.params.selectedList || 'now_playing' })
    }
  ]
})

export default router
