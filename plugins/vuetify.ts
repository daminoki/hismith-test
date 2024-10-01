import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'
import { VDateInput } from 'vuetify/labs/components'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components: {
      ...components,
      VDateInput,
    },
    directives,
    icons: {
      defaultSet: 'mdi',
      sets: {
        mdi,
      },
    },
    locale: {
      locale: 'ru-RU',
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
