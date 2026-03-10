<script setup lang="ts">
const route = useRoute()
const locale = computed(() => normalizeLocale(route.params.locale as string))
const content = computed(() => getSiteContent(locale.value))

const mapQuery = computed(() => encodeURIComponent(content.value.site.address))
const mapFrameUrl = computed(() => `https://www.google.com/maps?q=${mapQuery.value}&output=embed`)

const pageCopyByLocale = {
  zh: {
    pageTitle: '联系我们',
    heroTitle: '直接提交采购需求并快速对接',
    heroDescription: '适合发送型号清单、交期、项目背景和合作需求，我们会尽快安排人员跟进。',
    heroMetrics: ['型号清单提交', '邮箱电话直连', '快速响应对接'],
    email: '邮箱',
    phone: '电话',
    address: '地址',
    mapTitle: '公司位置地图',
    directNote: '如果您已经整理好型号清单、数量与交期，也可以直接发送到我们的业务邮箱或与我们电话沟通。',
    formEyebrow: '在线提交咨询信息',
    formTitle: '提交采购信息',
    submitText: '提交信息',
    submittingText: '提交中...',
    success: '提交成功，我们会尽快与您联系。',
    forwarded: '提交成功，我们正在安排对应人员与您对接。',
    error: '提交失败，请稍后重试或直接通过邮箱联系。',
    name: '姓名',
    company: '公司',
    emailPlaceholder: '邮箱',
    phonePlaceholder: '电话',
    product: '产品类别及型号',
    message: '需求说明',
    required: '不能为空'
  },
  en: {
    pageTitle: 'Contact',
    heroTitle: 'Send your sourcing request and connect quickly',
    heroDescription: 'Use this page for model lists, timing, project background, and cooperation details. We will arrange a follow-up quickly.',
    heroMetrics: ['Model list submission', 'Direct email and phone access', 'Fast follow-up response'],
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    mapTitle: 'Company Location Map',
    directNote: 'If your model list, quantity, and timing are ready, send them directly to our business mailbox.',
    formEyebrow: 'Online Submission',
    formTitle: 'Submit Sourcing Details',
    submitText: 'Submit Details',
    submittingText: 'Submitting...',
    success: 'Submitted successfully. We will contact you soon.',
    forwarded: 'Submitted successfully. Our team is arranging the follow-up.',
    error: 'Submission failed. Please retry later or contact us by email.',
    name: 'Name',
    company: 'Company',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Phone',
    product: 'Product Category and Model',
    message: 'Requirement Details',
    required: 'is required'
  },
  ru: {
    pageTitle: 'Контакты',
    heroTitle: 'Сразу отправьте закупочный запрос и быстро выйдите на связь',
    heroDescription: 'Страница подходит для списка моделей, сроков, контекста проекта и деталей сотрудничества. Мы быстро подключим нужного специалиста.',
    heroMetrics: ['Отправка списка моделей', 'Прямой контакт по email и телефону', 'Быстрый ответ и подключение'],
    email: 'Email',
    phone: 'Телефон',
    address: 'Адрес',
    mapTitle: 'Карта местоположения компании',
    directNote: 'Если список моделей, количество и сроки уже готовы, отправьте их сразу на наш рабочий email.',
    formEyebrow: 'Онлайн-заявка',
    formTitle: 'Отправить данные по закупке',
    submitText: 'Отправить',
    submittingText: 'Отправка...',
    success: 'Успешно отправлено. Мы скоро свяжемся с вами.',
    forwarded: 'Успешно отправлено. Мы подбираем ответственного специалиста.',
    error: 'Ошибка отправки. Повторите позже или напишите нам по email.',
    name: 'Имя',
    company: 'Компания',
    emailPlaceholder: 'Email',
    phonePlaceholder: 'Телефон',
    product: 'Категория продукта и модель',
    message: 'Описание потребности',
    required: 'не может быть пустым'
  }
} as const

const pageCopy = computed(() => pageCopyByLocale[locale.value])

const form = reactive({
  name: '',
  company: '',
  email: '',
  phone: '',
  product: '',
  message: ''
})
const isSubmitting = ref(false)
const submitState = ref<'idle' | 'success' | 'forwarded' | 'error'>('idle')
const errors = reactive({
  name: '',
  phone: '',
  product: ''
})

useHead(() => ({
  htmlAttrs: { lang: locale.value },
  title: `${content.value.site.companyName} | ${pageCopy.value.pageTitle}`
}))

async function submitInquiry() {
  if (isSubmitting.value) return

  errors.name = form.name ? '' : `${pageCopy.value.name}${pageCopy.value.required}`
  errors.phone = form.phone ? '' : `${pageCopy.value.phonePlaceholder}${pageCopy.value.required}`
  errors.product = form.product ? '' : `${pageCopy.value.product}${pageCopy.value.required}`

  if (errors.name || errors.phone || errors.product) {
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
    form.company = ''
    form.email = ''
    form.phone = ''
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
  <section class="section-gap inner-page-section">
    <div class="shell space-y-7">
      <section class="page-stack contact-stack reveal-up">
        <div class="page-stack-hero contact-stack-hero grid-glow">
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

        <div class="page-stack-body contact-stack-body">
          <div class="grid gap-6 lg:grid-cols-[1.03fr_0.97fr] lg:items-start xl:grid-cols-[1.05fr_0.95fr]">
            <div class="order-2 space-y-4 pt-3 lg:order-2 lg:pt-9">
              <div class="soft-panel">
                <p class="text-sm leading-7 text-slate-600">{{ pageCopy.directNote }}</p>

                <div class="mt-5 grid gap-3 sm:grid-cols-2">
                  <div class="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                    <div class="flex items-center gap-2 text-slate-500">
                      <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-current" aria-hidden="true">
                        <path d="M4 7.5L12 13.5L20 7.5" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" />
                        <rect x="3.25" y="5.25" width="17.5" height="13.5" rx="2.25" stroke-width="1.5" />
                      </svg>
                      <p class="text-xs uppercase tracking-[0.2em]">{{ pageCopy.email }}</p>
                    </div>
                    <div class="mt-3 grid gap-2">
                      <a
                        v-for="email in content.site.emails"
                        :key="email"
                        :href="`mailto:${email}`"
                        class="text-base text-slate-800 whitespace-nowrap transition-colors hover:text-blue-700"
                      >
                        {{ email }}
                      </a>
                    </div>
                  </div>

                  <div class="rounded-[1.25rem] border border-slate-200 bg-slate-50/80 p-4">
                    <div class="flex items-center gap-2 text-slate-500">
                      <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4 stroke-current" aria-hidden="true">
                        <path d="M6.9 4.75H9.1C9.49 4.75 9.84 4.99 9.98 5.36L10.93 7.88C11.04 8.17 11 8.5 10.81 8.75L9.64 10.3C10.37 11.78 11.57 12.98 13.05 13.71L14.6 12.54C14.85 12.35 15.18 12.31 15.47 12.42L17.99 13.37C18.36 13.51 18.6 13.86 18.6 14.25V16.45C18.6 17.14 18.04 17.7 17.35 17.7H16.1C10.25 17.7 5.65 13.1 5.65 7.25V6C5.65 5.31 6.21 4.75 6.9 4.75Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                      <p class="text-xs uppercase tracking-[0.2em]">{{ pageCopy.phone }}</p>
                    </div>
                    <div class="mt-3 grid gap-2">
                      <a
                        v-for="phone in content.site.phones"
                        :key="phone"
                        :href="`tel:${phone}`"
                        class="text-base text-slate-800 whitespace-nowrap transition-colors hover:text-blue-700"
                      >
                        {{ phone }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div class="soft-panel overflow-hidden">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">{{ pageCopy.address }}</p>
                <p class="mt-3 text-base leading-7 text-slate-800">{{ content.site.address }}</p>
                <div class="mt-4 overflow-hidden rounded-[1.25rem] border border-slate-200 bg-white p-2 shadow-[0_12px_26px_rgba(148,163,184,0.12)]">
                  <iframe
                    :src="mapFrameUrl"
                    :title="pageCopy.mapTitle"
                    class="h-64 w-full rounded-[1rem] border-0 sm:h-72"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div class="order-1 lg:order-1">
              <p class="page-body-lead">{{ pageCopy.formEyebrow }}</p>

              <form class="mt-4 grid gap-3.5" @submit.prevent="submitInquiry">
                <div class="grid gap-3.5 sm:grid-cols-2">
                  <div class="space-y-1.5">
                    <div class="relative">
                      <input v-model.trim="form.name" type="text" :placeholder="pageCopy.name" class="w-full rounded-2xl border bg-white px-4 py-3 pr-9 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300" :class="errors.name ? 'border-rose-300' : 'border-slate-200'" @input="errors.name = form.name ? '' : errors.name">
                      <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-rose-500">*</span>
                    </div>
                    <div class="min-h-[0.825rem]">
                      <p v-if="errors.name" class="text-[11px] leading-3 text-rose-500">{{ errors.name }}</p>
                    </div>
                  </div>
                  <div class="space-y-1.5">
                    <div class="relative">
                      <input v-model.trim="form.phone" type="text" :placeholder="pageCopy.phonePlaceholder" class="w-full rounded-2xl border bg-white px-4 py-3 pr-9 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300" :class="errors.phone ? 'border-rose-300' : 'border-slate-200'" @input="errors.phone = form.phone ? '' : errors.phone">
                      <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-rose-500">*</span>
                    </div>
                    <div class="min-h-[0.825rem]">
                      <p v-if="errors.phone" class="text-[11px] leading-3 text-rose-500">{{ errors.phone }}</p>
                    </div>
                  </div>
                </div>

                <div class="grid gap-3.5 sm:grid-cols-2">
                  <div class="space-y-1.5">
                    <input v-model.trim="form.email" type="email" :placeholder="pageCopy.emailPlaceholder" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300">
                    <div class="min-h-[0.825rem]" />
                  </div>
                  <div class="space-y-1.5">
                    <input v-model.trim="form.company" type="text" :placeholder="pageCopy.company" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300">
                    <div class="min-h-[0.825rem]" />
                  </div>
                </div>

                <div class="space-y-1.5">
                  <div class="relative">
                    <input v-model.trim="form.product" type="text" :placeholder="pageCopy.product" class="w-full rounded-2xl border bg-white px-4 py-3 pr-9 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300" :class="errors.product ? 'border-rose-300' : 'border-slate-200'" @input="errors.product = form.product ? '' : errors.product">
                    <span class="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-rose-500">*</span>
                  </div>
                  <div class="min-h-[0.825rem]">
                    <p v-if="errors.product" class="text-[11px] leading-3 text-rose-500">{{ errors.product }}</p>
                  </div>
                </div>

                <div>
                  <textarea v-model.trim="form.message" rows="6" :placeholder="pageCopy.message" class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-300" />
                </div>

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
                      ? pageCopy.forwarded
                      : submitState === 'success'
                        ? pageCopy.success
                        : pageCopy.error
                  }}
                </p>

                <button type="submit" class="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60" :disabled="isSubmitting">
                  {{ isSubmitting ? pageCopy.submittingText : pageCopy.submitText }}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  </section>
</template>
