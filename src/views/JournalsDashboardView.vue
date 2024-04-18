<script setup lang="ts">
import AdminLayout from '@/layouts/AdminLayout.vue'
import DasboardButtons from '@/components/DashboardButtons/DasboardButtons.vue'
import DasboardButtonsLoader from '@/components/DashboardButtons/DasboardButtonsLoader.vue'
import DashboardJournals from '@/components/DashboardJournals/DashboardJournals.vue'
import DashboardJournalsLoader from '@/components/DashboardJournals/DashboardJournalsLoader.vue'
import DashboardButtonNewJournal from '@/components/DashboardButtonNewJournal.vue'
import { useRouter } from 'vue-router'

// @TODO - remove this placeholder code
import { ref } from 'vue'
const loading = ref(false)

const router = useRouter()
function handleWantsCreateNewJournal() {
  router.push('/journals/new')
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
          <DashboardJournals />
        </DashboardJournalsLoader>
      </div>

      <DashboardButtonNewJournal @wants-to-create-new-journal="handleWantsCreateNewJournal" />
    </section>
  </AdminLayout>
</template>
