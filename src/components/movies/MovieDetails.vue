<script setup>
import { useMoviesStore } from '@/stores/movies'
import { ref, onMounted } from 'vue'

const moviesStore = useMoviesStore()
const movie = ref(null)

const props = defineProps({
  movieId: {
    type: String,
    required: true
  },
  movieTitle: {
    type: String,
    required: true
  }
})

onMounted(async () => {
  const movieId = props.movieId

  movie.value = await moviesStore.fetchMovieDetails(movieId)

  console.log(movie.value)
})
</script>

<template>
  <div v-if="movie" class="movie-details">
    <header>
      <h1>{{ movie.title }}</h1>
    </header>
  </div>
</template>
