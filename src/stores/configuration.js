import { defineStore } from 'pinia'
import axios from 'axios'

//headers for the api requests
const requestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN
  }
}

export const useConfigurationStore = defineStore('configuration', {
  state: () => ({
    baseUrl: `${import.meta.env.VITE_THEMOVIEDB_HOST}/${import.meta.env.VITE_THEMOVIEDB_API_VERSION}`,
    locale: 'en-US',
    config: {},
    loaded: false
  }),

  actions: {
    async initFetchConfigurations() {
      this.loaded = false
      try {
        await Promise.all([this.fetchConfiguration(), this.fetchGenres()])
        this.loaded = true
      } catch (error) {
        console.error(error)
      }
    },

    async fetchConfiguration() {
      try {
        const configResponse = await axios.get(this.baseUrl + `/configuration`, requestOptions)

        this.config.images = configResponse.data.images
        this.config.change_keys = configResponse.data.change_keys
      } catch (error) {
        console.error(error)
      }
    },

    async fetchGenres() {
      try {
        const genresResponse = await axios.get(
          this.baseUrl + `/genre/movie/list?language=${this.locale}`,
          requestOptions
        )

        this.config.genres = genresResponse.data.genres
      } catch (error) {
        console.error(error)
      }
    },

    async setLocale(newLocale) {
      if (newLocale !== this.locale) {
        this.loaded = false
        this.locale = newLocale
        await this.fetchGenres()
        this.loaded = true
      }
    }
  },

  getters: {
    getBaseUrl: (state) => () => state.baseUrl,
    getLocale: (state) => () => state.locale,
    getImagesConfig: (state) => () => state.config.images,
    getGenresConfig: (state) => () => state.config.genres
  }
})
