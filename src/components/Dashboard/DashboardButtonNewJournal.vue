<script setup lang="ts">
const emits = defineEmits<{
  (e: 'wants-to-create-new-journal'): void
}>()
</script>

<template>
  <button
    @click="emits('wants-to-create-new-journal')"
    class="z-50 fixed bottom-6 right-6 grid place-items-center bg-[#020617] text-6xl text-white rounded-full w-20 aspect-square border-[3px] border-[#020617] hover:bg-white hover:text-[#020617]"
  >
    <i class="pi pi-plus text-2xl"></i>
  </button>
</template>
