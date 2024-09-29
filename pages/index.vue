<template>
  <v-container>
    <h1 class="title">
      Новости
    </h1>

    <div class="list">
      <NewsCard
        v-for="item in news"
        :key="item.id"
        :news="item"
      />
    </div>

    <v-pagination
      v-model="currentPage"
      :length="totalPages"
      @update:model-value="currentPage = $event"
    />
  </v-container>
</template>

<script setup lang="ts">
import type { News, NewsResponse } from '@/types/news'

const currentPage = ref(1)
const limit = 5
const totalNews = ref(0)
const news = ref<News[]>([])

const fetchNews = async () => {
  const { data } = await useFetch<NewsResponse>(`/api/news?page=${currentPage.value}&limit=${limit}`)
  news.value = data.value?.news || []
  totalNews.value = data.value?.total || 0
}

fetchNews()

const totalPages = computed(() => Math.ceil(totalNews.value / limit))

watch(currentPage, fetchNews)
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.title {
@include h1;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
