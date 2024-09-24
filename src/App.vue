<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useConfigurationStore } from '@/stores/configuration'
import { useSidebarStore } from '@/stores/sidebar'
import SideBar from './components/SideBar.vue'
import { storeToRefs } from 'pinia'

const configurationStore = useConfigurationStore()
const sidebarStore = useSidebarStore()

// we use storeToRefs to make the store state reactive
const { selectedMenuItem } = storeToRefs(sidebarStore)

onMounted(() => {
  if (!configurationStore.loaded) {
    configurationStore.initFetchConfigurations()
  }

  if (!selectedMenuItem.value) {
    sidebarStore.setSelectedMenuItem('now_playing')
  }
})
</script>

<template>
  <div class="layout">
    <SideBar />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  height: 100vh;
}
main {
  flex: 1;
  overflow-y: auto;
  padding: 50px;
}
</style>
