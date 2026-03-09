<script setup lang="ts">
import logoImage from '~/assets/images/logo.png'

const route = useRoute()
const locale = computed(() => normalizeLocale(route.path.split('/')[1]))
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))

const footerCategoriesByLocale = {
  zh: ['CPU', 'GPU', '网卡', '光模块', 'SSD', 'HDD', '服务器整机'],
  en: ['CPU', 'GPU', 'NIC', 'Optical', 'SSD', 'HDD', 'Server'],
  ru: ['CPU', 'GPU', 'NIC', 'Оптика', 'SSD', 'HDD', 'Серверы']
} as const

const footerLabelsByLocale = {
  zh: {
    navigation: '网站导航',
    products: '主营品类',
    contact: '联系方式',
    summary: '服务器配件采购与供应服务商',
    availability: '7×24 小时快速响应',
    copyright: '版权所有'
  },
  en: {
    navigation: 'Navigation',
    products: 'Categories',
    contact: 'Contact',
    summary: 'Server component sourcing and supply partner',
    availability: '24/7 Rapid Response',
    copyright: 'Copyright'
  },
  ru: {
    navigation: 'Навигация',
    products: 'Категории',
    contact: 'Контакты',
    summary: 'Поставщик серверных комплектующих',
    availability: 'Быстрый ответ 24/7',
    copyright: 'Copyright'
  }
} as const

const footerCategories = computed(() => footerCategoriesByLocale[locale.value])
const footerLabels = computed(() => footerLabelsByLocale[locale.value])
</script>

<template>
  <footer class="mt-20 border-t border-slate-800/80 bg-[linear-gradient(180deg,#0f172a_0%,#111c34_48%,#18253f_100%)] text-slate-200">
    <div class="shell">
      <div class="relative overflow-hidden px-6 py-14 sm:px-8 lg:px-10 lg:py-16">
        <div class="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(96,165,250,0.45),transparent)]" />
        <div class="pointer-events-none absolute left-0 top-6 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />
        <div class="pointer-events-none absolute right-12 top-10 h-28 w-28 rounded-full bg-sky-400/15 blur-3xl" />

        <div class="relative grid gap-10 lg:grid-cols-[1.1fr_0.72fr_0.9fr_1.38fr] lg:gap-8">
          <div class="lg:pr-6">
            <div class="rounded-[1.75rem] border border-slate-800/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(15,23,42,0.06))] p-6 shadow-[0_18px_40px_rgba(2,6,23,0.18)]">
              <img :src="logoImage" alt="ROTHSCHILD logo" class="h-16 w-auto object-contain sm:h-20">
              <p class="mt-6 text-sm leading-7 text-slate-300">
                {{ footerLabels.summary }}
              </p>
              <div class="mt-6 inline-flex items-center rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-100">
                {{ footerLabels.availability }}
              </div>
            </div>
          </div>

          <div>
            <p class="text-sm font-semibold tracking-[0.18em] text-slate-100">
              {{ footerLabels.navigation }}
            </p>
            <nav class="mt-5 grid gap-4 text-[1.05rem] text-slate-400">
              <NuxtLink :to="`/${locale}`" class="transition-colors duration-300 hover:text-white">{{ ui.nav.home }}</NuxtLink>
              <NuxtLink :to="`/${locale}/products`" class="transition-colors duration-300 hover:text-white">{{ ui.nav.products }}</NuxtLink>
              <NuxtLink :to="`/${locale}/solutions`" class="transition-colors duration-300 hover:text-white">{{ ui.nav.solutions }}</NuxtLink>
              <NuxtLink :to="`/${locale}/about`" class="transition-colors duration-300 hover:text-white">{{ ui.nav.about }}</NuxtLink>
              <NuxtLink :to="`/${locale}/contact`" class="transition-colors duration-300 hover:text-white">{{ ui.nav.contact }}</NuxtLink>
            </nav>
          </div>

          <div>
            <p class="text-sm font-semibold tracking-[0.18em] text-slate-100">
              {{ footerLabels.products }}
            </p>
            <div class="mt-5 flex flex-wrap gap-3">
              <span
                v-for="item in footerCategories"
                :key="item"
                class="rounded-full border border-slate-700 bg-slate-800/70 px-4 py-2 text-sm text-slate-300 shadow-[0_8px_20px_rgba(15,23,42,0.18)] transition-colors duration-300 hover:border-blue-400/60 hover:text-white"
              >
                {{ item }}
              </span>
            </div>
          </div>

          <div class="lg:min-w-0">
            <p class="text-sm font-semibold tracking-[0.18em] text-slate-100">
              {{ footerLabels.contact }}
            </p>
            <div class="mt-5 grid gap-5 text-[1.05rem] text-slate-300">
              <div class="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4">
                <span class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/70 text-blue-300">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.11.37 2.3.56 3.52.56a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.99a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.22.19 2.41.56 3.52a1 1 0 0 1-.24 1.01l-2.2 2.27Z" />
                  </svg>
                </span>
                <div class="grid gap-2 min-w-0">
                  <a
                    v-for="phone in content.site.phones"
                    :key="phone"
                    :href="`tel:${phone}`"
                    class="whitespace-nowrap transition-colors duration-300 hover:text-white"
                  >
                    {{ phone }}
                  </a>
                </div>
              </div>

              <div class="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4">
                <span class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/70 text-blue-300">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M4 5h16a2 2 0 0 1 2 2v.35l-10 6.25L2 7.35V7a2 2 0 0 1 2-2Zm18 4.65V17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.65l9.47 5.92a1 1 0 0 0 1.06 0L22 9.65Z" />
                  </svg>
                </span>
                <div class="grid gap-2 min-w-0">
                  <a
                    v-for="email in content.site.emails"
                    :key="email"
                    :href="`mailto:${email}`"
                    class="whitespace-nowrap text-[0.98rem] transition-colors duration-300 hover:text-white"
                  >
                    {{ email }}
                  </a>
                </div>
              </div>

              <div class="grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4 leading-7">
                <span class="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-700 bg-slate-800/70 text-blue-300">
                  <svg viewBox="0 0 24 24" class="h-4 w-4 fill-current" aria-hidden="true">
                    <path d="M12 2a7 7 0 0 1 7 7c0 4.78-5.18 10.65-6.3 11.88a1 1 0 0 1-1.4 0C10.18 19.65 5 13.78 5 9a7 7 0 0 1 7-7Zm0 9.5A2.5 2.5 0 1 0 12 6.5a2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </span>
                <span class="max-w-[28rem] text-pretty">{{ content.site.address }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="relative mt-12 border-t border-slate-800/90 pt-8">
          <div class="flex flex-col gap-3 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
            <p>{{ footerLabels.copyright }} {{ content.site.companyNameEn }} 2026</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

