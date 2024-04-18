<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    as?: string
  }>(),
  {
    as: 'main'
  }
)
</script>

<template>
  <Component :is="props.as" class="container py-10 lg:py-16">
    <slot />
  </Component>
</template>
