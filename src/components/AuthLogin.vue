<script setup lang="ts">
import BaseLogo from '@/components/BaseLogo.vue'
import Card from 'primevue/card'
import Divider from 'primevue/divider'
import Button from 'primevue/button'

const props = defineProps<{
  loading: boolean
}>()

const emits = defineEmits<{
  (e: 'wants-to-login-with-google'): void
}>()
</script>

<template>
  <div class="grid gap-4 md:grid-cols-2 items-center">
    <Card class="mx-auto text-center">
      <template #title>
        <BaseLogo />
      </template>
      <template #content>
        <p class="text-lg">Entre agora e compartilhe suas ideias de maneira fácil</p>
        <Divider> entre com </Divider>
        <Button
          type="button"
          label="Google"
          icon="pi pi-google"
          icon-pos="right"
          :loading="props.loading"
          @click="emits('wants-to-login-with-google')"
        />
      </template>
    </Card>
    <img src="/login-image.svg" alt="" />
  </div>
</template>
