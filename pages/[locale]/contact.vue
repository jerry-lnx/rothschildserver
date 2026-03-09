<script setup lang="ts">
// 路由、内容与运行时配置
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))
const ui = computed(() => getUiContent(locale.value))
const runtimeConfig = useRuntimeConfig()

// 公司地图坐标：当前按深圳南山区默认展示
const mapCenter = {
  lat: 22.54286,
  lng: 113.95814
}

// 地图 iframe 地址
const mapFrameUrl = computed(() => {
  const left = mapCenter.lng - 0.018
  const right = mapCenter.lng + 0.018
  const top = mapCenter.lat + 0.012
  const bottom = mapCenter.lat - 0.012
  return `https://www.openstreetmap.org/export/embed.html?bbox=${left},${bottom},${right},${top}&layer=mapnik&marker=${mapCenter.lat},${mapCenter.lng}`
})

// 联系页局部文案
const contactPageCopyByLocale = {
  zh: {
    pageTitle: '联系我们',
    heroTitle: '直接提交询价或采购需求',
    heroDescription: '适合发送型号清单、品牌偏好、数量、交期与项目背景。您也可以先简单描述，我们再协助整理采购方向。',
    email: '邮箱',
    phone: '电话',
    address: '地址',
    mapTitle: '公司位置地图',
    metrics: ['支持配件与整机询价', '支持批量采购需求', '工作日尽快响应'],
    stepsTitle: '沟通建议',
    steps: ['先发型号与数量', '再确认交期与到货地', '最后细化品牌与兼容要求']
  },
  en: {
    pageTitle: 'Contact',
    heroTitle: 'Send your inquiry or sourcing requirement directly',
    heroDescription: 'Suitable for model lists, preferred brands, quantity, delivery timing, and project context. A simple initial request also works.',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    mapTitle: 'Company Location Map',
    metrics: ['Supports parts and server inquiries', 'Supports volume procurement', 'Fast response on business days'],
    stepsTitle: 'Recommended Flow',
    steps: ['Send models and quantity first', 'Confirm timing and delivery location', 'Then refine brand and compatibility requirements']
  },
  ru: {
    pageTitle: 'Контакты',
    heroTitle: 'Сразу отправьте запрос или закупочную потребность',
    heroDescription: 'Подходит для списка моделей, предпочитаемых брендов, количества, сроков и проектного контекста. Можно начать и с краткого описания.',
    email: 'Email',
    phone: 'Телефон',
    address: 'Адрес',
    mapTitle: 'Карта местоположения компании',
    metrics: ['Запросы по комплектующим и серверам', 'Поддержка оптовых закупок', 'Быстрый ответ в рабочие дни'],
    stepsTitle: 'Рекомендованный порядок',
    steps: ['Сначала отправьте модели и количество', 'Далее уточните сроки и место поставки', 'Потом согласуем бренд и совместимость']
  }
} as const

const pageCopy = computed(() => contactPageCopyByLocale[locale.value])

// 询价表单状态
const form = reactive({
  name: '',
  contact: '',
  product: '',
  message: ''
})
const isSubmitting = ref(false)
const submitState = ref<'idle' | 'success' | 'forwarded' | 'error'>('idle')

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${content.value.site.companyName} | ${pageCopy.value.pageTitle}`
}))

// 提交询价：优先走后端接口，失败时仍保留状态提示
async function submitInquiry() {
  if (isSubmitting.value) {
    return
  }

  submitState.value = 'idle'
  isSubmitting.value = true

  try {
    const response = await $fetch<{
      ok: boolean
      forwarded: boolean
      mailtoUrl?: string
      recipientEmail?: string
    }>('/api/inquiry', {
      method: 'POST',
      body: {
        ...form,
        locale: locale.value
      }
    })

    form.name = ''
    form.contact = ''
    form.product = ''
    form.message = ''
    submitState.value = response.forwarded ? 'forwarded' : 'success'

    if (!response.forwarded && response.mailtoUrl && import.meta.client) {
      window.location.href = response.mailtoUrl
    }
  }
  catch {
    submitState.value = 'error'
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <section class="section-gap">
    <div class="shell space-y-8">
      <section class="page-hero grid-glow reveal-up">
        <SectionTitle
          :eyebrow="ui.nav.contact"
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
      </section>

      <div class="grid gap-6 lg:grid-cols-[0.96fr_1.04fr]">
        <div class="module-surface reveal-up overflow-hidden p-5 sm:p-8">
          <div class="grid gap-4">
            <div class="grid gap-4 sm:grid-cols-2">
              <div class="soft-panel">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ pageCopy.email }}</p>
                <p class="mt-2 text-base text-slate-800 break-all">
                  {{ runtimeConfig.public.inquiryRecipientEmail || content.site.email }}
                </p>
              </div>

              <div class="soft-panel">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ pageCopy.phone }}</p>
                <p class="mt-2 text-base text-slate-800">{{ content.site.phone }}</p>
              </div>
            </div>

            <div class="soft-panel">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ pageCopy.address }}</p>
              <p class="mt-2 text-base leading-7 text-slate-800">{{ content.site.address }}</p>
            </div>

            <div class="soft-panel">
              <p class="text-sm font-semibold tracking-[0.12em] text-blue-700">{{ pageCopy.stepsTitle }}</p>
              <div class="mt-4 grid gap-3">
                <div
                  v-for="(item, index) in pageCopy.steps"
                  :key="item"
                  class="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700"
                >
                  <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {{ index + 1 }}
                  </div>
                  <p>{{ item }}</p>
                </div>
              </div>
            </div>

            <div class="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white p-3 shadow-[0_14px_30px_rgba(148,163,184,0.12)]">
              <iframe
                :src="mapFrameUrl"
                :title="pageCopy.mapTitle"
                class="h-64 w-full rounded-[1.2rem] border-0 sm:h-72"
                loading="lazy"
              />
              <p class="mt-3 text-xs text-slate-500">
                {{ mapCenter.lat }}, {{ mapCenter.lng }}
              </p>
            </div>
          </div>
        </div>

        <div class="module-surface reveal-up-delayed p-5 sm:p-8">
          <h2 class="text-2xl font-semibold text-slate-900">{{ ui.forms.inquiryTitle }}</h2>
          <p class="mt-3 text-sm leading-7 text-slate-600">
            {{ ui.forms.inquiryDescription }}
          </p>

          <form class="mt-8 grid gap-4" @submit.prevent="submitInquiry">
            <input
              v-model.trim="form.name"
              type="text"
              :placeholder="ui.forms.name"
              required
              class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300"
            >
            <input
              v-model.trim="form.contact"
              type="text"
              :placeholder="ui.forms.contact"
              required
              class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300"
            >
            <input
              v-model.trim="form.product"
              type="text"
              :placeholder="ui.forms.product"
              required
              class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300"
            >
            <textarea
              v-model.trim="form.message"
              rows="6"
              :placeholder="ui.forms.message"
              required
              class="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300"
            />

            <p
              v-if="submitState !== 'idle'"
              class="rounded-2xl border px-4 py-3 text-sm"
              :class="{
                'border-emerald-300 bg-emerald-50 text-emerald-700': submitState === 'success' || submitState === 'forwarded',
                'border-rose-300 bg-rose-50 text-rose-700': submitState === 'error'
              }"
            >
              {{
                submitState === 'forwarded'
                  ? ui.forms.forwarded
                  : submitState === 'success'
                    ? ui.forms.success
                    : ui.forms.error
              }}
            </p>

            <button
              type="submit"
              class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="isSubmitting"
            >
              {{ isSubmitting ? ui.forms.sending : ui.forms.requestQuote }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
