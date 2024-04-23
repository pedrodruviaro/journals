<script setup lang="ts">
import EditForm from '@/components/Profile/EditForm.vue'
import EditorFormLoader from '@/components/Profile/EditorFormLoader.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import { useGetProfile } from '@/composables/profiles/useGetProfile'
import { useCurrentUser } from 'vuefire'

const user = useCurrentUser()

const { loading: loadingProfile, profile } = useGetProfile({ userId: user.value?.uid! })
</script>

<template>
  <AdminLayout>
    {{ profile }}

    <EditorFormLoader :loading="loadingProfile">
      <EditForm />
    </EditorFormLoader>
  </AdminLayout>
</template>
