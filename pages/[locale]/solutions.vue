<script setup lang="ts">
import { scenarioImageMap, aboutImageMap } from '~/data/media'

const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))

const pageCopyByLocale = {
  zh: {
    pageTitle: '解决方案',
    heroTitle: '围绕采购与交付场景组织方案',
    heroDescription: '把扩容、替换、补货和项目交付中常见的问题，整理成更容易落地执行的供货思路。',
    heroMetrics: ['扩容与替换方案', '项目交付配套', '场景化供货路径'],
    ctaTitle: '即刻联系',
    ctaDescription: '告诉我们当前项目背景、型号范围和交付节奏，我们会给出更贴近实际执行的建议。'
  },
  en: {
    pageTitle: 'Solutions',
    heroTitle: 'Solutions organized around sourcing and delivery scenarios',
    heroDescription: 'Common needs like expansion, replacement, replenishment, and project delivery are shaped into more practical supply paths.',
    heroMetrics: ['Expansion and replacement plans', 'Project delivery support', 'Scenario-based supply paths'],
    ctaTitle: 'Quick Contact',
    ctaDescription: 'Share the project context, model range, and delivery rhythm. We will suggest a more practical supply approach.'
  },
  ru: {
    pageTitle: 'Решения',
    heroTitle: 'Решения под типовые сценарии закупки и поставки',
    heroDescription: 'Типовые задачи вроде расширения, замены, пополнения и проектной поставки мы собираем в более практичный формат исполнения.',
    heroMetrics: ['Решения для расширения и замены', 'Поддержка проектной поставки', 'Сценарные пути снабжения'],
    ctaTitle: 'Быстрый контакт',
    ctaDescription: 'Опишите проект, диапазон моделей и сроки, и мы предложим практичный вариант поставки.'
  }
} as const

const solutionImages = [
  scenarioImageMap.expansion,
  scenarioImageMap.ai,
  scenarioImageMap.maintenance,
  aboutImageMap.supply,
  scenarioImageMap.expansion,
  aboutImageMap.team
]

const pageCopy = computed(() => pageCopyByLocale[locale.value])

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${content.value.site.companyName} | ${pageCopy.value.pageTitle}`
}))
</script>

<template>
  <section class="section-gap inner-page-section">
    <div class="shell space-y-7">
      <section class="page-stack reveal-up">
        <div class="page-stack-hero grid-glow">
          <div class="page-intro">
            <SectionTitle
              :eyebrow="pageCopy.pageTitle"
              :title="pageCopy.heroTitle"
              :description="pageCopy.heroDescription"
              align="center"
              tag="h1"
              size="compact"
            />

            <div class="page-intro-metrics">
              <div
                v-for="item in pageCopy.heroMetrics"
                :key="item"
                class="metric-chip"
              >
                {{ item }}
              </div>
            </div>
          </div>

          <div class="page-stack-fade" />
        </div>

        <div class="page-stack-body">
          <div class="stagger-grid grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="(item, index) in content.solutions"
              :key="item.title"
              class="card-lift overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_10px_22px_rgba(148,163,184,0.08)]"
            >
              <div class="relative h-44 overflow-hidden">
                <img
                  :src="solutionImages[index % solutionImages.length]"
                  :alt="item.title"
                  class="h-full w-full object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/72 via-slate-900/18 to-transparent" />
                <div class="absolute inset-x-0 bottom-0 p-4">
                  <h2 class="text-lg font-semibold text-white">{{ item.title }}</h2>
                </div>
              </div>

              <div class="p-5">
                <p class="text-sm leading-7 text-slate-600">{{ item.description }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="page-cta reveal-up-delayed">
        <div class="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.ctaTitle }}</p>
            <h2 class="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{{ content.contact.title }}</h2>
            <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{{ pageCopy.ctaDescription }}</p>
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
