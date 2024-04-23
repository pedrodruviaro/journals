<script setup lang="ts">
const props = defineProps<{
  loading: boolean
}>()
</script>

<template>
  <div v-if="props.loading">
    <p>loading...</p>
  </div>

  <slot v-else />
</template>
