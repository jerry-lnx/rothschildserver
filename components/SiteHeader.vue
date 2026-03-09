<script setup lang="ts">
import logoImage from '~/assets/images/logo.png'

// 当前路由用于判断导航激活态
const route = useRoute()

// 根据 URL 第一段解析当前语言
const locale = computed(() => normalizeLocale(route.path.split('/')[1]))
const ui = computed(() => getUiContent(locale.value))

// 移动端菜单开关
const mobileMenuOpen = ref(false)

// 根据滚动状态增强头部阴影和边界层次
const isElevated = ref(false)

// 顶部导航配置
const navItems = computed(() => [
  { label: ui.value.nav.home, href: `/${locale.value}` },
  { label: ui.value.nav.products, href: `/${locale.value}/products` },
  { label: ui.value.nav.solutions, href: `/${locale.value}/solutions` },
  { label: ui.value.nav.about, href: `/${locale.value}/about` },
  { label: ui.value.nav.contact, href: `/${locale.value}/contact` }
])

// 判断当前导航是否处于激活状态
function isActive(target: string) {
  if (target === `/${locale.value}`) {
    return route.path === target
  }
  return route.path === target || route.path.startsWith(`${target}/`)
}

function handleScroll() {
  if (!import.meta.client) {
    return
  }
  isElevated.value = window.scrollY > 8
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 切换路由后自动关闭移动端菜单
watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)
</script>

<template>
  <!-- 固定头部：白底 + 柔和阴影 + 轻微磨砂，保证在首屏大图上也清晰 -->
  <header
    class="fixed inset-x-0 top-0 z-50 border-b border-slate-200/90 bg-white/95 backdrop-blur"
    :class="isElevated ? 'shadow-[0_18px_40px_rgba(15,23,42,0.12)]' : 'shadow-[0_8px_22px_rgba(15,23,42,0.06)]'"
  >
    <div class="shell grid grid-cols-[1fr_auto] items-center gap-3 py-3 md:grid-cols-[auto_1fr_auto] md:gap-6 md:py-4">
      <!-- 左侧品牌区 -->
      <NuxtLink :to="`/${locale}`" class="flex min-w-0 items-center gap-3">
        <img
          :src="logoImage"
          alt="Luoschai logo"
          class="h-9 w-auto max-w-[9rem] object-contain sm:h-10 sm:max-w-[10rem]"
        >
        <p class="truncate text-sm font-semibold tracking-[0.18em] text-slate-900">LUOSCHAI</p>
      </NuxtLink>

      <!-- 桌面端导航 -->
      <div class="hidden min-w-0 justify-center md:flex">
        <nav class="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-slate-200 bg-slate-50/95 p-1.5">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="relative min-w-max rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300"
            :class="
              isActive(item.href)
                ? 'bg-slate-900 text-white shadow-[0_10px_22px_rgba(15,23,42,0.22)]'
                : 'text-slate-600 hover:bg-white hover:text-slate-900'
            "
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
      </div>

      <!-- 右侧操作区：桌面端语言切换 + 移动端菜单按钮 -->
      <div class="flex items-center gap-2 md:gap-3">
        <div class="hidden md:block">
          <LanguageSwitcher :locale="locale" />
        </div>

        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 shadow-sm md:hidden"
          :aria-expanded="mobileMenuOpen ? 'true' : 'false'"
          aria-label="Toggle mobile navigation"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg
            v-if="!mobileMenuOpen"
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M3.5 5.5H16.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
            <path d="M3.5 10H16.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
            <path d="M3.5 14.5H16.5" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
          </svg>
          <svg
            v-else
            class="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path d="M5 5L15 15" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
            <path d="M15 5L5 15" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
          </svg>
        </button>
      </div>
    </div>

    <!-- 移动端下拉导航 -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="mobileMenuOpen"
        class="border-t border-slate-200 bg-white px-6 py-4 shadow-[0_14px_32px_rgba(15,23,42,0.12)] md:hidden"
      >
        <nav class="grid gap-2 text-sm">
          <NuxtLink
            v-for="item in navItems"
            :key="`mobile-${item.href}`"
            :to="item.href"
            class="rounded-xl px-4 py-3 font-medium transition-colors"
            :class="
              isActive(item.href)
                ? 'bg-slate-900 text-white'
                : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
            "
          >
            {{ item.label }}
          </NuxtLink>
        </nav>
        <div class="mt-3 flex justify-end">
          <LanguageSwitcher :locale="locale" />
        </div>
      </div>
    </Transition>
  </header>
</template>
