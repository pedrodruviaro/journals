<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading">
    <div class="grid gap-5">
      <div class="grid gap-1">
        <Skeleton width="6rem" height="1.5rem" />
        <Skeleton width="100%" height="2.5rem" />
      </div>

      <div class="grid gap-1">
        <Skeleton width="6rem" height="1.5rem" />
        <Skeleton width="100%" height="10rem" />
      </div>

      <Skeleton width="7rem" height="2.5rem" />
    </div>
  </div>

  <slot v-else />
</template>
