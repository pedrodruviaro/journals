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

const { loading, journals } = useJournals()

const router = useRouter()
function handleWantsCreateNewJournal() {
  router.push('/journals/new')
}

function handleWantsToEdit(id: string) {
  //@TODO - change this logic after router is finished
  router.push(`/editor/edit?id=${id}`)
}
</script>

<template>
  <AdminLayout>
    <section>
      <div class="grid md:grid-cols-[1fr_5fr] items-start gap-8">
        <DasboardButtonsLoader :loading="loading">
          <DasboardButtons />
        </DasboardButtonsLoader>

        <DashboardJournalsLoader :loading="loading">
          <DashboardJournalsGroup>
            <DashboardJournalsCard
              v-for="journal in journals"
              :key="journal.id"
              :journal="journal"
              @wants-to-edit-journal="handleWantsToEdit"
            />
          </DashboardJournalsGroup>
        </DashboardJournalsLoader>
      </div>

      <DashboardButtonNewJournal @wants-to-create-new-journal="handleWantsCreateNewJournal" />
    </section>
  </AdminLayout>
</template>