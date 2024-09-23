<script setup>
import { onMounted, ref } from 'vue'
import { useConfigurationStore } from '@/stores/configuration'
import { useMoviesStore } from '@/stores/movies'

const configurationStore = useConfigurationStore()
const moviesStore = useMoviesStore()
const movies = ref([])
const mainTitle = ref('')

const listsMenu = [
  {
    title: 'Now Playing',
    listName: 'now_playing'
  },
  {
    title: 'Popular',
    listName: 'popular'
  },
  {
    title: 'Top Rated',
    listName: 'top_rated'
  },
  {
    title: 'Upcoming',
    listName: 'upcoming'
  },
  {
    title: 'Trending Today',
    listName: 'day'
  },
  {
    title: 'Trending This Week',
    listName: 'week'
  }
]

const showMovies = async (list) => {
  if (moviesStore.getMoviesTotal(list) < 1) {
    await moviesStore.fetchMovies(list)
  }

  movies.value = moviesStore.getMovies(list)
  mainTitle.value = listsMenu.find((item) => {
    return item.listName === list
  })?.title
}

onMounted(() => {
  showMovies('now_playing')
})
</script>

<template>
  <div class="home">
    <h1>{{ mainTitle }}</h1>

    <ul class="movies-sorter">
      <li v-for="menuItem in listsMenu" :key="menuItem.listName">
        <input type="button" :value="menuItem.title" @click="showMovies(menuItem.listName)" />
      </li>
    </ul>

    <ul v-if="movies.length > 0" class="movies">
      <li v-for="movie in movies" :key="movie.id" class="movies-item">
        <img
          :src="
            configurationStore.getImagesConfig()?.secure_base_url +
            configurationStore.getImagesConfig()?.poster_sizes[3] +
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
                configurationStore.getGenresConfig()?.find((genre) => {
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
