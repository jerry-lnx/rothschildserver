<script setup lang="ts">
import { heroImage } from '~/data/media'
import type { HeroContent } from '~/types/content'

defineProps<{
  content: HeroContent
  locale: string
}>()

const route = useRoute()
const currentLocale = computed(() => normalizeLocale(route.path.split('/')[1]))
const ui = computed(() => getUiContent(currentLocale.value))

const heroPanelCopyByLocale = {
  zh: {
    eyebrow: '供货矩阵',
    title: '面向企业采购可直接落地',
    deliveryTag: '库存',
    deliveryTitle: '现货与期货组合供给',
    supportTag: '时效',
    supportTitle: '快速响应与交付'
  },
  en: {
    eyebrow: 'Supply Matrix',
    title: 'Enterprise Procurement Ready',
    deliveryTag: 'Stock',
    deliveryTitle: 'Spot and scheduled supply',
    supportTag: 'Lead Time',
    supportTitle: 'Fast response and delivery'
  },
  ru: {
    eyebrow: 'Матрица поставок',
    title: 'Готово к корпоративным закупкам',
    deliveryTag: 'Наличие',
    deliveryTitle: 'Склад и плановая поставка',
    supportTag: 'Сроки',
    supportTitle: 'Быстрый ответ и поставка'
  }
} as const

const heroPanelCopy = computed(() => heroPanelCopyByLocale[currentLocale.value])

const supplyCardsByLocale = {
  zh: [
    { label: '核心配件', value: 'CPU / GPU / 内存 / 网卡' },
    { label: '网络互联', value: '光模块 / NIC / 交换链路配套' },
    { label: '整机与存储', value: 'SSD / HDD / 服务器整机' }
  ],
  en: [
    { label: 'Core Parts', value: 'CPU / GPU / Memory / NIC' },
    { label: 'Interconnect', value: 'Optical / NIC / Link accessories' },
    { label: 'Systems', value: 'SSD / HDD / Server systems' }
  ],
  ru: [
    { label: 'Ключевые части', value: 'CPU / GPU / Память / NIC' },
    { label: 'Сетевое соединение', value: 'Оптика / NIC / Link accessories' },
    { label: 'Системы', value: 'SSD / HDD / Серверы' }
  ]
} as const

const supplyCards = computed(() => supplyCardsByLocale[currentLocale.value])
</script>

<template>
  <section class="relative isolate overflow-hidden">
    <div class="absolute inset-0">
      <img
        :src="heroImage"
        alt="Server hardware"
        class="hero-bg-zoom h-full w-full object-cover"
      >
      <div class="absolute inset-0 bg-[linear-gradient(108deg,rgba(2,6,23,0.82)_0%,rgba(2,6,23,0.64)_36%,rgba(2,6,23,0.26)_72%,rgba(2,6,23,0.14)_100%)]" />
    </div>

    <div class="pointer-events-none absolute -left-10 top-24 h-64 w-64 rounded-full bg-cyan-300/20 blur-3xl" />
    <div class="pointer-events-none absolute right-4 top-1/4 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
    <div class="pointer-events-none absolute bottom-12 left-1/3 h-40 w-40 rounded-full bg-white/8 blur-3xl" />

    <div class="relative">
      <div class="shell grid min-h-[100svh] items-center gap-8 py-10 md:min-h-[100svh] md:grid-cols-[1.08fr_0.92fr] md:py-12">
        <div class="reveal-up max-w-3xl text-white">
          <p class="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold tracking-[0.16em] text-white/90 backdrop-blur-sm sm:text-sm">
            {{ content.eyebrow }}
          </p>

          <h1 class="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-7xl">
            {{ content.title }}
          </h1>

          <p class="mt-5 max-w-2xl text-sm leading-7 text-slate-200 sm:text-lg sm:leading-8">
            {{ content.description }}
          </p>

          <div class="mt-7 flex flex-wrap gap-3 sm:gap-4">
            <NuxtLink
              :to="`/${locale}/products`"
              class="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-900 shadow-[0_10px_22px_rgba(15,23,42,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-100 sm:px-6 sm:py-3"
            >
              {{ content.primaryCta }}
            </NuxtLink>
            <NuxtLink
              :to="`/${locale}/contact`"
              class="rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20 sm:px-6 sm:py-3"
            >
              {{ content.secondaryCta }}
            </NuxtLink>
          </div>

          <div class="mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
            <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{{ ui.metrics.supply }}</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ ui.metrics.supplyDetail }}</p>
            </div>
            <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{{ ui.metrics.coverage }}</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ ui.metrics.coverageDetail }}</p>
            </div>
            <div class="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
              <p class="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">{{ ui.metrics.focus }}</p>
              <p class="mt-2 text-sm font-semibold text-white">{{ ui.metrics.focusDetail }}</p>
            </div>
          </div>
        </div>

        <div class="reveal-up-delayed hidden md:block">
          <div class="float-slow rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,rgba(15,23,42,0.82),rgba(15,23,42,0.74))] p-6 text-white shadow-[0_28px_60px_rgba(2,6,23,0.45)] backdrop-blur-sm">
            <p class="text-xs uppercase tracking-[0.26em] text-slate-300">{{ heroPanelCopy.eyebrow }}</p>
            <h2 class="mt-4 text-2xl font-semibold">{{ heroPanelCopy.title }}</h2>
            <div class="mt-6 space-y-3">
              <div
                v-for="item in supplyCards"
                :key="item.label"
                class="rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <p class="text-xs uppercase tracking-[0.2em] text-slate-300">{{ item.label }}</p>
                <p class="mt-1 text-sm text-white">{{ item.value }}</p>
              </div>
            </div>
            <div class="mt-6 grid grid-cols-2 gap-3">
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs uppercase tracking-[0.22em] text-slate-300">{{ heroPanelCopy.deliveryTag }}</p>
                <p class="mt-2 text-lg font-semibold">{{ heroPanelCopy.deliveryTitle }}</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p class="text-xs uppercase tracking-[0.22em] text-slate-300">{{ heroPanelCopy.supportTag }}</p>
                <p class="mt-2 text-lg font-semibold">{{ heroPanelCopy.supportTitle }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
