<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="flex flex-col gap-2 items-start" v-if="props.loading">
    <Skeleton width="100%" height="2.5rem" />
    <Skeleton width="100%" height="2.5rem" />
    <Skeleton width="100%" height="2.5rem" />
  </div>
  <slot v-else />
</template>
