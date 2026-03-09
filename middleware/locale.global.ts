export default defineNuxtRouteMiddleware((to) => {
  if (!to.path.startsWith('/zh') && !to.path.startsWith('/en') && !to.path.startsWith('/ru')) {
    return
  }

  const localeParam = to.path.split('/')[1]
  const locale = normalizeLocale(localeParam)
  const preferredLocale = useCookie<'zh' | 'en' | 'ru'>('preferred_locale', {
    maxAge: 60 * 60 * 24 * 365
  })

  preferredLocale.value = locale
})
