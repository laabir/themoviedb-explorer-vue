<script setup>
import { ref, watch, onMounted } from 'vue'
import { useSidebarStore } from '@/stores/sidebar'
import { storeToRefs } from 'pinia'
import MoviesList from '@/components/movies/MoviesList.vue'
import { useRouter, useRoute } from 'vue-router'

const props = defineProps({
  selectedList: {
    type: String,
    default: 'now_playing'
  }
})

const router = useRouter()
const route = useRoute()
const sidebarStore = useSidebarStore()

const mainTitle = ref('')
const { selectedMenuItem } = storeToRefs(sidebarStore)

const changeTitle = () => {
  mainTitle.value = sidebarStore.getSelectedMenuItem()?.title
}

const updateSelectedList = (listKey) => {
  changeTitle()

  if (listKey === 'now_playing') {
    router.push({ name: 'home' })
  } else {
    router.push({ name: 'home', params: { selectedList: listKey } })
  }
}

// Watch for route changes
watch(
  () => route.params.selectedList,
  (newList) => {
    const list = newList || 'now_playing'
    if (list !== sidebarStore.getSelectedMenuItem()?.itemKey) {
      sidebarStore.setSelectedMenuItem(list)
    }
  },
  { immediate: true }
)

watch(
  selectedMenuItem,
  () => {
    let listKey = sidebarStore.getSelectedMenuItem()?.itemKey
    updateSelectedList(listKey)
  },
  { immediate: true }
)

onMounted(() => {
  if (!selectedMenuItem.value) {
    sidebarStore.setSelectedMenuItem(props.selectedList)
  }
})
</script>

<template>
  <header>
    <h1>{{ mainTitle }}</h1>
  </header>

  <MoviesList />
</template>
