<template>
  <div class="page-wrapper">
    <TheHeader />

    <main class="page">
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Главные новости',
  meta: [
    { name: 'description', content: 'Главные новости' },
  ],
})
</script>

<style scoped lang="scss">
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
}

.page {
  flex: 1;
}
</style>
