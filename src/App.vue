<script setup lang="ts">
import Toast from 'primevue/toast'
import { RouterView } from 'vue-router'
</script>

<template>
  <Toast />
  <RouterView />
</template>

<style>
.journals-move,
.journals-enter-active,
.journals-leave-active {
  transition: all 0.5s ease;
}

.journals-enter-from,
.journals-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.journals-leave-active {
  position: absolute;
}
</style>
