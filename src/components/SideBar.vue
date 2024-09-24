<script setup>
import { useSidebarStore } from '@/stores/sidebar'

const sidebarStore = useSidebarStore()
</script>

<template>
  <nav class="sidebar">
    <RouterLink to="/" class="link-home">
      <img alt="logo" class="logo" src="@/assets/logo.svg" width="150" />
    </RouterLink>

    <ul class="menu">
      <li v-for="menuItem in sidebarStore.getMenuItems()" :key="menuItem.listName">
        <input
          type="button"
          :value="menuItem.title"
          @click="sidebarStore.setSelectedMenuItem(menuItem.itemKey)"
          :class="menuItem === sidebarStore.getSelectedMenuItem() ? 'selected' : ''"
        />
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.sidebar {
  background-color: var(--primary-color);
  display: flex;
  flex-direction: column;
  padding: 1.5rem 2rem;
  width: 250px;
  color: white;
}

.link-home {
  display: block;
  width: fit-content;
  margin-bottom: 20px;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.sidebar input[type='button'] {
  color: white;
  font-weight: bold;
  text-transform: uppercase;
}

.sidebar input[type='button'].selected {
  color: var(--secondary-color);
}
</style>
