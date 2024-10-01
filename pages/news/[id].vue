<template>
  <v-container>
    <h1 class="title">
      {{ news.title }}
    </h1>
    <div class="header">
      <div class="date">
        <p>{{ news.date }}</p>
        <p>{{ news.time }}</p>
      </div>
      <p
        v-if="news.author"
        class="author"
      >
        {{ news.author }}
      </p>
    </div>

    <div
      class="anons"
      v-html="news.anons"
    />

    <div
      v-if="news.images.length"
      ref="imageSlider"
      class="slider"
    >
      <v-carousel
        :slides-per-view="1"
        :loop="true"
        class="slider-inner"
      >
        <v-carousel-item
          v-for="(image, index) in news.images"
          :key="index"
          cover
        >
          <a
            :href="image"
            data-fancybox="news-gallery"
            class="image-link"
          >
            <v-img
              :src="image"
              :height="600"
              cover
            />
          </a>
        </v-carousel-item>
      </v-carousel>
    </div>

    <a
      :href="news.link"
      target="_blank"
      class="link"
    >
      Читать полностью</a>
  </v-container>
</template>

<script setup lang="ts">
import '@fancyapps/ui/dist/fancybox/fancybox.css'
import { Fancybox } from '@fancyapps/ui'

const route = useRoute()
const { data: news } = await useFetch(`/api/news/${route.params.id}`)

useHead({
  title: `${news.value.title}`,
  meta: [
    { name: 'description', content: `${news.value.anons}` },
  ],
})

const imageSlider = ref<HTMLElement | null>(null)

onMounted(() => {
  Fancybox.bind('[data-fancybox="news-gallery"]', {
    hideScrollbar: false,
  })
})

onUpdated(() => {
  Fancybox.unbind(imageSlider.value)
  Fancybox.close()

  Fancybox.bind('[data-fancybox="news-gallery"]', {
    hideScrollbar: false,
  })
})

onUnmounted(() => {
  Fancybox.destroy()
})
</script>

<style scoped lang="scss">
@import '@/assets/styles/mixins.scss';

.title {
  @include h1;
  margin: 40px 0;
}

.header {
  @include xs {
    flex-direction: column;
    gap: 10px;
  }

  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 0 0 20px;
}

.date {
  @include p;

  display: flex;
  gap: 10px;
}

.author {
  @include p;
}

.anons {
  @include p;
}

.slider {
  max-width: 1060px;
  width: 100%;
  margin: 40px auto 0;
}

.link {
  @include link;

  margin: 20px 0 0;
  display: block;
  text-align: end;
}

.image-link {
  display: block;
  height: 100%;
}
</style>
