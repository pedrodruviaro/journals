<script setup lang="ts">
import BasePageWrapper from '@/components/BasePageWrapper.vue'
import AuthLogin from '@/components/AuthLogin.vue'

import { ref } from 'vue'

const loading = ref(false)

function handleLogin() {
  console.log('login')
}
</script>

<template>
  <BasePageWrapper>
    <AuthLogin :loading="loading" @wants-to-login-with-google="handleLogin" />
  </BasePageWrapper>
</template>
