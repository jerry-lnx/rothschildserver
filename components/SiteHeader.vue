<script setup lang="ts">
const route = useRoute()
const locale = computed(() => normalizeLocale(route.path.split('/')[1]))
const ui = computed(() => getUiContent(locale.value))

const mobileMenuOpen = ref(false)
const isElevated = ref(false)

const navItems = computed(() => [
  { label: ui.value.nav.home, href: `/${locale.value}` },
  { label: ui.value.nav.products, href: `/${locale.value}/products` },
  { label: ui.value.nav.solutions, href: `/${locale.value}/solutions` },
  { label: ui.value.nav.about, href: `/${locale.value}/about` },
  { label: ui.value.nav.contact, href: `/${locale.value}/contact` }
])

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

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false
  }
)

const logoImage = '/logo_small.png'
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 bg-white"
    :class="isElevated ? 'shadow-[0_18px_40px_rgba(15,23,42,0.12)]' : 'shadow-[0_8px_22px_rgba(15,23,42,0.05)]'"
  >
    <div class="shell grid grid-cols-[minmax(14rem,1fr)_auto] items-center gap-4 py-3 md:grid-cols-[minmax(18rem,1fr)_auto_minmax(18rem,1fr)] md:gap-8 md:py-4">
      <NuxtLink :to="`/${locale}`" class="flex min-w-0 items-center justify-self-start">
        <img
          :src="logoImage"
          alt="ROTHSCHILDSERVER logo"
          class="h-[3.75rem] w-auto max-w-[15rem] object-contain sm:h-[4.1rem] sm:max-w-[17rem] lg:h-[4.45rem] lg:max-w-[18.5rem]"
        >
      </NuxtLink>

      <div class="hidden min-w-0 justify-self-center md:flex">
        <nav class="flex items-center gap-12 lg:gap-14">
          <NuxtLink
            v-for="item in navItems"
            :key="item.href"
            :to="item.href"
            class="group relative py-3 text-[1rem] font-semibold tracking-[0.02em] transition-colors duration-300"
            :class="isActive(item.href) ? 'text-slate-950' : 'text-slate-500 hover:text-slate-900'"
          >
            <span class="relative z-[1] whitespace-nowrap">{{ item.label }}</span>
            <span
              class="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-sky-500 via-blue-600 to-slate-900 transition-all duration-300"
              :class="isActive(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-40'"
            />
          </NuxtLink>
        </nav>
      </div>

      <div class="flex items-center justify-self-end gap-2 md:gap-3">
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
