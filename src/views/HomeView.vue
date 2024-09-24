<script setup>
import { ref, watch } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import MoviesList from '@/components/movies/MoviesList.vue'

const sidebarStore = useSidebarStore()

// we use storeToRefs to make the store state reactive
const { selectedMenuItem } = storeToRefs(sidebarStore)

const mainTitle = ref('')

const changeTitle = () => {
  mainTitle.value = sidebarStore.getSelectedMenuItem()?.title
}

watch(
  selectedMenuItem,
  (newMenuItem) => {
    changeTitle(newMenuItem)
  },
  { immediate: true }
)
</script>

<template>
  <main class="home">
    <header>
      <h1>{{ mainTitle }}</h1>
    </header>

    <MoviesList />
  </main>
</template>
