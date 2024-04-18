<script setup lang="ts">
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import AuthRedirect from '@/components/Auth/AuthRedirect.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

async function navigateToDashboard() {
  await new Promise((resolve) => setTimeout(resolve, 1_750))
  router.push({ name: 'journals' })
}

onMounted(async () => await navigateToDashboard())
</script>

<template>
  <BasePageWrapper>
    <AuthRedirect />
  </BasePageWrapper>
</template>
