<script setup>
import { RouterLink } from 'vue-router'
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()
</script>

<template>
  <img alt="logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

  <nav>
    <RouterLink to="/">Home</RouterLink>
    <ul class="menu">
      <li v-for="menuItem in sidebarStore.getMenuItems()" :key="menuItem.listName">
        <input
          type="button"
          :value="menuItem.title"
          @click="sidebarStore.setSelectedMenuItem(menuItem.itemKey)"
        />
      </li>
    </ul>
  </nav>
</template>
