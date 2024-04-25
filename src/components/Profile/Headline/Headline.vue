<script setup lang="ts">
import Button from 'primevue/button'

const props = defineProps<{
  name: string
  email: string
  avatarUrl: string
}>()

const emits = defineEmits<{
  (e: 'wants-to-see-public-profile'): void
}>()
</script>

<template>
  <div class="flex flex-wrap gap-4 items-center justify-between">
    <div class="grid gap-2 md:grid-cols-[max-content_1fr] md:items-center md:gap-4">
      <div class="w-20 h-20 overflow-hidden rounded-full">
        <img :src="props.avatarUrl" :alt="props.name" />
      </div>

      <div>
        <h1 class="font-bold text-xl lg:text-2xl">{{ props.name }}</h1>
        <h2>{{ props.email }}</h2>
      </div>
    </div>

    <Button
      severity="secondary"
      label="Ver perfil público"
      icon-pos="right"
      icon="pi pi-arrow-up-right"
      @click="emits('wants-to-see-public-profile')"
    />
  </div>
</template>
