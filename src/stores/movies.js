import { defineStore } from 'pinia'
import axios from 'axios'
import { useConfigurationStore } from '@/stores/configuration'

//headers for the api requests
const requestOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_THEMOVIEDB_ACCESS_TOKEN
  }
}

export const useMoviesStore = defineStore('movies', {
  state: () => ({
    movies: {},
    pages: {}
  }),

  actions: {
    async fetchMovies(listName) {
      const configurationStore = useConfigurationStore()
      const isTrending = listName === 'day' || listName === 'week'
      const trendingPath = isTrending ? '/trending' : ''

      if (!this.pages[listName]) this.pages[listName] = 1

      try {
        const moviesResponse = await axios.get(
          configurationStore.getBaseUrl() +
            trendingPath +
            `/movie/${listName}?language=${configurationStore.getLocale()}&page=${this.pages[listName]}`,
          requestOptions
        )

        this.movies[listName] = [...(this.movies[listName] ?? []), ...moviesResponse.data.results]
      } catch (error) {
        console.error(error)
      }
    },
    async loadMoreMovies(listName) {
      this.pages[listName]++
      await this.fetchMovies(listName)
    }
  },

  getters: {
    getMovies: (state) => (getBy) => state.movies[getBy],
    getMoviesTotal: (state) => (getBy) => state.movies[getBy]?.length || 0
  }
})
