<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const locale = ref('fr-FR')
const requestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN
  }
}

const configuration = ref({})
const genres = ref([])
const movies = ref([])
const mainTitle = ref('')
const page = ref(1)

onMounted(() => {
  updateMainTitle('')
  loadConfiguration()
})

const loadConfiguration = async () => {
  try {
    const [configResponse, genresResponse] = await Promise.all([
      axios.get(
        import.meta.env.VITE_THEMOVIEDB_HOST +
          `/${import.meta.env.VITE_THEMOVIEDB_API_VERSION}` +
          `/configuration`,
        requestOptions
      ),

      axios.get(
        import.meta.env.VITE_THEMOVIEDB_HOST +
          `/${import.meta.env.VITE_THEMOVIEDB_API_VERSION}` +
          `/genre/movie/list?language=${locale.value}`,
        requestOptions
      )
    ])

    configuration.value = configResponse.data
    genres.value = genresResponse.data.genres
  } catch (error) {
    console.error(error)
  }
}

const loadMovies = async (sortedBy) => {
  axios
    .get(
      import.meta.env.VITE_THEMOVIEDB_HOST +
        `/${import.meta.env.VITE_THEMOVIEDB_API_VERSION}` +
        `/movie/${sortedBy}?language=${locale.value}&page=${page.value}`,
      requestOptions
    )
    .then((response) => {
      movies.value = response.data.results
      updateMainTitle(sortedBy)
    })
    .catch((error) => {
      console.error(error)
    })
}

const loadTrending = async (period) => {
  axios
    .get(
      import.meta.env.VITE_THEMOVIEDB_HOST +
        `/${import.meta.env.VITE_THEMOVIEDB_API_VERSION}` +
        `/trending/movie/${period}?language=${locale.value}&page=${page.value}`,
      requestOptions
    )
    .then((response) => {
      movies.value = response.data.results
      updateMainTitle('trending')
    })
    .catch((error) => {
      console.error(error)
    })
}

const updateMainTitle = (sortedBy) => {
  switch (sortedBy) {
    case 'now_playing':
      mainTitle.value = 'Now Playing'
      break
    case 'popular':
      mainTitle.value = 'Popular'
      break
    case 'top_rated':
      mainTitle.value = 'Top Rated'
      break
    case 'upcoming':
      mainTitle.value = 'Upcoming'
      break
    case 'trending':
      mainTitle.value = 'Trending'
      break
    default:
      mainTitle.value = 'Welcome to The Movie Database Explorer'
      break
  }
}
</script>

<template>
  <div class="home">
    <ul class="movies-sorter">
      <li><input type="button" value="In theaters" @click="loadMovies('now_playing')" /></li>
      <li><input type="button" value="Popular" @click="loadMovies('popular')" /></li>
      <li><input type="button" value="Top rated" @click="loadMovies('top_rated')" /></li>
      <li><input type="button" value="Upcoming" @click="loadMovies('upcoming')" /></li>
      <li><input type="button" value="Trending today" @click="loadTrending('day')" /></li>
      <li><input type="button" value="Trending this week" @click="loadTrending('week')" /></li>
    </ul>
    <h1>{{ mainTitle }}</h1>
    <ul v-if="movies.length > 0" class="movies">
      <li v-for="movie in movies" :key="movie.id" class="movies-item">
        <img
          :src="
            configuration.images.secure_base_url +
            configuration.images.poster_sizes[3] +
            movie.poster_path
          "
          class="movies-item__poster"
        />
        <div class="movies-item__details">
          <p class="movies-item__title">
            {{ movie.title }}
            {{ movie.original_title !== movie.title ? `- ${movie.original_title}` : '' }}
          </p>
          <ul class="movies-item__genres">
            <li v-for="genreId in movie.genre_ids" :key="genreId">
              {{
                genres.find((genre) => {
                  return genre.id === genreId
                })?.name
              }}
            </li>
          </ul>
          <p v-if="movie.overview" class="movies-item__overview">{{ movie.overview }}</p>
          <p v-if="movie.release_date">{{ movie.release_date.substring(0, 4) }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
