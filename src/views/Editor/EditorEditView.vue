<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import EditorForm from '@/components/Editor/Form.vue'
import EditorFormLoader from '@/components/Editor/Loader.vue'
import { useCurrentUser } from 'vuefire'
import { useMyJournal } from '@/composables/journals/useMyJournal'
import { useJournalUpdate } from '@/composables/journals/useJournalUpdate'
import { useSeoTitle } from '@/composables/seo/useSeoTitle'
import { watchEffect } from 'vue'

const props = defineProps<{
  id: string
}>()

const user = useCurrentUser()

const {
  loading: loadingJournal,
  journal,
  error
} = useMyJournal({
  userId: user.value?.uid!,
  journalId: props.id
})

const {
  loading: loadingUpdate,
  journalValues,
  errors,
  updateJournal,
  safeParse
} = useJournalUpdate({ journal, id: props.id })

async function handleUpdate() {
  const isValid = safeParse().success

  if (!isValid) return

  await updateJournal()
}

watchEffect(() => {
  if (!loadingJournal.value && !error.value) {
    useSeoTitle(journal.value?.title ?? 'Edite seu jornal')
  }
})
</script>

<template>
  <AdminLayout>
    <EditorFormLoader :loading="loadingJournal">
      <EditorForm
        v-if="!error && journal"
        v-model:journal="journalValues"
        :loading="loadingUpdate"
        :errors="errors"
        @tried-to-submit="handleUpdate"
      />
    </EditorFormLoader>

    <div v-if="error">
      <h2>Algo deu errado (diferente userId)</h2>
    </div>
  </AdminLayout>
</template>
