<script setup lang="ts">
import Avatar from 'primevue/avatar'
import Button from 'primevue/button'
import Menu from 'primevue/menu'
import Sidebar from 'primevue/sidebar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const menuItems = ref([
  { label: 'Journals', icon: 'pi pi-book', command: () => router.push({ name: 'dashboard' }) },
  { label: 'Criar novo', icon: 'pi pi-plus', command: () => router.push({ name: 'dashboard' }) },
  { label: 'Perfil Público', icon: 'pi pi-user', command: () => router.push({ name: 'dashboard' }) }
])

const isSidebarVisible = ref(false)
</script>

<template>
  <header class="shadow-sm py-2.5">
    <div class="container flex items-center justify-between gap-2">
      <span class="font-black text-3xl lg:text-4xl">Journals</span>

      <div class="flex items-center gap-2">
        <Avatar
          image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
          class="mr-2"
          shape="circle"
          size="large"
        />

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
