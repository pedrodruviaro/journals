<script setup lang="ts">
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import AuthLogin from '@/components/Auth/AuthLogin.vue'
import { useAuthActions } from '@/composables/auth/useAuthActions'

const { loading, loginWithGoogle } = useAuthActions()
</script>

<template>
  <BasePageWrapper>
    <AuthLogin :loading="loading" @wants-to-login-with-google="loginWithGoogle" />
  </BasePageWrapper>
</template>
