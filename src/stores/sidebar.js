import { defineStore } from 'pinia'

const menuItems = [
  {
    title: 'Now Playing',
    itemKey: 'now_playing'
  },
  {
    title: 'Popular',
    itemKey: 'popular'
  },
  {
    title: 'Top Rated',
    itemKey: 'top_rated'
  },
  {
    title: 'Upcoming',
    itemKey: 'upcoming'
  },
  {
    title: 'Trending Today',
    itemKey: 'day'
  },
  {
    title: 'Trending This Week',
    itemKey: 'week'
  }
]

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    menuItems,
    selectedMenuItem: null
  }),

  actions: {
    setSelectedMenuItem(key) {
      this.selectedMenuItem = this.menuItems.find((item) => {
        return item.itemKey === key
      })
    }
  },

  getters: {
    getMenuItems: (state) => () => state.menuItems,
    getSelectedMenuItem: (state) => () => state.selectedMenuItem
  }
})
