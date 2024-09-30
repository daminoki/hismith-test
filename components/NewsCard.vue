<script setup lang="ts">
import type { News } from '@/types/news'

defineProps<{ news: News }>()
</script>

<template>
  <v-card
    class="news-card"
    variant="outlined"
  >
    <v-card-title>
      <NuxtLink
        :to="`/news/${news.id}`"
      >
        {{ news.title }}
      </NuxtLink>
    </v-card-title>
    <v-card-text>{{ news.anons }}</v-card-text>
    <v-card-text>{{ news.date }}</v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
</style>
