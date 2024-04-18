<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ToggleButton from 'primevue/togglebutton'

const categories = [
  { name: 'Work', value: 'work' },
  { name: 'Personal', value: 'personal' }
]

const title = defineModel<string>('title', { required: true })
const category = defineModel<string>('category', { required: true })
const description = defineModel<string>('description', { required: true })
const content = defineModel<string>('content', { required: true })
const isPublic = defineModel<boolean>('isPublic', { required: true })

const emits = defineEmits<{
  (e: 'tried-to-submit'): void
}>()
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-center flex-wrap gap-2 justify-between">
      <InputText type="text" placeholder="Título" v-model="title" class="flex-1" />
      <Dropdown
        v-model="category"
        :options="categories"
        optionLabel="name"
        placeholder="Categoria"
        class="w-40"
      />
    </div>
    <Textarea v-model="description" rows="2" placeholder="Uma breve descrição" />

    <Editor v-model="content" editorStyle="height: 320px" />

    <div class="flex items-center flex-wrap justify-between gap-2">
      <ToggleButton
        v-model="isPublic"
        onLabel="Privado"
        offLabel="Público"
        onIcon="pi pi-lock"
        offIcon="pi pi-lock-open"
        class="w-9rem"
        aria-label="Visibilidade do jornal"
      />
      <Button
        label="Salvar"
        icon="pi pi-check"
        icon-pos="right"
        class="max-w-max ml-auto"
        @click="emits('tried-to-submit')"
      />
    </div>
  </div>
</template>

<style>
.ql-image {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}
</style>
