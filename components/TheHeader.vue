<template>
  <header class="header">
    <NuxtLink to="/">
      <v-btn
        density="compact"
        prepend-icon="mdi-home"
      >
        Главные новости :: www.rbc.ru
      </v-btn></NuxtLink>
  </header>
</template>

<style scoped lang="scss">
.header {
  background-color: var(--main-bg-color);
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
