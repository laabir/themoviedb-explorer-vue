import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import MovieDetails from '@/components/movies/MovieDetails.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:selectedList?',
      name: 'home',
      component: HomeView,
      props: (route) => ({ selectedList: route.params.selectedList || 'now_playing' })
    },
    {
      path: '/movie/:movieId(\\d+)-:movieTitle',
      name: 'movieDetails',
      component: MovieDetails,
      props: true,
      meta: {
        movie: null
      }
    }
  ]
})

export default router
