<script setup lang="ts">
import type { Journal } from '@/types'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
import { computed } from 'vue'

const props = defineProps<{
  journal: Journal
}>()

const journalDate = computed(() => {
  const date = new Date(props.journal.createdAt.split('T')[0])
  return Intl.DateTimeFormat('pt-BR').format(date)
})

const emits = defineEmits<{
  (e: 'wants-to-edit-journal', id: string): void
}>()

function handleEmitWantsToEditJournal() {
  emits('wants-to-edit-journal', props.journal.id!)
}
</script>

<template>
  <Card
    class="cursor-pointer hover:bg-[#020617] hover:text-white focus:bg-[#020617] focus:text-white transition-all"
    tabindex="0"
    @keyup.enter="handleEmitWantsToEditJournal"
    @click="handleEmitWantsToEditJournal"
  >
    <template #title>
      <div class="grid gap-4 md:flex md:items-center md:justify-between">
        <h2>{{ props.journal.title }}</h2>
        <p class="text-sm flex items-center justify-between gap-2 max-w-max">
          <span>{{ props.journal.isPublic ? 'Público' : 'Privado' }}</span>
          <i class="pi" :class="[props.journal.isPublic ? 'pi-unlock' : 'pi-lock']"></i>
        </p>
      </div>
    </template>
    <template #content>
      <p>{{ props.journal.description }}</p>
    </template>
    <template #footer>
      <div class="flex justify-end">
        <Chip :label="journalDate" icon="pi pi-calendar-clock" class="text-sm" />
      </div>
    </template>
  </Card>
</template>
