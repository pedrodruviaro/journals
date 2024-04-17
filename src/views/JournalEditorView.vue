<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import EditorForm from '@/components/EditorForm/EditorForm.vue'
import EditorFormLoader from '@/components/EditorForm/EditorFormLoader.vue'
import { ref } from 'vue'

const loading = ref(false)

const title = ref('')
const description = ref('')
const selectedCategory = ref('')
const isPublic = ref(false)
const content = ref('')

function handleSave() {
  console.log({
    title: title.value,
    category: selectedCategory.value,
    description: description.value,
    content: content.value,
    isPublic: isPublic.value
  })
}
</script>

<template>
  <AdminLayout>
    <EditorFormLoader :loading="loading">
      <EditorForm
        v-model:title="title"
        v-model:category="selectedCategory"
        v-model:description="description"
        v-model:content="content"
        v-model:isPublic="isPublic"
        @tried-to-submit="handleSave"
      />
    </EditorFormLoader>
  </AdminLayout>
</template>
