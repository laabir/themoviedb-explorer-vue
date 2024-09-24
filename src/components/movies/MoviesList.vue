<script setup>
import { ref, watch } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import MovieItem from './MovieItem.vue'

const moviesStore = useMoviesStore()
const sidebarStore = useSidebarStore()

// we use storeToRefs to make the store state reactive
const { selectedMenuItem } = storeToRefs(sidebarStore)

const movies = ref([])

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
  <ul v-if="movies.length > 0" class="movies">
    <MovieItem v-for="movie in movies" :key="movie.id" :movie="movie" />
  </ul>
  <input type="button" value="Load More" @click="loadMoreMovies" />
</template>
