<script setup lang="ts">
// 当前语言与页面内容
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))

// 关于页局部文案：强调“我们是做服务器配件供货的”
const aboutPageCopyByLocale = {
  zh: {
    pageTitle: '关于我们',
    heroTitle: '专注服务器配件采购与稳定供货',
    heroDescription: '公司定位很明确，就是围绕服务器 CPU、GPU、内存、存储、网卡、光模块与整机，为企业采购和项目交付提供持续供货支持。',
    warehouseAlt: '仓储与供应链',
    operationsAlt: '服务器运维与交付',
    scopeTitle: '业务聚焦',
    scopeItems: ['核心服务器配件采购', '整机与平台配套供货', '批量补货与替换料支持'],
    valuesTitle: '合作特点',
    valuesItems: ['响应直接', '沟通链路短', '更适合真实采购执行']
  },
  en: {
    pageTitle: 'About',
    heroTitle: 'Focused on server component sourcing and stable supply',
    heroDescription: 'The company is centered on CPU, GPU, memory, storage, NIC, optical modules, and server systems for enterprise procurement and project execution.',
    warehouseAlt: 'Warehouse supply chain',
    operationsAlt: 'Server operations and delivery',
    scopeTitle: 'Business Focus',
    scopeItems: ['Core server component sourcing', 'Server systems and platform supply', 'Recurring replenishment and replacement support'],
    valuesTitle: 'How We Work',
    valuesItems: ['Direct response', 'Short communication chain', 'Closer to real procurement execution']
  },
  ru: {
    pageTitle: 'О компании',
    heroTitle: 'Специализация на закупке серверных комплектующих и стабильной поставке',
    heroDescription: 'Компания сфокусирована на CPU, GPU, памяти, системах хранения, сетевых картах, оптических модулях и серверах для корпоративных закупок и проектных поставок.',
    warehouseAlt: 'Склад и цепочка поставок',
    operationsAlt: 'Эксплуатация серверов и поставка',
    scopeTitle: 'Основное направление',
    scopeItems: ['Закупка ключевых серверных комплектующих', 'Поставка серверов и платформенных решений', 'Регулярное пополнение и поддержка замены'],
    valuesTitle: 'Формат работы',
    valuesItems: ['Быстрый отклик', 'Короткая цепочка коммуникации', 'Ориентация на практическую закупку']
  }
} as const

const pageCopy = computed(() => aboutPageCopyByLocale[locale.value])

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${content.value.site.companyName} | ${pageCopy.value.pageTitle}`
}))
</script>

<template>
  <section class="section-gap">
    <div class="shell space-y-8">
      <section class="page-hero grid-glow reveal-up grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <SectionTitle
            :eyebrow="ui.nav.about"
            :title="pageCopy.heroTitle"
            :description="pageCopy.heroDescription"
            align="left"
          />

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in pageCopy.valuesItems"
              :key="item"
              class="metric-chip"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          <div class="overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-[0_16px_34px_rgba(148,163,184,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1556075798-4825dfaaf498?auto=format&fit=crop&w=1200&q=80"
              :alt="pageCopy.warehouseAlt"
              class="h-48 w-full object-cover lg:h-56"
            >
          </div>
          <div class="overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-[0_16px_34px_rgba(148,163,184,0.12)]">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
              :alt="pageCopy.operationsAlt"
              class="h-48 w-full object-cover lg:h-56"
            >
          </div>
        </div>
      </section>

      <section class="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div class="module-surface reveal-up">
          <SectionTitle
            :eyebrow="pageCopy.scopeTitle"
            :title="content.site.companyName"
            :description="content.about.intro"
            align="left"
          />

          <div class="mt-8">
            <FeatureGrid :items="content.about.pillars" />
          </div>
        </div>

        <div class="module-surface reveal-up-delayed">
          <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.scopeTitle }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="item in pageCopy.scopeItems"
              :key="item"
              class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700"
            >
              {{ item }}
            </div>
          </div>

          <p class="mt-8 text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.valuesTitle }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="item in pageCopy.valuesItems"
              :key="`${item}-value`"
              class="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </section>

      <section class="page-hero reveal-up-delayed">
        <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.forms.inquiryTitle }}</p>
            <h2 class="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">{{ content.contact.title }}</h2>
            <p class="mt-4 max-w-3xl text-base leading-8 text-slate-600">{{ content.contact.description }}</p>
          </div>
          <NuxtLink
            :to="`/${locale}/contact`"
            class="rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            {{ content.home.hero.secondaryCta }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
