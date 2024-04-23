<script setup lang="ts">
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import { useRouter } from 'vue-router'
import { useAuthActions } from '@/composables/auth/useAuthActions'
import { useCurrentUser } from 'vuefire'
import { computed } from 'vue'

const { loading, logout } = useAuthActions()
const router = useRouter()
const user = useCurrentUser()!

const username = computed(() => {
  return user.value?.displayName?.split(' ')[0] || ''
})

function handleNavigateToJournals() {
  router.push({ name: 'journals' })
}

function handleNavigateToCreateJournal() {
  router.push({ name: 'editor-create' })
}

function handleNavigateToProfile() {
  router.push({ name: 'my-profile' })
}
</script>

<template>
  <div v-if="user">
    <AdminHeader
      :loading="loading"
      :username="username"
      :avatar-url="user?.photoURL!"
      @wants-to-navigate-to-journals="handleNavigateToJournals"
      @wants-to-create-journal="handleNavigateToCreateJournal"
      @wants-to-navigate-to-profile="handleNavigateToProfile"
      @wants-to-logout="logout"
    />
    <BasePageWrapper>
      <slot />
    </BasePageWrapper>
  </div>
</template>
