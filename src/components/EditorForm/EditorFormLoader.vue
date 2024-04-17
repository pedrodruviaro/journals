<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="grid gap-4" v-if="props.loading">
    <div class="grid gap-4">
      <div class="flex items-center gap-2 justify-between">
        <Skeleton width="100%" height="2.5rem" class="flex-1" />
        <Skeleton width="9rem" height="2.5rem" />
      </div>

      <Skeleton width="100%" height="4rem" />
      <Skeleton width="100%" height="320px" />

      <div class="flex items-center flex-wrap justify-between gap-2">
        <Skeleton width="9rem" height="2.5rem" />
        <Skeleton width="9rem" height="2.5rem" />
      </div>
    </div>
  </div>

  <slot v-else />
</template>
