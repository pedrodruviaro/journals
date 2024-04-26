<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import ToggleButton from 'primevue/togglebutton'
import Editor from 'primevue/editor'
import { CATEGORY_VALUES } from '@/constants/category'
import type { Journal } from '@/types'
import type { ZodFormattedError } from 'zod'

const props = defineProps<{
  errors?: ZodFormattedError<Journal>
  loading: boolean
}>()

const journal = defineModel<Journal>('journal', {
  required: true,
  default: {
    title: '',
    description: '',
    category: '',
    content: '',
    isPublic: false
  }
})

const emits = defineEmits<{
  (e: 'tried-to-submit'): void
}>()
</script>

<template>
  <div class="grid gap-4">
    <div class="flex items-start flex-wrap gap-2 justify-between">
      <div class="grid flex-1">
        <InputText type="text" placeholder="Título" v-model="journal.title" class="w-full" />
        <small class="error-message" v-if="props.errors?.title">{{
          props.errors?.title._errors[0]
        }}</small>
      </div>
      <div class="grid">
        <Dropdown
          v-model="journal.category"
          :options="CATEGORY_VALUES"
          placeholder="Categoria"
          class="w-40"
        />
        <small class="error-message" v-if="props.errors?.category">{{
          props.errors?.category._errors[0]
        }}</small>
      </div>
    </div>
    <div class="grid">
      <Textarea v-model="journal.description" rows="2" placeholder="Uma breve descrição" />
      <small class="error-message" v-if="props.errors?.description">{{
        props.errors?.description._errors[0]
      }}</small>
    </div>

    <div>
      <div class="grid gap-2">
        <Editor v-model="journal.content" editorStyle="height: 320px" />
      </div>
      <small class="error-message" v-if="props.errors?.content">{{
        props.errors?.content._errors[0]
      }}</small>
    </div>

    <div class="flex items-center flex-wrap justify-between gap-2">
      <div>
        <ToggleButton
          v-model="journal.isPublic"
          onLabel="Público"
          offLabel="Privado"
          onIcon="pi pi-lock-open"
          offIcon="pi pi-lock"
          class="w-9rem"
          aria-label="Visibilidade do jornal"
        />
        <small class="error-message" v-if="props.errors?.isPublic">{{
          props.errors?.isPublic._errors[0]
        }}</small>
      </div>
      <Button
        label="Salvar"
        icon="pi pi-check"
        icon-pos="right"
        class="max-w-max ml-auto"
        :loading="props.loading"
        @click="emits('tried-to-submit')"
      />
    </div>
  </div>
</template>
