<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import DasboardButtons from '@/components/Dashboard/DashboardButtons/Buttons.vue'
import DasboardButtonsLoader from '@/components/Dashboard/DashboardButtons/Loader.vue'
import DashboardJournalsGroup from '@/components/Dashboard/DashboardJournals/Group.vue'
import DashboardJournalsCard from '@/components/Dashboard/DashboardJournals/Card.vue'
import DashboardJournalsLoader from '@/components/Dashboard/DashboardJournals/Loader.vue'
import DashboardButtonNewJournal from '@/components/Dashboard/DashboardButtonNewJournal.vue'
import { useRouter } from 'vue-router'
import { useJournals } from '@/composables/journals/useJournals'
import { useCurrentUser } from 'vuefire'
import { ref } from 'vue'
import { watchEffect } from 'vue'
import type { Category } from '@/constants/category'
import type { Journal } from '@/types'

const user = useCurrentUser()
const { loading, journals } = useJournals({ userId: user.value?.uid! })

const router = useRouter()
function handleWantsCreateNewJournal() {
  router.push({ name: 'editor-create' })
}
function handleWantsToEdit(id: string) {
  router.push({ name: 'editor-edit', params: { id } })
}

const filteredJournals = ref<Journal[]>([])
const selectedCategory = ref<Category | null>(null)

function handleFilter(value: Category) {
  selectedCategory.value = value

  return (filteredJournals.value = journals.value.filter((journal) => journal.category == value))
}

function handleClearFilter() {
  selectedCategory.value = null
  filteredJournals.value = journals.value
}

watchEffect(() => {
  if (!loading.value && journals.value.length > 0) {
    filteredJournals.value = journals.value
  }
})
</script>

<template>
  <AdminLayout>
    <section>
      <div class="grid md:grid-cols-[1fr_5fr] items-start gap-8">
        <DasboardButtonsLoader :loading="loading">
          <DasboardButtons
            :selectedCategory="selectedCategory"
            @wants-to-filter-journals="handleFilter"
            @wants-to-clear-filter="handleClearFilter"
          />
        </DasboardButtonsLoader>

        <DashboardJournalsLoader :loading="loading">
          <DashboardJournalsGroup>
            <TransitionGroup name="journals">
              <DashboardJournalsCard
                v-for="journal in filteredJournals"
                :key="journal.id"
                :journal="journal"
                @wants-to-edit-journal="handleWantsToEdit"
              />
            </TransitionGroup>
          </DashboardJournalsGroup>
        </DashboardJournalsLoader>
      </div>

      <DashboardButtonNewJournal @wants-to-create-new-journal="handleWantsCreateNewJournal" />
    </section>
  </AdminLayout>
</template>

<style scoped>
.journals-move,
.journals-enter-active,
.journals-leave-active {
  transition: all 0.5s ease;
}

.journals-enter-from,
.journals-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.journals-leave-active {
  position: absolute;
}
</style>
