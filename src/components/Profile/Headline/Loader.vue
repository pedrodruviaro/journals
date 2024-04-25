<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div class="grid gap-2 md:grid-cols-[max-content_1fr] md:items-center" v-if="props.loading">
    <Skeleton shape="circle" width="5rem" height="5rem" />

    <div class="grid gap-2">
      <Skeleton width="100%" class="max-w-[5rem]" height="2rem" />
      <Skeleton width="100%" class="max-w-[10rem]" height="2rem" />
    </div>
  </div>

  <slot v-else />
</template>
