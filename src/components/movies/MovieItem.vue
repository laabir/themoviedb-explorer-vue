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
</script>

<template>
  <li class="movies-item">
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
</template>
