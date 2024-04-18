<script setup lang="ts">
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import AuthRedirect from '@/components/Auth/AuthRedirect.vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()

onMounted(() => {
  setTimeout(() => {
    router.push({ name: 'journals' })
  }, 1500)
})
</script>

<template>
  <BasePageWrapper>
    <AuthRedirect />
  </BasePageWrapper>
</template>
