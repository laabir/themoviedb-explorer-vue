<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const configuration = ref({})
const movies = ref([])

onMounted(async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN
    }
  }

  axios
    .get('https://api.themoviedb.org/3/configuration', options)
    .then((response) => {
      configuration.value = response.data
    })
    .catch((error) => {
      console.error(error)
    })
})

const loadMovies = async (type) => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN
    }
  }

  axios
    .get(`https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`, options)
    .then((response) => {
      movies.value = response.data.results
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <div class="home">
    <h1>Welcome to The Movie Database Explorer</h1>
    <ul>
      <li><input type="button" value="In theaters" @click="loadMovies('now_playing')" /></li>
      <li><input type="button" value="Popular" @click="loadMovies('popular')" /></li>
      <li><input type="button" value="Top rated" @click="loadMovies('top_rated')" /></li>
      <li><input type="button" value="Upcoming" @click="loadMovies('upcoming')" /></li>
    </ul>
    <h2>Results:</h2>
    <ul v-if="movies.length > 0" class="movie-list">
      <li v-for="movie in movies" :key="movie.id" class="movie-list__item">
        <img
          :src="
            configuration.images.secure_base_url +
            configuration.images.poster_sizes[2] +
            movie.poster_path
          "
        />
        {{ movie.original_title }}
      </li>
    </ul>
  </div>
</template>
