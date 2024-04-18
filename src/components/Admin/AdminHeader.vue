<script setup lang="ts">
import BaseLogo from '@/components/Base/BaseLogo.vue'
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'
import type { MenuItem } from 'primevue/menuitem'

const props = defineProps<{
  avatarUrl: string
}>()

const emits = defineEmits<{
  (e: 'wants-to-navigate-to-journals'): void
  (e: 'wants-to-create-journal'): void
  (e: 'wants-to-see-public-profile'): void
}>()

const menuItems = ref<MenuItem[]>([
  { label: 'Journals', icon: 'pi pi-book', command: () => emits('wants-to-create-journal') },
  {
    label: 'Criar novo',
    icon: 'pi pi-plus',
    command: () => emits('wants-to-create-journal')
  },
  {
    label: 'Perfil Público',
    icon: 'pi pi-user',
    command: () => emits('wants-to-see-public-profile')
  }
])

const isSidebarVisible = ref(false)
</script>

<template>
  <header class="shadow-sm py-2.5">
    <div class="container flex items-center justify-between gap-2">
      <BaseLogo />

      <div class="flex items-center gap-2">
        <Avatar :image="props.avatarUrl" class="mr-2" shape="circle" size="large" />

        <Button
          icon="pi pi-bars"
          aria-label="Submit"
          severity="secondary"
          @click="isSidebarVisible = true"
        />
      </div>
    </div>
  </header>
  <Sidebar v-model:visible="isSidebarVisible" header="Menu" position="right">
    <div class="h-full flex flex-col justify-between">
      <Menu :model="menuItems" />
      <Button icon="pi pi-sign-out" icon-pos="right" label="Sair" severity="secondary" outlined />
    </div>
  </Sidebar>
</template>
