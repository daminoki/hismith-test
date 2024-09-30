<template>
  <v-container>
    <h1>{{ news.title }}</h1>
    <p>{{ news.pubDate }}</p>
    <div v-html="news.anons" />
    <img
      v-for="image in news.images"
      :key="image"
      :src="image"
    >
    <a
      :href="news.link"
      target="_blank"
    >Читать далее</a>
  </v-container>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: news } = await useFetch(`/api/news/${route.params.id}`)
</script>
