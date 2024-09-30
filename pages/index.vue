<template>
  <v-container>
    <h1 class="title">
      Новости
    </h1>

    <div class="filters">
      <div class="search-filter">
        <v-text-field
          v-model="query"
          placeholder="Поиск"
          variant="solo"
          clearable
          bg-color="#06266f20"
          color="#ffffff"
          density="compact"
          append-inner-icon="mdi-magnify"
          persistent-hint
          @input="debouncedFetchNews"
          @click:clear="handleClear"
        />
      </div>
    </div>

    <div
      v-if="news.length && !isLoading"
      class="list"
    >
      <NewsCard
        v-for="item in news"
        :key="item.id"
        :news="item"
      />
    </div>

    <p v-if="!news.length && !isLoading">
      По данным параметрам запроса ничего не найдено
    </p>

    <div
      v-if="isLoading"
      class="loader"
    >
      <v-progress-circular
        color="#06266f"
        indeterminate
      />
    </div>

    <div
      v-if="news.length && !isLoading"
      class="pagination"
    >
      <v-pagination
        v-model="currentPage"
        :length="totalPages"
        prev-icon="mdi-chevron-left"
        next-icon="mdi-chevron-right"
        variant="elevated"
        color="#06266f20"
        @update:model-value="currentPage = $event"
      />
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { debounce } from 'lodash'
import type { News, NewsResponse } from '@/types/news'

const currentPage = ref(1)
const limit = 5
const totalNews = ref(0)
const news = ref<News[]>([])
const query = ref('')
const isLoading = ref(false)

const debouncedFetchNews = debounce(() => {
  currentPage.value = 1
  fetchNews()
}, 300)

const fetchNews = async () => {
  isLoading.value = true
  const { data } = await useFetch<NewsResponse>(
    `/api/news?page=${currentPage.value}&limit=${limit}&query=${query.value}`,
  )
  isLoading.value = false

  news.value = data.value?.news || []
  totalNews.value = data.value?.total || 0
}

const handleClear = () => {
  query.value = ''
  debouncedFetchNews()
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

.filters {
  display: flex;
  gap: 20px;
  margin: 20px 0;
}

.search-filter {
  max-width: 400px;
  width: 100%;
}

.pagination {
  margin: 20px 0;
}

.loader {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
</style>
