<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import type { ZodFormattedError } from 'zod'
import type { UserAditionalInfos } from '@/types'

const props = defineProps<{
  errors?: ZodFormattedError<UserAditionalInfos>
  loading: boolean
}>()

const profile = defineModel<UserAditionalInfos>('profile', {
  required: true,
  default: {
    name: '',
    site: '',
    bio: ''
  }
})

const emits = defineEmits<{
  (e: 'wants-to-save-profile'): void
}>()
</script>

<template>
  <form class="space-y-4" @submit.prevent="emits('wants-to-save-profile')">
    <label class="grid">
      <span>Nome</span>
      <InputText v-model="profile.name" placeholder="John Doe" />
      <small class="error-message" v-if="props.errors?.name">{{
        props.errors?.name._errors[0]
      }}</small>
    </label>

    <label class="grid">
      <span>Site</span>
      <InputText v-model="profile.site" placeholder="http://my-portfolio.com" />
      <small class="error-message" v-if="props.errors?.site">{{
        props.errors?.site._errors[0]
      }}</small>
    </label>

    <label class="grid">
      <span>Bio</span>
      <Textarea v-model="profile.bio" rows="5" placeholder="Uma breve descrição sobre você" />
      <small class="error-message" v-if="props.errors?.bio">{{
        props.errors?.bio._errors[0]
      }}</small>
    </label>

    <Button
      :loading="props.loading"
      type="submit"
      label="Salvar"
      icon="pi pi-save"
      icon-pos="right"
    />
  </form>
</template>
