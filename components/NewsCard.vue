<script setup lang="ts">
import type { News } from '@/types/news'

defineProps<{ news: News }>()
</script>

<template>
  <v-card
    class="news-card"
    variant="outlined"
    color="#06266f"
  >
    <v-card-title>
      <NuxtLink
        :to="`/news/${news.id}`"
        class="card-title"
      >
        {{ news.title }}
      </NuxtLink>
    </v-card-title>
    <v-card-text
      class="card-text"
      v-html="news.anons"
    />
    <v-card-text class="card-date">
      {{ news.date }}
    </v-card-text>
  </v-card>
</template>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.card-title {
  @include h3;

  text-decoration: none;
  transition: color 0.25s ease-in-out;

  &:hover {
    color: var(--contrast-text-color);
  }
}

.card-text {
@include p;
}

.card-date {
  @include p;
  text-align: end;
}
</style>
