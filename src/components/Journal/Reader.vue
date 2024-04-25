<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { marked } from 'marked'
import { computed } from 'vue'

const props = defineProps<{
  title: string
  content: string
}>()

const open = defineModel<boolean>('open', { required: true })

const htmlContent = computed(() => {
  return marked.parse(props.content)
})
</script>

<template>
  <Dialog
    v-model:visible="open"
    maximizable
    modal
    :header="props.title"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <div class="prose">
      <div v-html="htmlContent"></div>
    </div>
  </Dialog>
</template>
