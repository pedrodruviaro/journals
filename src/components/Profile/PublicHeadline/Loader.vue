<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading">
    <div class="grid gap-3">
      <div class="flex flex-wrap gap-4 items-center">
        <Skeleton shape="circle" width="7rem" height="7rem" />
        <Skeleton width="15rem" height="2rem" />
      </div>
      <Skeleton width="100%" height="5rem" />
    </div>
  </div>
  <slot v-else />
</template>
