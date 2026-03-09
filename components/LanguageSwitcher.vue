<script setup lang="ts">
import type { LocaleCode } from '~/types/content'

const props = defineProps<{
  // 当前激活语言
  locale: LocaleCode
}>()

const route = useRoute()

// 记录用户语言偏好
const cookie = useCookie<LocaleCode>('preferred_locale', {
  maxAge: 60 * 60 * 24 * 365
})

// 组件根节点：用于点击外部区域时关闭下拉框
const rootRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

const localeLabels: Record<LocaleCode, string> = {
  zh: '中文',
  en: 'English',
  ru: 'Русский'
}

// 保持当前页面路径，只切换语言前缀
const pathWithoutLocale = computed(() => {
  const segments = route.path.split('/').filter(Boolean)
  return segments.slice(1).join('/')
})

function buildPath(targetLocale: LocaleCode) {
  const suffix = pathWithoutLocale.value
  return suffix ? `/${targetLocale}/${suffix}` : `/${targetLocale}`
}

function selectLocale(targetLocale: LocaleCode) {
  cookie.value = targetLocale
  isOpen.value = false
  return navigateTo(buildPath(targetLocale))
}

function handleDocumentClick(event: MouseEvent) {
  const target = event.target as Node | null
  if (!rootRef.value || !target) {
    return
  }

  if (!rootRef.value.contains(target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleDocumentClick)
})

watch(
  () => route.fullPath,
  () => {
    isOpen.value = false
  }
)
</script>

<template>
  <div ref="rootRef" class="relative">
    <button
      type="button"
      class="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 shadow-[0_8px_20px_rgba(15,23,42,0.05)] transition-colors hover:bg-slate-50"
      :aria-expanded="isOpen ? 'true' : 'false'"
      @click="isOpen = !isOpen"
    >
      <span class="font-medium">{{ localeLabels[props.locale] }}</span>
      <svg class="h-3 w-3 text-slate-400 transition-transform" :class="isOpen ? 'rotate-180' : ''" viewBox="0 0 12 12" fill="none" aria-hidden="true">
        <path d="M2.5 4.5 6 8l3.5-3.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" />
      </svg>
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 top-full mt-3 w-40 rounded-3xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur"
      >
        <button
          v-for="item in ['zh', 'en', 'ru']"
          :key="item"
          type="button"
          class="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors"
          :class="
            props.locale === item
              ? 'bg-slate-100 text-slate-900'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          "
          @click="selectLocale(item as LocaleCode)"
        >
          <span>{{ localeLabels[item as LocaleCode] }}</span>
          <svg
            v-if="props.locale === item"
            class="h-4 w-4 text-slate-900"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3.5 8.5 6.5 11.5 12.5 4.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>
