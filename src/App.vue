<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useConfigurationStore } from '@/stores/configuration'
import SideBar from '@/components/SideBar.vue'

const configurationStore = useConfigurationStore()

onMounted(() => {
  if (!configurationStore.loaded) {
    configurationStore.initFetchConfigurations()
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
</style>
