<script setup lang="ts">
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import AuthLogin from '@/components/Auth/AuthLogin.vue'
import { useAuthActions } from '@/composables/auth/useAuthActions'
import { useSeoTitle } from '@/composables/seo/useSeoTitle'
import { onMounted } from 'vue'
import { getCurrentUser } from 'vuefire'
import { useRouter } from 'vue-router'

useSeoTitle('Login')

const { loading, loginWithGoogle } = useAuthActions()

const router = useRouter()
onMounted(async () => {
  const user = await getCurrentUser()

  if (user) {
    router.push({ name: 'journals' })
  }
})
</script>

<template>
  <BasePageWrapper>
    <AuthLogin :loading="loading" @wants-to-login-with-google="loginWithGoogle" />
  </BasePageWrapper>
</template>
