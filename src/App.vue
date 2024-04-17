<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterLink :to="{ name: 'landing-page' }">Landing page</RouterLink>
  <RouterLink :to="{ name: 'login' }">Login</RouterLink>

  <RouterView />
</template>
