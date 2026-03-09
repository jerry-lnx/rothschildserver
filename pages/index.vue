<script setup lang="ts">
// 根路径仅负责语言分发：
// 1) 优先使用用户上次选择的语言（cookie）
// 2) 没有记录时，按浏览器语言自动识别
// 3) 最终跳转到 /{locale} 对应的多语言首页
const router = useRouter()
const cookie = useCookie<'zh' | 'en' | 'ru'>('preferred_locale', {
  maxAge: 60 * 60 * 24 * 365
})

onMounted(() => {
  // 优先走用户历史偏好，避免每次都因浏览器语言变化而跳语言
  const preferred = cookie.value
  const locale = preferred ?? detectLocaleFromBrowser(navigator.languages)
  cookie.value = locale
  router.replace(`/${locale}`)
})
</script>

<template>
  <!-- 跳转期间的占位内容，避免白屏 -->
  <div class="shell section-gap">
    <div class="panel p-8 text-sm text-slate-300">
      Redirecting...
    </div>
  </div>
</template>
