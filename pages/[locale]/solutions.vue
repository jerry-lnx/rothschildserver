<script setup lang="ts">
import { scenarioImageMap } from '~/data/media'
// 当前语言与内容
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))

// 解决方案页局部文案与补充信息
const solutionsPageCopyByLocale = {
  zh: {
    pageTitle: '解决方案',
    heroTitle: '覆盖常见采购与交付场景',
    heroDescription: '围绕扩容、替换、补货和项目供货等常见需求，帮助客户更快找到合适的配件与供货方式。',
    heroAlt: '服务器供货与交付场景',
    metrics: ['围绕采购与交付落地', '适配扩容、替换、补货需求', '支持多品牌组合供货'],
    rightTitle: '适用场景',
    rightItems: ['数据中心扩容', 'AI 算力节点建设', '集成商项目代采', '年度框架供货'],
    stripTitle: '需要按项目或场景整理采购清单？',
    stripDescription: '可以先按您的业务场景沟通，我们再给出更贴近实际交付的配件组合与供应建议。',
    stripCta: '立即沟通'
  },
  en: {
    pageTitle: 'Solutions',
    heroTitle: 'Solutions for common sourcing and delivery scenarios',
    heroDescription: 'Built around expansion, replacement, replenishment, and project supply needs so customers can match parts and supply methods faster.',
    heroAlt: 'Server supply and delivery scenario',
    metrics: ['Built around practical procurement execution', 'Suitable for expansion, replacement, and replenishment', 'Supports multi-brand combined supply'],
    rightTitle: 'Typical Scenarios',
    rightItems: ['Data center expansion', 'AI compute node buildout', 'Integrator sourcing', 'Annual framework supply'],
    stripTitle: 'Need a sourcing plan built around your project scenario?',
    stripDescription: 'Start with the business context and we will match a more practical component combination and supply suggestion.',
    stripCta: 'Start Discussion'
  },
  ru: {
    pageTitle: 'Решения',
    heroTitle: 'Решения для типовых сценариев закупки и поставки',
    heroDescription: 'Ориентировано на расширение, замену, пополнение и проектные поставки, чтобы быстрее подобрать нужные комплектующие и формат поставки.',
    heroAlt: 'Сценарий поставки серверных комплектующих',
    metrics: ['Основано на практическом процессе закупки', 'Подходит для расширения, замены и пополнения', 'Поддержка комбинированных поставок разных брендов'],
    rightTitle: 'Типовые сценарии',
    rightItems: ['Расширение дата-центра', 'Запуск AI-узлов', 'Закупка для интеграторов', 'Годовая рамочная поставка'],
    stripTitle: 'Нужен план закупки под ваш проектный сценарий?',
    stripDescription: 'Опишите задачу, и мы предложим более практичную комбинацию комплектующих и вариант поставки.',
    stripCta: 'Обсудить'
  }
} as const

const pageCopy = computed(() => solutionsPageCopyByLocale[locale.value])

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
            :eyebrow="ui.sections.solutionsEyebrow"
            :title="pageCopy.heroTitle"
            :description="pageCopy.heroDescription"
            align="left"
          />

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in pageCopy.metrics"
              :key="item"
              class="metric-chip"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="grid gap-4">
          <div class="overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-[0_16px_34px_rgba(148,163,184,0.12)]">
            <img
              :src="scenarioImageMap.expansion"
              :alt="pageCopy.heroAlt"
              class="h-64 w-full object-cover sm:h-72"
            >
          </div>
          <div class="soft-panel">
            <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.rightTitle }}</p>
            <div class="mt-4 grid gap-3 sm:grid-cols-2">
              <div
                v-for="item in pageCopy.rightItems"
                :key="item"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="module-surface reveal-up">
        <SectionTitle
          :eyebrow="ui.sections.solutionsEyebrow"
          :title="ui.sections.solutionsTitle"
          :description="ui.sections.solutionsDescription"
          align="left"
        />

        <div class="stagger-grid mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          <article
            v-for="item in content.solutions"
            :key="item.title"
            class="card-lift rounded-[1.35rem] border border-slate-200 bg-white p-6 shadow-[0_10px_26px_rgba(148,163,184,0.08)]"
          >
            <div class="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M4 10h12" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
                <path d="M10 4v12" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-900">{{ item.title }}</h3>
            <p class="mt-3 text-sm leading-7 text-slate-600">{{ item.description }}</p>
          </article>
        </div>
      </section>

      <section class="page-hero reveal-up-delayed">
        <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.forms.inquiryTitle }}</p>
            <h2 class="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">{{ pageCopy.stripTitle }}</h2>
            <p class="mt-4 max-w-3xl text-base leading-8 text-slate-600">{{ pageCopy.stripDescription }}</p>
          </div>
          <NuxtLink
            :to="`/${locale}/contact`"
            class="rounded-full bg-slate-900 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            {{ pageCopy.stripCta }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
