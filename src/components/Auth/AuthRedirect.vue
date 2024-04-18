<script setup lang="ts">
import BaseLogo from '@/components/Base/BaseLogo.vue'
import ProgressSpinner from 'primevue/progressspinner'
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 text-center">
    <BaseLogo />
    <h1 class="font-semibold text-2xl">Redirecionando...</h1>
    <ProgressSpinner stroke-width="3" animation-duration=".75s" />
    <img class="max-w-[40rem]" src="/redirect-image.svg" alt="" />
  </div>
</template>
