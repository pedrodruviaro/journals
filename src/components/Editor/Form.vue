<script setup lang="ts">
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Tag from 'primevue/tag'
import ToggleButton from 'primevue/togglebutton'
import { marked } from 'marked'
import { CATEGORY_VALUES, Category } from '@/constants/category'
import type { Journal } from '@/types'
import type { ZodFormattedError } from 'zod'
import { computed } from 'vue'

const props = defineProps<{
  errors?: ZodFormattedError<Journal>
  loading: boolean
}>()

const journal = defineModel<Journal>('journal', {
  required: true,
  default: {
    title: '',
    description: '',
    category: '' as Category,
    content: '',
    isPublic: false
  }
})

const emits = defineEmits<{
  (e: 'tried-to-submit'): void
}>()

const markdownContent = computed(() => {
  return marked(journal.value.content)
})
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
      <div>
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
      <Tag severity="secondary" value="Editor em markdown" class="mb-2" />
      <div class="grid gap-2 md:grid-cols-2">
        <Textarea v-model="journal.content" class="w-full min-h-96" />
        <div class="w-full min-h-96 p-inputtext prose-sm lg:prose" v-html="markdownContent"></div>
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

<style>
.ql-image {
  display: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}

.error-message {
  @apply text-red-500 text-base;
}
</style>
