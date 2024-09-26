<script setup>
import { useConfigurationStore } from '@/stores/configuration'

const configurationStore = useConfigurationStore()

const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
})

const movie = props.movie

const poster =
  configurationStore.getImagesConfig()?.secure_base_url +
  configurationStore.getImagesConfig()?.poster_sizes[3] +
  movie.poster_path

const overview =
  movie.overview.length < 200 ? movie.overview : movie.overview.substring(0, 200) + '...'
</script>

<template>
  <li class="movies-item">
    <img :src="poster" class="movies-item__poster" />
    <div class="movies-item__details">
      <p class="movies-item__title">
        {{ movie.title }}
        {{ movie.original_title !== movie.title ? `- ${movie.original_title}` : '' }}
      </p>
      <p v-if="movie.release_date" class="movies-item__year">
        {{ movie.release_date.substring(0, 4) }}
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
      <p v-if="movie.overview" class="movies-item__overview">{{ overview }}</p>
    </div>
  </li>
</template>

<style scoped>
.movies-item {
  position: relative;
  width: 200px;
  height: 300px;
  overflow: hidden;
}

.movies-item__poster {
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 1rem;
}

.movies-item__details {
  border-radius: 1rem;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 7% 10%;
  visibility: hidden;
  opacity: 0;
}

.movies-item:hover .movies-item__details {
  visibility: visible;
  opacity: 100%;
}

.movies-item__genres {
  font-size: 0.7em;
  display: flex;
  column-gap: 0.2rem;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  row-gap: 0rem;
}

.movies-item__year {
  font-size: 0.7em;
  font-weight: 500;
  margin-bottom: 10px;
}

.movies-item__overview {
  text-overflow: ellipsis;
  font-size: 0.8em;
  text-align: justify;
  text-justify: inter-word;
}

.movies-item__title {
  font-weight: bold;
}
</style>
