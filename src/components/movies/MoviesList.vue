<script setup>
import { ref, watch } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import MovieItem from './MovieItem.vue'

const moviesStore = useMoviesStore()
const sidebarStore = useSidebarStore()

const movies = ref([])
const { selectedMenuItem } = storeToRefs(sidebarStore)

const showMovies = async () => {
  if (!selectedMenuItem.value) return

  if (moviesStore.getMoviesTotal(selectedMenuItem.value.itemKey) < 1) {
    await moviesStore.fetchMovies(selectedMenuItem.value.itemKey)
  }

  movies.value = moviesStore.getMovies(selectedMenuItem.value.itemKey)
}

const loadMoreMovies = async () => {
  await moviesStore.loadMoreMovies(selectedMenuItem.value.itemKey)

  movies.value = moviesStore.getMovies(selectedMenuItem.value.itemKey)
}

watch(
  selectedMenuItem,
  () => {
    showMovies()
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="movies.length > 0" class="container">
    <ul class="movies">
      <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
    </ul>
    <input type="button" value="Load More" @click="loadMoreMovies" class="btn-loadmore" />
  </div>
</template>

<style scoped>
.movies {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 30px;
  justify-items: center;
  margin-bottom: 30px;
}

.btn-loadmore {
  display: block;
  width: 100%;
  padding: 10px;
  background: var(--primary-gradient);
  color: white;
  font-size: 1.2rem;
  border-radius: 1rem;
  text-transform: uppercase;
  font-weight: 600;
}

.btn-loadmore:hover {
  background: var(--secondary-gradient);
}
</style>
