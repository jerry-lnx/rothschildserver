<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, FreeMode } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
// 解析当前语言参数
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))

// 拉取当前语言内容与 UI 文案
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))

// 首页产品展示数据
const productCards = computed(() => content.value.home.categories)

// 产品卡片配图（后续可替换为本地素材）
const categoryImages = [
  'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1540829917886-91ab031b1764?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1527430253228-e93688616381?auto=format&fit=crop&w=1400&q=80'
]

// 供货场景：保留对成交有帮助的真实采购场景
const scenarioCardsByLocale = {
  zh: [
    {
      title: '数据中心扩容采购',
      desc: '按机柜与节点批次组织配件清单，支持分批到货与阶段验收。',
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'AI 算力节点上线',
      desc: '围绕 GPU、网卡、光模块与存储形成配套供货组合，缩短项目上线周期。',
      image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: '运维替换与长期补货',
      desc: '适用于故障替换、常态维护和年度补货计划，降低停机与断供风险。',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1400&q=80'
    }
  ],
  en: [
    {
      title: 'Data Center Expansion',
      desc: 'Component lists by rack/node batches with phased receiving and acceptance.',
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'AI Compute Node Launch',
      desc: 'Coordinated supply for GPU, NIC, optical, and storage to shorten launch cycles.',
      image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Maintenance & Replenishment',
      desc: 'Built for replacement, operations, and scheduled recurring supply.',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1400&q=80'
    }
  ],
  ru: [
    {
      title: 'Расширение дата-центра',
      desc: 'Поставка партиями по стойкам и узлам с поэтапной приемкой.',
      image: 'https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Запуск AI-узлов',
      desc: 'Комплексная поставка GPU, сетевых и оптических модулей и хранения.',
      image: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1400&q=80'
    },
    {
      title: 'Замена и пополнение',
      desc: 'Сценарий для эксплуатации, аварийной замены и планового пополнения.',
      image: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1400&q=80'
    }
  ]
} as const

// 采购保障模块，强调可执行性
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
    { title: 'Подбор моделей', desc: 'Проверка платформы, интерфейсов и совместимости до размещения заказа.' },
    { title: 'Ценовая стратегия', desc: 'Закупка партиями и циклами для контроля совокупной стоимости.' },
    { title: 'Координация поставки', desc: 'Прозрачные этапы доставки, партий и приемки.' },
    { title: 'Регулярное пополнение', desc: 'План поставки для долгосрочной эксплуатации и замены.' }
  ]
} as const

// 首页询价模块文案
const quoteStripByLocale = {
  zh: {
    title: '有明确型号或采购清单？',
    desc: '可直接提交型号、数量与交付时间，我们会按企业采购方式快速跟进。',
    primary: '提交询价',
    secondary: '查看产品中心',
    eyebrow: '快速询价',
    lineOne: 'CPU / GPU / 网卡 / 光模块',
    lineTwo: 'SSD / HDD / 内存 / 服务器整机',
    lineThree: '支持批量采购与持续补货'
  },
  en: {
    title: 'Already have a model list or BOM?',
    desc: 'Send us models, quantities, and target delivery timing for a faster follow-up.',
    primary: 'Send Inquiry',
    secondary: 'Browse Products',
    eyebrow: 'Quick Inquiry',
    lineOne: 'CPU / GPU / NIC / Optical',
    lineTwo: 'SSD / HDD / Memory / Server',
    lineThree: 'Support bulk procurement and recurring supply'
  },
  ru: {
    title: 'Уже есть список моделей или BOM?',
    desc: 'Отправьте модели, количество и срок поставки для быстрого ответа.',
    primary: 'Отправить запрос',
    secondary: 'Смотреть продукты',
    eyebrow: 'Быстрый запрос',
    lineOne: 'CPU / GPU / NIC / Оптика',
    lineTwo: 'SSD / HDD / Память / Серверы',
    lineThree: 'Поддержка оптовых закупок и регулярных поставок'
  }
} as const

// 首页模块标题右侧说明卡：只服务首页视觉，不给内页复用
const homeSectionNotesByLocale = {
  zh: {
    products: '按常见采购判断路径梳理品类，先让客户快速知道您卖什么。',
    solutions: '围绕扩容、上线、替换三类高频场景组织内容，避免只剩概念描述。',
    capabilities: '从型号确认到持续补货，把采购支持能力拆成更容易理解的服务动作。',
    brands: '展示长期可协同的主流品牌生态，强调稳定供货而不是单次交易。'
  },
  en: {
    products: 'Organized around how buyers assess categories first: what is available and what fits.',
    solutions: 'Built around expansion, launch, and replacement instead of abstract messaging.',
    capabilities: 'Break down support from model confirmation to recurring replenishment.',
    brands: 'Showcase long-term brand coverage and supply continuity rather than one-off trading.'
  },
  ru: {
    products: 'Структура построена вокруг типового выбора категорий: что доступно и что подходит.',
    solutions: 'Содержание собрано по сценариям расширения, запуска и замены, а не вокруг абстрактных формулировок.',
    capabilities: 'Поддержка показана как понятные действия: от подбора моделей до регулярного пополнения.',
    brands: 'Блок подчеркивает охват ключевых брендов и стабильность поставок, а не разовые сделки.'
  }
} as const

// 品牌 logo 映射：优先使用稳定的图标源，便于后续替换成正式品牌素材
const brandLogoMap: Record<string, string> = {
  Intel: 'https://cdn.simpleicons.org/intel/2563eb',
  AMD: 'https://cdn.simpleicons.org/amd/2563eb',
  NVIDIA: 'https://cdn.simpleicons.org/nvidia/2563eb',
  Samsung: 'https://cdn.simpleicons.org/samsung/2563eb',
  Micron: 'https://cdn.simpleicons.org/microntechnology/2563eb',
  Broadcom: 'https://cdn.simpleicons.org/broadcom/2563eb',
  Seagate: 'https://cdn.simpleicons.org/seagate/2563eb',
  'Western Digital': 'https://cdn.simpleicons.org/westerndigital/2563eb'
}

const brandCards = computed(() =>
  content.value.home.brands.map((brand) => ({
    name: brand,
    logo: brandLogoMap[brand] ?? ''
  }))
)

// 品牌区改为分页自动轮播，保证用户能明确看到“在轮播”
const brandCarouselModules = [Autoplay, FreeMode]

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
          <div class="max-w-3xl">
            <SectionTitle
              :eyebrow="ui.sections.productsEyebrow"
              :title="ui.sections.productsTitle"
              :description="ui.sections.productsDescription"
              align="left"
            />
          </div>

          <div class="mt-5 flex justify-start sm:justify-end">
            <NuxtLink
              :to="`/${locale}/products`"
              class="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100"
            >
              {{ ui.nav.products }}
            </NuxtLink>
          </div>

          <div class="stagger-grid mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <article
              v-for="(item, index) in productCards"
              :key="item.title"
              class="sheen-card group overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white p-0 shadow-[0_14px_28px_rgba(148,163,184,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(148,163,184,0.16)]"
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
              <div class="p-5 sm:p-6">
                <p class="text-sm leading-7 text-slate-600">{{ item.description }}</p>
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
          <SectionTitle
            :eyebrow="ui.sections.solutionsEyebrow"
            :title="ui.sections.solutionsTitle"
            :description="ui.sections.solutionsDescription"
            align="left"
          />

          <div class="stagger-grid mt-8 grid gap-4 lg:grid-cols-3">
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
        <div class="module-surface reveal-up overflow-hidden">
          <SectionTitle
            :eyebrow="ui.sections.brandsEyebrow"
            :title="ui.sections.brandsTitle"
            :description="ui.sections.brandsDescription"
            align="left"
          />

          <div class="brand-marquee-wrap mt-8 overflow-hidden rounded-2xl bg-slate-50/80 py-5">
            <Swiper
              class="brand-swiper"
              :modules="brandCarouselModules"
              loop
              :loop-additional-slides="brandCards.length"
              slides-per-view="auto"
              :space-between="16"
              :speed="5200"
              :allow-touch-move="false"
              :free-mode="{ enabled: true, momentum: false }"
              :autoplay="{ delay: 0, disableOnInteraction: false, pauseOnMouseEnter: true }"
            >
              <SwiperSlide
                v-for="brand in brandCards"
                :key="brand.name"
                class="brand-swiper-slide"
              >
                <div class="flex h-20 items-center gap-4 rounded-2xl border border-slate-200 bg-white px-6 shadow-sm">
                  <img
                    v-if="brand.logo"
                    :src="brand.logo"
                    :alt="brand.name"
                    class="h-8 w-8 shrink-0 object-contain"
                    loading="lazy"
                  >
                  <span class="text-xl font-semibold tracking-[0.04em] text-slate-800">{{ brand.name }}</span>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </div>
    </section>

    <section class="section-divider section-gap pt-2">
      <div class="shell">
        <div class="page-hero reveal-up-delayed border border-slate-200 bg-[linear-gradient(135deg,#ffffff,#eef4ff)] text-slate-900">
          <div class="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p class="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">{{ quoteStrip.eyebrow }}</p>
              <h2 class="mt-3 text-2xl font-semibold sm:text-3xl">{{ quoteStrip.title }}</h2>
              <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{{ quoteStrip.desc }}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <NuxtLink
                :to="`/${locale}/contact`"
                class="rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                {{ quoteStrip.primary }}
              </NuxtLink>
              <NuxtLink
                :to="`/${locale}/products`"
                class="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50"
              >
                {{ quoteStrip.secondary }}
              </NuxtLink>
            </div>
          </div>

          <div class="mt-6 grid gap-3 md:grid-cols-3">
            <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">{{ quoteStrip.lineOne }}</div>
            <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">{{ quoteStrip.lineTwo }}</div>
            <div class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm">{{ quoteStrip.lineThree }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
