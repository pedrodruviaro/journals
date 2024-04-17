<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="flex flex-col gap-2 items-start">
    <Button class="w-full text-left" label="Personal" severity="contrast" outlined />
    <Button class="w-full text-left" label="Work" severity="secondary" outlined />
    <Button class="w-full text-left" label="Misc" severity="secondary" outlined />
  </div>
</template>
