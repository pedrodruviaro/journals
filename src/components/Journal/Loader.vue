<script setup lang="ts">
import Skeleton from 'primevue/skeleton'

const props = withDefaults(
  defineProps<{
    loading: boolean
    amount?: number
  }>(),
  {
    amount: 5
  }
)
</script>

<template>
  <div v-if="props.loading" class="grid gap-4">
    <div class="grid gap-4">
      <Skeleton width="100%" height="190px" v-for="i in props.amount" :key="'journalloader' + i" />
    </div>
  </div>

  <slot v-else />
</template>
