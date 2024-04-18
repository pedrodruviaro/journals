<script setup lang="ts">
import AdminHeader from '@/components/Admin/AdminHeader.vue'
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import { useRouter } from 'vue-router'

// @TODO - avatar url prop to header

const router = useRouter()

function handleNavigateToJournals() {
  router.push({ name: 'journals' })
}

function handleNavigateToCreateJournal() {
  router.push({ name: 'editor-create' })
}

function handleNavigateToPublicProfile() {
  router.push({ name: 'public-profile' })
}
</script>

<template>
  <div>
    <AdminHeader
      avatar-url="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
      @wants-to-navigate-to-journals="handleNavigateToJournals"
      @wants-to-create-journal="handleNavigateToCreateJournal"
      @wants-to-see-public-profile="handleNavigateToPublicProfile"
    />
    <BasePageWrapper>
      <slot />
    </BasePageWrapper>
  </div>
</template>
