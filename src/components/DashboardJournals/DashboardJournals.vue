<script setup lang="ts">
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import Card from 'primevue/card'
import Chip from 'primevue/chip'
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
      <Card
        v-for="i in 5"
        :key="i"
        class="cursor-pointer hover:bg-[#020617] hover:text-white focus:bg-[#020617] focus:text-white transition-all"
        tabindex="0"
        @keyup.enter="() => console.log(i)"
      >
        <template #title>My journal {{ i }}</template>
        <template #content>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsum, saepe? Eius unde
            consequuntur voluptatibus magni laboriosam dolorem quam aperiam! Possimus placeat
            debitis ipsum.
          </p>
        </template>
        <template #footer>
          <div class="flex justify-end">
            <Chip
              :label="new Date().toLocaleDateString('pt-BR')"
              icon="pi pi-calendar-clock"
              class="text-sm"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
