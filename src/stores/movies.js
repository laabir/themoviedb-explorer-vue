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
      console.log('fetching page ', this.pages[listName], ' of ', listName)

      try {
        const moviesResponse = await axios.get(
          configurationStore.getBaseUrl() +
            trendingPath +
            `/movie/${listName}?language=${configurationStore.getLocale()}&page=${this.pages[listName]}`,
          requestOptions
        )

        if (!this.movies[listName]) {
          this.movies[listName] = []
        }

        const unfilteredMovies = [...this.movies[listName], ...moviesResponse.data.results]
        const filteredMovies = unfilteredMovies.filter(
          (movie, index, self) => index === self.findIndex((m) => m.id === movie.id)
        )

        this.movies[listName] = filteredMovies

        console.log(filteredMovies)
      } catch (error) {
        console.error(error)
      }
    },
    async loadMoreMovies(listName) {
      this.pages[listName]++
      console.log('loading page ', this.pages[listName], ' of ', listName)
      await this.fetchMovies(listName)
    }
  },

  getters: {
    getMovies: (state) => (listName) => state.movies[listName],
    getMoviesTotal: (state) => (listName) => state.movies[listName]?.length || 0
  }
})
