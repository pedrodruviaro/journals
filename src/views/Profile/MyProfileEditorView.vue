<script setup lang="ts">
import Card from 'primevue/card'
import EditorForm from '@/components/Profile/Editor/Editor.vue'
import EditorFormLoader from '@/components/Profile/Editor/Loader.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import Headline from '@/components/Profile/Headline/Headline.vue'
import HeadlineLoader from '@/components/Profile/Headline/Loader.vue'
import { useGetProfile } from '@/composables/profiles/useGetProfile'
import { useCurrentUser } from 'vuefire'
import { useSeoTitle } from '@/composables/seo/useSeoTitle'
import { useEditProfile } from '@/composables/profiles/useEditProfile'
import { watchEffect } from 'vue'
import { useRouter } from 'vue-router'

useSeoTitle('Meu perfil')

const user = useCurrentUser()

const { loading: loadingProfile, profile, getProfile } = useGetProfile({ userId: user.value?.uid! })

const {
  loading: loadingEditProfile,
  errors,
  userInfos,
  updateProfile,
  safeParse
} = useEditProfile({ userId: user.value?.uid! })

async function handleUpdateProfile() {
  const isValid = safeParse().success
  if (!isValid) return

  await updateProfile()
  await getProfile()
}

let originalName = ''
watchEffect(() => {
  if (profile.value?.name) {
    userInfos.value = profile.value
    originalName = profile.value.name
  }
})

const router = useRouter()
function handleNavigateToPublicProfile() {
  const routeData = router.resolve({ name: 'public-user', params: { id: user.value?.uid! } })
  window.open(routeData.href, '_blank')
}
</script>

<template>
  <AdminLayout>
    <div class="grid gap-4">
      <Card>
        <template #content>
          <HeadlineLoader :loading="loadingProfile">
            <Headline
              :name="originalName"
              :email="profile?.email!"
              :avatar-url="profile?.photoURL!"
              @wants-to-see-public-profile="handleNavigateToPublicProfile"
            />
          </HeadlineLoader>
        </template>
      </Card>

      <Card>
        <template #content>
          <EditorFormLoader :loading="loadingProfile">
            <EditorForm
              :profile="userInfos"
              :loading="loadingEditProfile"
              :errors="errors"
              @wants-to-save-profile="handleUpdateProfile"
            />
          </EditorFormLoader>
        </template>
      </Card>
    </div>
  </AdminLayout>
</template>
