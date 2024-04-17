<script setup lang="ts">
import AdminHeader from '@/components/AdminHeader.vue'
</script>

<template>
  <div>
    <AdminHeader />
    <main class="container py-10 lg:py-16">
      <slot />
    </main>
  </div>
</template>
