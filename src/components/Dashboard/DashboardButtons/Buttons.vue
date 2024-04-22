<script setup lang="ts">
import Button from 'primevue/button'
import { CATEGORY_VALUES } from '@/constants/category'
import type { Category } from '@/constants/category'

const props = defineProps<{
  selectedCategory: Category | null
}>()

const emits = defineEmits<{
  (e: 'wants-to-filter-journals', value: Category): void
  (e: 'wants-to-clear-filter'): void
}>()
</script>

<template>
  <div class="flex flex-col gap-2 items-start">
    <Button
      class="button"
      outlined
      label="Todos"
      @click="emits('wants-to-clear-filter')"
      :severity="props.selectedCategory === null ? 'contrast' : 'secondary'"
    />
    <Button
      class="button"
      outlined
      v-for="category in CATEGORY_VALUES"
      :key="category"
      :label="category"
      :severity="props.selectedCategory === category ? 'contrast' : 'secondary'"
      @click="emits('wants-to-filter-journals', category)"
    />
  </div>
</template>

<style scoped>
.button {
  @apply w-full text-left;
}
</style>
