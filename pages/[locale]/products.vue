<script setup lang="ts">
// 当前语言、页面内容与产品 slug
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))
const productSlugs = getProductSlugs()

// 页面局部文案：用于顶部引导区和底部转化区
const productsPageCopyByLocale = {
  zh: {
    pageTitle: '产品中心',
    heroTitle: '常供服务器配件与整机品类',
    heroDescription: '面向企业采购、集成商与数据中心项目，集中展示当前常见供货品类，方便快速判断是否匹配采购需求。',
    heroMetrics: ['覆盖核心服务器配件', '支持批量采购与持续补货', '适配替换料与兼容校验'],
    heroCardTitle: '供货范围',
    heroCardItems: ['CPU / GPU / 内存 / SSD / HDD', '网卡 / 光模块 / 服务器整机', '可按型号、品牌、代际快速筛选']
  },
  en: {
    pageTitle: 'Products',
    heroTitle: 'Server components and system categories in regular supply',
    heroDescription: 'Built for enterprise buyers, integrators, and data center projects to quickly review currently available product categories.',
    heroMetrics: ['Covers core server components', 'Supports volume procurement and recurring supply', 'Works with replacement and compatibility checks'],
    heroCardTitle: 'Supply Scope',
    heroCardItems: ['CPU / GPU / Memory / SSD / HDD', 'NIC / Optical / Server systems', 'Quick filtering by model, brand, and generation']
  },
  ru: {
    pageTitle: 'Продукты',
    heroTitle: 'Основные категории серверных комплектующих и серверов',
    heroDescription: 'Страница помогает корпоративным заказчикам и интеграторам быстро понять, какие категории продукции мы поставляем на постоянной основе.',
    heroMetrics: ['Покрытие ключевых серверных комплектующих', 'Поддержка оптовых закупок и регулярного пополнения', 'Подбор замен и проверка совместимости'],
    heroCardTitle: 'Ассортимент поставки',
    heroCardItems: ['CPU / GPU / Память / SSD / HDD', 'NIC / Оптика / Серверы', 'Быстрый подбор по модели, бренду и поколению']
  }
} as const

const pageCopy = computed(() => productsPageCopyByLocale[locale.value])

// 产品卡片数据：保持标题描述来源于数据层，slug 用于详情页跳转
const productCards = computed(() =>
  content.value.products.map((item, index) => ({
    ...item,
    slug: productSlugs[index] ?? productSlugs[0]
  }))
)

// 产品配图：后续可以直接替换为你的正式产品图
const productImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1400&q=80',
  'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1400&q=80'
]

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${content.value.site.companyName} | ${pageCopy.value.pageTitle}`
}))
</script>

<template>
  <section class="section-gap">
    <div class="shell space-y-8">
      <section class="page-hero grid-glow reveal-up grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <SectionTitle
            :eyebrow="ui.sections.productsEyebrow"
            :title="pageCopy.heroTitle"
            :description="pageCopy.heroDescription"
            align="left"
          />

          <div class="mt-8 grid gap-3 sm:grid-cols-3">
            <div
              v-for="item in pageCopy.heroMetrics"
              :key="item"
              class="metric-chip"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="soft-panel reveal-up-delayed">
          <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.heroCardTitle }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="item in pageCopy.heroCardItems"
              :key="item"
              class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
            >
              {{ item }}
            </div>
          </div>
          <NuxtLink
            :to="`/${locale}/contact`"
            class="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            {{ content.home.hero.secondaryCta }}
          </NuxtLink>
        </div>
      </section>

      <section class="module-surface reveal-up">
        <SectionTitle
          :eyebrow="ui.sections.productsEyebrow"
          :title="ui.sections.productsTitle"
          :description="ui.sections.productsDescription"
          align="left"
        />

        <div class="stagger-grid mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <NuxtLink
            v-for="(item, index) in productCards"
            :key="item.slug"
            :to="`/${locale}/products/${item.slug}`"
            class="sheen-card card-lift group overflow-hidden rounded-[1.35rem] border border-slate-200 bg-white shadow-[0_14px_30px_rgba(148,163,184,0.12)]"
          >
            <div class="relative h-48 overflow-hidden">
              <img
                :src="productImages[index % productImages.length]"
                :alt="item.title"
                class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-slate-900/72 via-slate-900/18 to-transparent" />
              <div class="absolute inset-x-0 bottom-0 p-5">
                <p class="text-lg font-semibold text-white">{{ item.title }}</p>
              </div>
            </div>

            <div class="p-5">
              <p class="text-sm leading-7 text-slate-600">{{ item.description }}</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span
                  v-for="highlight in item.highlights"
                  :key="highlight"
                  class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700"
                >
                  {{ highlight }}
                </span>
              </div>
              <p class="mt-5 text-sm font-semibold text-slate-900">{{ ui.productsPage.viewDetails }}</p>
            </div>
          </NuxtLink>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div class="module-surface reveal-up-delayed">
          <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.productsPage.processTitle }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="(item, index) in ui.productsPage.processSteps"
              :key="item"
              class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4"
            >
              <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                {{ index + 1 }}
              </div>
              <p class="text-sm text-slate-700">{{ item }}</p>
            </div>
          </div>
        </div>

        <div class="module-surface reveal-up-delayed">
          <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.productsPage.supportTitle }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="item in ui.productsPage.supportItems"
              :key="item"
              class="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
