<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = defineProps<{
  loading: boolean
  journals?: any
}>()
</script>

<template>
  <div v-if="props.loading" class="grid gap-4">
    <Skeleton width="17rem" height="2.5rem" />

    <div class="grid gap-4">
      <Skeleton width="100%" height="190px" v-for="i in 5" :key="'journalloader' + i" />
    </div>
  </div>

  <slot v-else />
</template>
