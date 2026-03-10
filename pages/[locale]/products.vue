<script setup lang="ts">
import { productGalleryImages } from '~/data/media'

const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))
const productSlugs = getProductSlugs()

const pageCopyByLocale = {
  zh: {
    pageTitle: '产品中心',
    heroTitle: '常供服务器配件与整机品类',
    heroDescription: '从核心配件到整机平台，按常见采购型号与交付需求整理出更便于沟通的供货范围。',
    heroMetrics: ['服务器核心配件', '整机与平台配置', '兼容替代与补货'],
    ctaTitle: '即刻联系',
    ctaDescription: '直接把型号、数量和交期发给我们，我们会尽快评估供货可行性并与您对接。'
  },
  en: {
    pageTitle: 'Products',
    heroTitle: 'Server components and systems in regular supply',
    heroDescription: 'From core parts to server platforms, the offering is organized around common sourcing models and delivery needs.',
    heroMetrics: ['Core server components', 'Server systems and platform configs', 'Compatibility replacements and replenishment'],
    ctaTitle: 'Quick Contact',
    ctaDescription: 'Send the model, quantity, and timing. We will assess supply availability and respond quickly.'
  },
  ru: {
    pageTitle: 'Продукты',
    heroTitle: 'Основные категории серверных комплектующих и серверов',
    heroDescription: 'От ключевых комплектующих до серверных платформ, ассортимент собран вокруг типовых закупочных моделей и поставок.',
    heroMetrics: ['Ключевые серверные комплектующие', 'Серверы и платформенные конфигурации', 'Замены по совместимости и пополнение'],
    ctaTitle: 'Быстрый контакт',
    ctaDescription: 'Отправьте модели, количество и сроки, и мы быстро оценим возможность поставки.'
  }
} as const

const pageCopy = computed(() => pageCopyByLocale[locale.value])

const productCards = computed(() =>
  content.value.products.map((item, index) => ({
    ...item,
    slug: productSlugs[index] ?? productSlugs[0],
    image: productGalleryImages[index % productGalleryImages.length]
  }))
)

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
          <div class="stagger-grid grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <NuxtLink
              v-for="item in productCards"
              :key="item.slug"
              :to="`/${locale}/products/${item.slug}`"
              class="sheen-card card-lift group flex h-full flex-col overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white shadow-[0_12px_24px_rgba(148,163,184,0.1)]"
            >
              <div class="relative h-44 overflow-hidden">
                <img
                  :src="item.image"
                  :alt="item.title"
                  class="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900/72 via-slate-900/18 to-transparent" />
                <div class="absolute inset-x-0 bottom-0 p-4">
                  <p class="text-lg font-semibold text-white">{{ item.title }}</p>
                </div>
              </div>

              <div class="flex flex-1 flex-col p-5">
                <p class="min-h-[4rem] text-sm leading-7 text-slate-600">{{ item.description }}</p>
                <div class="flex flex-wrap gap-2 pt-4">
                  <span
                    v-for="highlight in item.highlights"
                    :key="highlight"
                    class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700"
                  >
                    {{ highlight }}
                  </span>
                </div>
              </div>
            </NuxtLink>
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
