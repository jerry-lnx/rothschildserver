<script setup lang="ts">

// 当前路由：用于区分首页与内页的顶部留白
const route = useRoute()

// 站点 favicon
useHead({
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/logo_icon.png'
    }
  ]
})

// 只有多语言首页不需要额外顶部留白，因为首屏本身已经和固定头部做了叠放设计
const isLocaleHome = computed(() => /^\/(zh|en|ru)\/?$/.test(route.path))
</script>

<template>
  <div class="min-h-screen bg-[#f8fafc] text-slate-900">
    <SiteHeader />
    <main :class="isLocaleHome ? 'pt-0' : 'pt-20 md:pt-24'">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>
