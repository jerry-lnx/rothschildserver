<script setup lang="ts">
import { aboutImageMap } from '~/data/media'

const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))

const pageCopyByLocale = {
  zh: {
    pageTitle: '关于我们',
    heroTitle: '专注服务器配件采购与稳定供货',
    heroDescription: '围绕企业采购、系统集成与项目交付，提供更稳的服务器配件与整机供应支持。',
    heroMetrics: ['企业采购协同', '多品牌资源整合', '稳定供货节奏'],
    introEyebrow: '公司简介',
    introTitle: '深圳罗斯柴智算科技有限公司',
    introDescription: '深圳罗斯柴智算科技有限公司专注服务器配件采购与供应，服务企业采购团队、系统集成商与数据中心项目，强调稳定供货、兼容适配与交付效率。我们更关注真实采购链路里的执行问题，包括型号确认、替代料判断、品牌资源协调、批量交付节奏与后续补货衔接。',
    introSupplement: '围绕常见服务器平台、核心配件与整机需求，我们以更直接的沟通方式协助客户缩短确认周期，让采购、交付与持续供货更顺畅。',
    summaryTitle: '即刻联系',
    summaryDescription: '如果您想进一步了解我们的业务范围、供货方式和合作细节，可以直接联系我们。'
  },
  en: {
    pageTitle: 'About',
    heroTitle: 'Focused on server component sourcing and stable supply',
    heroDescription: 'Built for enterprise sourcing, system integration, and project delivery with steadier component and server supply.',
    heroMetrics: ['Enterprise sourcing coordination', 'Multi-brand resource integration', 'Stable supply rhythm'],
    introEyebrow: 'Company Profile',
    introTitle: 'ROTHSCHILDSERVER',
    introDescription: 'ROTHSCHILDSERVER focuses on server component procurement and supply for enterprise buyers, system integrators, and data center projects, with emphasis on stable availability, compatibility, and delivery efficiency. We pay more attention to the execution details inside real sourcing workflows, including model confirmation, replacement options, multi-brand coordination, and batch delivery rhythm.',
    introSupplement: 'Around common server platforms, core parts, and complete systems, we work in a more direct way to shorten confirmation cycles and make sourcing, delivery, and replenishment smoother.',
    summaryTitle: 'Quick Contact',
    summaryDescription: 'If you want to know more about our business scope, supply approach, and cooperation details, contact us directly.'
  },
  ru: {
    pageTitle: 'О компании',
    heroTitle: 'Специализация на закупке серверных комплектующих и стабильной поставке',
    heroDescription: 'Мы работаем под корпоративные закупки, интеграцию и проектные поставки, обеспечивая более стабильное снабжение комплектующими и серверами.',
    heroMetrics: ['Координация корпоративных закупок', 'Интеграция мультибрендовых ресурсов', 'Стабильный ритм поставки'],
    introEyebrow: 'О компании',
    introTitle: 'ROTHSCHILDSERVER',
    introDescription: 'ROTHSCHILDSERVER специализируется на закупке и поставке серверных комплектующих для корпоративных заказчиков, интеграторов и проектов дата-центров, делая упор на стабильность поставки, совместимость и эффективность исполнения. Мы больше фокусируемся на практической стороне закупки: подтверждении моделей, подборе замен, координации брендов и ритме оптовой поставки.',
    introSupplement: 'По серверным платформам, ключевым комплектующим и системам в сборе мы помогаем сократить цикл согласования и выстроить более ровную закупку, поставку и последующее пополнение.',
    summaryTitle: 'Быстрый контакт',
    summaryDescription: 'Если вы хотите подробнее узнать о нашей сфере работы, формате поставки и сотрудничества, свяжитесь с нами напрямую.'
  }
} as const

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
          <div class="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
            <div>
              <p class="page-body-lead">{{ pageCopy.introEyebrow }}</p>
              <h2 class="mt-3 text-[1.55rem] font-semibold leading-tight text-slate-950 sm:text-[1.85rem]">
                {{ content.site.companyName }}
              </h2>
              <p class="mt-4 text-[0.98rem] leading-8 text-slate-600">
                {{ pageCopy.introDescription }}
              </p>
              <p class="mt-4 text-[0.98rem] leading-8 text-slate-600">
                {{ pageCopy.introSupplement }}
              </p>

              <div class="mt-6 grid gap-4 lg:grid-cols-3">
                <div
                  v-for="(item, index) in content.about.pillars"
                  :key="item.title"
                  class="group relative overflow-hidden rounded-[1.45rem] border border-slate-200 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(244,247,252,0.96))] p-5 shadow-[0_12px_24px_rgba(148,163,184,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(148,163,184,0.12)]"
                >
                  <div class="pointer-events-none absolute inset-x-0 top-0 h-20 bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.14),transparent_58%)] opacity-80" />
                  <div class="relative flex items-center gap-3">
                    <span
                      class="flex h-9 w-9 shrink-0 items-center justify-center rounded-[1rem] shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]"
                      :class="[
                        index === 0 && 'border border-emerald-100 bg-[linear-gradient(180deg,#effcf5,#dcfce7)] text-emerald-600',
                        index === 1 && 'border border-sky-100 bg-[linear-gradient(180deg,#eff6ff,#dbeafe)] text-sky-600',
                        index === 2 && 'border border-amber-100 bg-[linear-gradient(180deg,#fff8eb,#fef3c7)] text-amber-600'
                      ]"
                    >
                      <span
                        class="h-2 w-2 rounded-full"
                        :class="[
                          index === 0 && 'bg-emerald-500 shadow-[0_0_0_5px_rgba(34,197,94,0.12)]',
                          index === 1 && 'bg-sky-500 shadow-[0_0_0_5px_rgba(14,165,233,0.12)]',
                          index === 2 && 'bg-amber-500 shadow-[0_0_0_5px_rgba(245,158,11,0.14)]'
                        ]"
                      />
                    </span>
                    <h3 class="min-w-0 text-[1rem] font-semibold leading-none text-slate-900 whitespace-nowrap">
                      {{ item.title }}
                    </h3>
                  </div>
                  <p class="relative mt-4 text-sm leading-7 text-slate-600">
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div class="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-[0_14px_30px_rgba(148,163,184,0.12)]">
                <img :src="aboutImageMap.team" :alt="content.site.companyName" class="h-[31rem] w-full object-cover">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="page-cta reveal-up-delayed">
        <div class="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.summaryTitle }}</p>
            <h2 class="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{{ content.contact.title }}</h2>
            <p class="mt-3 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">{{ pageCopy.summaryDescription }}</p>
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
