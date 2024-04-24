<script setup lang="ts">
const props = defineProps<{
  id: string
}>()
</script>

<template>
  <div>Perfil -> {{ props.id }}</div>
</template>
