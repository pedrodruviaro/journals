<script setup lang="ts">
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
</script>

<template>
  <div class="grid gap-4">
    <div class="flex justify-between items-center gap-2">
      <IconField iconPosition="left">
        <InputIcon>
          <i class="pi pi-search" />
        </InputIcon>
        <InputText placeholder="Search" />
      </IconField>
    </div>

    <div class="grid gap-4">
      <slot />
    </div>
  </div>
</template>
