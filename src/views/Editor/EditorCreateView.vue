<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import EditorForm from '@/components/Editor/Form.vue'
import { useJournalCreate } from '@/composables/journals/useJournalCreate'
import { useCurrentUser } from 'vuefire'
import { useSeoTitle } from '@/composables/seo/useSeoTitle'

useSeoTitle('Crie seu jornal')

const user = useCurrentUser()
const {
  errors,
  loading: loadingCreate,
  journal,
  safeParse,
  createJournal
} = useJournalCreate({ userId: user.value?.uid! })

async function handleCreate() {
  const isValid = safeParse().success

  if (!isValid) return

  await createJournal()
}
</script>

<template>
  <AdminLayout>
    <h1 class="font-bold mb-4 text-2xl lg:text-3xl">Crie seu jornal!</h1>
    <EditorForm
      :loading="loadingCreate"
      :errors="errors"
      v-model:journal="journal"
      @tried-to-submit="handleCreate"
    />
  </AdminLayout>
</template>
