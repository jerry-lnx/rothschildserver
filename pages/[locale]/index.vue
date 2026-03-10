<script setup lang="ts">
import { brandLogoMap, productGalleryImages, scenarioImageMap } from '~/data/media'

const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))

const productCards = computed(() => content.value.home.categories.slice(0, 8))
const categoryImages = productGalleryImages

const scenarioCardsByLocale = {
  zh: [
    {
      title: '数据中心扩容采购',
      desc: '按机柜与节点批次组织配件清单，支持分批到货与阶段验收。',
      image: scenarioImageMap.expansion
    },
    {
      title: 'AI 算力节点上线',
      desc: '围绕 GPU、网卡、光模块与存储形成配套供货组合，缩短项目上线周期。',
      image: scenarioImageMap.ai
    },
    {
      title: '运维替换与长期补货',
      desc: '适用于故障替换、常态维护和年度补货计划，降低停机与断供风险。',
      image: scenarioImageMap.maintenance
    }
  ],
  en: [
    {
      title: 'Data Center Expansion',
      desc: 'Component lists by rack and node batches with phased receiving and acceptance.',
      image: scenarioImageMap.expansion
    },
    {
      title: 'AI Compute Node Launch',
      desc: 'Coordinated supply for GPU, NIC, optical, and storage to shorten launch cycles.',
      image: scenarioImageMap.ai
    },
    {
      title: 'Maintenance and Replenishment',
      desc: 'Built for replacement, operations, and scheduled recurring supply.',
      image: scenarioImageMap.maintenance
    }
  ],
  ru: [
    {
      title: 'Закупка для расширения дата-центра',
      desc: 'Поставка комплектующих партиями по стойкам и узлам с поэтапной приемкой.',
      image: scenarioImageMap.expansion
    },
    {
      title: 'Запуск AI-узлов',
      desc: 'Комплексная поставка GPU, сетевых карт, оптики и хранения для более быстрого запуска.',
      image: scenarioImageMap.ai
    },
    {
      title: 'Замена и регулярное пополнение',
      desc: 'Подходит для аварийной замены, текущей эксплуатации и планового пополнения.',
      image: scenarioImageMap.maintenance
    }
  ]
} as const

const assuranceItemsByLocale = {
  zh: [
    { title: '型号匹配', desc: '按平台代际、接口与兼容要求确认型号，减少错配。' },
    { title: '价格策略', desc: '支持按批次和周期采购，帮助控制整体采购成本。' },
    { title: '交付协同', desc: '明确到货节点、批次计划与签收节奏，方便项目跟进。' },
    { title: '持续补货', desc: '针对长期运维场景建立补货计划，保障供货连续性。' }
  ],
  en: [
    { title: 'Model Matching', desc: 'Check platform generation, interface, and compatibility before ordering.' },
    { title: 'Pricing Strategy', desc: 'Batch and cycle-based procurement to optimize total cost.' },
    { title: 'Delivery Coordination', desc: 'Clear milestones for arrival, batch planning, and receiving.' },
    { title: 'Recurring Supply', desc: 'Planned replenishment for long-cycle maintenance operations.' }
  ],
  ru: [
    { title: 'Подбор моделей', desc: 'Проверка поколения платформы, интерфейсов и совместимости до заказа.' },
    { title: 'Ценовая стратегия', desc: 'Закупка партиями и циклами для контроля совокупной стоимости.' },
    { title: 'Координация поставки', desc: 'Прозрачные этапы по срокам, партиям и приемке.' },
    { title: 'Регулярное пополнение', desc: 'План поставки для долгосрочной эксплуатации и замены.' }
  ]
} as const

const quoteStripByLocale = {
  zh: {
    eyebrow: '即刻联系',
    title: '想更快了解我们的供货能力与合作方式？',
    desc: '欢迎把您的型号方向、采购计划或项目需求发给我们，我们会尽快与您沟通适合的供货与对接方式。',
    primary: '提交询价',
  },
  en: {
    eyebrow: 'Quick Contact',
    title: 'Want to get to know us faster?',
    desc: 'Send the model, quantity, timing, or project background. We will assess supply availability and respond quickly.',
    primary: 'Send Inquiry',
  },
  ru: {
    eyebrow: 'Быстрый контакт',
    title: 'Хотите быстрее понять, как мы работаем?',
    desc: 'Отправьте модели, количество, сроки или описание проекта, и мы быстро оценим возможность поставки и свяжемся с вами.',
    primary: 'Отправить запрос',
  }
} as const

const brandCards = computed(() =>
  content.value.home.brands.map((brand) => ({
    name: brand,
    logo: brandLogoMap[brand] ?? ''
  }))
)

const scenarioCards = computed(() => scenarioCardsByLocale[locale.value])
const assuranceItems = computed(() => assuranceItemsByLocale[locale.value])
const quoteStrip = computed(() => quoteStripByLocale[locale.value])

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${content.value.site.companyName} | ${content.value.site.tagline}`,
  meta: [
    {
      name: 'description',
      content: content.value.home.hero.description
    }
  ]
}))
</script>

<template>
  <div>
    <HeroSection :content="content.home.hero" :locale="locale" />

    <section class="-mt-20 pb-8 md:-mt-24 md:pb-10">
      <div class="shell">
        <div class="module-surface reveal-up relative shadow-[0_28px_56px_rgba(148,163,184,0.18)] before:pointer-events-none before:absolute before:inset-x-12 before:-top-8 before:h-16 before:rounded-full before:bg-white/65 before:blur-3xl">
          <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div class="max-w-3xl">
              <SectionTitle
                :eyebrow="ui.sections.productsEyebrow"
                :title="ui.sections.productsTitle"
                :description="ui.sections.productsDescription"
                align="left"
              />
            </div>

            <div class="flex justify-start lg:justify-end">
              <NuxtLink
                :to="`/${locale}/products`"
                class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                <span>全部产品</span>
                <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4 stroke-current" aria-hidden="true">
                  <path d="M4.75 10H15.25" stroke-width="1.7" stroke-linecap="round" />
                  <path d="M10.75 5.5L15.25 10L10.75 14.5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <div class="stagger-grid mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <article
              v-for="(item, index) in productCards"
              :key="item.title"
              class="sheen-card group flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-0 shadow-[0_14px_28px_rgba(148,163,184,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(148,163,184,0.16)]"
            >
              <div class="relative h-44 overflow-hidden sm:h-48">
                <img
                  :src="categoryImages[index % categoryImages.length]"
                  :alt="item.title"
                  class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/72 via-slate-900/24 to-transparent" />
                <div class="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <p class="text-lg font-semibold text-white sm:text-xl">{{ item.title }}</p>
                </div>
              </div>
              <div class="flex flex-1 flex-col p-5 sm:p-6">
                <p class="min-h-[4.5rem] text-sm leading-7 text-slate-600">{{ item.description }}</p>
                <div class="mt-4 flex flex-wrap gap-2">
                  <span
                    v-for="highlight in item.highlights"
                    :key="`${item.title}-${highlight}`"
                    class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {{ highlight }}
                  </span>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-divider section-gap pt-4">
      <div class="shell">
        <div class="module-surface reveal-up">
          <div class="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div class="max-w-3xl">
              <SectionTitle
                :eyebrow="ui.sections.solutionsEyebrow"
                :title="ui.sections.solutionsTitle"
                :description="ui.sections.solutionsDescription"
                align="left"
              />
            </div>

            <div class="flex justify-start lg:justify-end">
              <NuxtLink
                :to="`/${locale}/solutions`"
                class="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
              >
                <span>更多场景</span>
                <svg viewBox="0 0 20 20" fill="none" class="h-4 w-4 stroke-current" aria-hidden="true">
                  <path d="M4.75 10H15.25" stroke-width="1.7" stroke-linecap="round" />
                  <path d="M10.75 5.5L15.25 10L10.75 14.5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </NuxtLink>
            </div>
          </div>

          <div class="stagger-grid mt-5 grid gap-4 lg:grid-cols-3">
            <article
              v-for="scenario in scenarioCards"
              :key="scenario.title"
              class="group overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white"
            >
              <div class="h-44 overflow-hidden">
                <img :src="scenario.image" :alt="scenario.title" class="h-full w-full object-cover transition duration-700 group-hover:scale-105">
              </div>
              <div class="p-5">
                <h3 class="text-lg font-semibold text-slate-900">{{ scenario.title }}</h3>
                <p class="mt-3 text-sm leading-7 text-slate-600">{{ scenario.desc }}</p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-divider section-gap pt-2">
      <div class="shell">
        <div class="module-surface reveal-up overflow-hidden">
          <SectionTitle
            :eyebrow="ui.sections.brandsEyebrow"
            :title="ui.sections.brandsTitle"
            :description="ui.sections.brandsDescription"
            align="left"
          />

          <div class="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div
              v-for="brand in brandCards"
              :key="brand.name"
              class="flex h-20 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-5 shadow-sm"
            >
              <img
                v-if="brand.logo"
                :src="brand.logo"
                :alt="brand.name"
                class="h-8 w-8 shrink-0 object-contain"
                loading="lazy"
              >
              <span class="text-xl font-semibold tracking-[0.04em] text-slate-800">{{ brand.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section-divider section-gap pt-4">
      <div class="shell">
        <div class="module-surface reveal-up">
          <SectionTitle
            :eyebrow="ui.sections.capabilitiesEyebrow"
            :title="ui.sections.capabilitiesTitle"
            align="left"
          />
          <div class="stagger-grid mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article
              v-for="item in assuranceItems"
              :key="item.title"
              class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <p class="text-lg font-semibold text-slate-900">{{ item.title }}</p>
              <p class="mt-3 text-sm leading-7 text-slate-600">{{ item.desc }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section-divider section-gap pt-2">
      <div class="shell">
        <div class="page-hero reveal-up-delayed border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#eef4ff)] text-slate-900">
          <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ quoteStrip.eyebrow }}</p>
              <h2 class="mt-3 text-xl font-semibold text-slate-900 sm:text-2xl">{{ quoteStrip.title }}</h2>
              <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{{ quoteStrip.desc }}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                :to="`/${locale}/contact`"
                class="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {{ content.home.hero.secondaryCta }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
