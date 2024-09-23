<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useConfigurationStore } from '@/stores/configuration'

const configurationStore = useConfigurationStore()
onMounted(() => {
  if (!configurationStore.loaded) {
    configurationStore.initFetchConfigurations()
  }
})
</script>

<template>
  <header>
    <img alt="logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
