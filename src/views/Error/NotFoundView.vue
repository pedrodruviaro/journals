<script setup lang="ts">
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { computed } from 'vue'
import { useSeoTitle } from '@/composables/seo/useSeoTitle'

useSeoTitle('Página não encontrada')

const props = defineProps<{
  path: string
}>()

const notFoundPath = computed(() => {
  return props.path
})
</script>

<template>
  <BasePageWrapper>
    <Card class="max-w-[40rem] mx-auto">
      <template #title>
        <h1 class="text-center">Parece que isso não existe...</h1>
      </template>
      <template #content>
        <p class="text-base font-regular text-center mb-2">
          A página <strong>{{ notFoundPath }}</strong> não existe ou foi removida
        </p>
        <RouterLink to="/" class="mx-auto max-w-max block mb-4">
          <Button label="Ir para o início" />
        </RouterLink>
        <img src="/not-found-image.svg" alt="" />
      </template>
    </Card>
  </BasePageWrapper>
</template>
