<script setup lang="ts">
// 路由参数：语言 + 产品分类 slug
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const slug = computed(() => route.params.category as string)

const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))
const productSlugs = getProductSlugs()
const detail = computed(() => getProductDetail(locale.value, slug.value))

// 产品详情主视觉图：先按分类映射占位图
const heroImageBySlug: Record<string, string> = {
  'server-cpu': 'https://images.unsplash.com/photo-1555617981-dac3880eac6e?auto=format&fit=crop&w=1400&q=80',
  'gpu-accelerators': 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=1400&q=80',
  'memory-modules': 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=1400&q=80',
  'enterprise-ssd': 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=80',
  'enterprise-hdd': 'https://images.unsplash.com/photo-1540829917886-91ab031b1764?auto=format&fit=crop&w=1400&q=80',
  'network-interface': 'https://images.unsplash.com/photo-1517420879524-86d64ac2f339?auto=format&fit=crop&w=1400&q=80',
  'optical-modules': 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&w=1400&q=80',
  'server-systems': 'https://images.unsplash.com/photo-1551808525-51a94da548ce?auto=format&fit=crop&w=1400&q=80'
}
const heroImage = computed(() => heroImageBySlug[slug.value] ?? heroImageBySlug['server-cpu'])

// 根据 slug 反查对应产品分类，用于读取分类标题和高亮标签
const category = computed(() => {
  const index = productSlugs.indexOf(slug.value)
  return index >= 0 ? content.value.products[index] : null
})

// 页面局部文案
const detailPageCopyByLocale = {
  zh: {
    notFound: '未找到产品分类',
    backPrefix: '返回',
    heroMetrics: ['可按型号快速确认', '支持批量采购', '支持长期补货'],
    stripTitle: '需要结合您的平台做兼容确认？',
    stripDescription: '如果您已有服务器平台、品牌偏好或替换场景，可以直接联系我们，我们会先从兼容和供货可行性开始判断。',
    stripCta: '发起询价'
  },
  en: {
    notFound: 'Product category not found',
    backPrefix: 'Back',
    heroMetrics: ['Fast confirmation by model', 'Supports volume procurement', 'Supports recurring supply'],
    stripTitle: 'Need compatibility confirmation for your current platform?',
    stripDescription: 'If you already have a server platform, preferred brand, or replacement scenario, contact us and we will start from compatibility and supply feasibility.',
    stripCta: 'Send Inquiry'
  },
  ru: {
    notFound: 'Категория продукта не найдена',
    backPrefix: 'Назад',
    heroMetrics: ['Быстрое подтверждение по модели', 'Поддержка оптовой закупки', 'Поддержка регулярного пополнения'],
    stripTitle: 'Нужно проверить совместимость с вашей платформой?',
    stripDescription: 'Если у вас уже есть серверная платформа, предпочтительный бренд или сценарий замены, свяжитесь с нами, и мы начнем с совместимости и доступности поставки.',
    stripCta: 'Отправить запрос'
  }
} as const

const pageCopy = computed(() => detailPageCopyByLocale[locale.value])

// slug 无效时返回 404
if (!detail.value || !category.value) {
  throw createError({
    statusCode: 404,
    statusMessage: pageCopy.value.notFound
  })
}

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${category.value?.title} | ${content.value.site.companyName}`,
  meta: [
    {
      name: 'description',
      content: detail.value?.heroDescription
    }
  ]
}))
</script>

<template>
  <section class="section-gap">
    <div class="shell space-y-8">
      <section class="page-hero grid-glow reveal-up grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
        <div>
          <NuxtLink
            :to="`/${locale}/products`"
            class="inline-flex items-center gap-2 text-sm font-semibold text-blue-700"
          >
            <span aria-hidden="true">←</span>
            <span>{{ ui.productDetail.backToProducts }}</span>
          </NuxtLink>

          <h1 class="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {{ detail?.heroTitle }}
          </h1>
          <p class="mt-5 max-w-3xl text-base leading-8 text-slate-600">
            {{ detail?.heroDescription }}
          </p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span
              v-for="highlight in category?.highlights"
              :key="highlight"
              class="rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs text-blue-700"
            >
              {{ highlight }}
            </span>
          </div>

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

        <div class="grid gap-4">
          <div class="overflow-hidden rounded-[1.6rem] border border-slate-200 shadow-[0_16px_34px_rgba(148,163,184,0.12)]">
            <img :src="heroImage" :alt="detail?.heroTitle" class="h-60 w-full object-cover sm:h-72">
          </div>

          <div class="soft-panel">
            <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.productDetail.specs }}</p>
            <div class="mt-4 grid gap-3">
              <div
                v-for="item in detail?.specs"
                :key="item"
                class="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="grid gap-6 lg:grid-cols-2">
        <div class="module-surface reveal-up-delayed p-5 sm:p-6">
          <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.productDetail.useCases }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="item in detail?.useCases"
              :key="item"
              class="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-700"
            >
              {{ item }}
            </div>
          </div>
        </div>

        <div class="module-surface reveal-up-delayed p-5 sm:p-6">
          <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ ui.productDetail.deliveryNotes }}</p>
          <div class="mt-5 grid gap-3">
            <div
              v-for="item in detail?.serviceNotes"
              :key="item"
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
