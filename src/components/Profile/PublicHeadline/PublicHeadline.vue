<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps<{
  name: string
  avatarUrl: string
  bio?: string
  site?: string
}>()
</script>

<template>
  <Card>
    <template #content>
      <div class="grid gap-3">
        <div class="flex gap-4 justify-start items-center flex-wrap">
          <div class="w-20 h-20 overflow-hidden rounded-full">
            <img :src="props.avatarUrl" :alt="props.name" />
          </div>
          <div class="grid gap-2">
            <h1 class="font-bold text-xl md:text-2xl">{{ props.name }}</h1>
            <a
              v-if="props.site"
              :href="props.site"
              target="_blank"
              rel="nofollow"
              class="text-base lg:text-lg hover:underline focus:underline"
              >{{ props.site }}</a
            >
          </div>
        </div>
        <div v-if="props.bio">
          <p>{{ props.bio }}</p>
        </div>
      </div>
    </template>
  </Card>
</template>
