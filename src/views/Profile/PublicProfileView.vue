<script setup lang="ts">
import BasePageWrapper from '@/components/Base/BasePageWrapper.vue'
import PublicHeadline from '@/components/Profile/PublicHeadline/PublicHeadline.vue'
import PublicHeadlineLoader from '@/components/Profile/PublicHeadline/Loader.vue'
import JournalGroup from '@/components/Journal/Group.vue'
import JournalCard from '@/components/Journal/Card.vue'
import JournalLoader from '@/components/Journal/Loader.vue'
import JournalReader from '@/components/Journal/Reader.vue'
import { ref, computed, watch, watchEffect } from 'vue'
import { useSeoTitle } from '@/composables/seo/useSeoTitle'
import { usePublicProfile } from '@/composables/profiles/usePublicProfile'

const props = defineProps<{
  id: string
}>()

const userId = computed(() => {
  return props.id
})

const { loading, journals, profile, getPublicProfile } = usePublicProfile({ userId: userId.value })

watchEffect(() => {
  if (profile.value?.name) {
    useSeoTitle(profile.value.name)
  }
})

watch(
  () => userId.value,
  async () => {
    await getPublicProfile(userId.value)
  }
)

const visible = ref(false)
const headerRef = ref('')
const contentRef = ref('')

function handleWantsToSeeJournal(id: string) {
  const journalToRender = journals.value?.find((j) => j.id === id)

  if (!journalToRender) return

  visible.value = true
  headerRef.value = journalToRender.title
  contentRef.value = journalToRender.content
}
</script>

<template>
  <BasePageWrapper>
    <div class="grid gap-4">
      <PublicHeadlineLoader :loading="loading">
        <PublicHeadline
          v-if="profile"
          :bio="profile.bio"
          :name="profile.name"
          :avatar-url="profile.photoURL!"
          :site="profile.site"
        />
      </PublicHeadlineLoader>

      <JournalLoader :loading="loading" :amount="10">
        <JournalGroup v-if="journals && journals?.length > 0">
          <TransitionGroup name="journals">
            <JournalCard
              v-for="journal in journals"
              :key="journal.id"
              :journal="journal"
              @wants-to-see-journal="handleWantsToSeeJournal"
            />
          </TransitionGroup>
        </JournalGroup>
      </JournalLoader>
    </div>

    <JournalReader v-model:open="visible" :title="headerRef" :content="contentRef" />
  </BasePageWrapper>
</template>
