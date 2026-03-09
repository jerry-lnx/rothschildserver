import type { LocaleCode } from '~/types/content'

import { contentByLocale } from '~/data/content'
import { productDetailsByLocale, productSlugs } from '~/data/productCatalog'
import { uiByLocale } from '~/data/ui'

// 统一语言归一化，避免页面因非法参数报错
export function normalizeLocale(value?: string | null): LocaleCode {
  if (value === 'zh' || value === 'en' || value === 'ru') {
    return value
  }

  return 'en'
}

// 根据浏览器语言自动推断站点语言
export function detectLocaleFromBrowser(languages: readonly string[] = []): LocaleCode {
  const serialized = languages.join(',').toLowerCase()

  if (serialized.includes('zh')) {
    return 'zh'
  }

  if (serialized.includes('ru')) {
    return 'ru'
  }

  return 'en'
}

// 读取当前语言站点内容
export function getSiteContent(locale: string) {
  return contentByLocale[normalizeLocale(locale)]
}

// 读取当前语言 UI 文案
export function getUiContent(locale: string) {
  return uiByLocale[normalizeLocale(locale)]
}

// 获取产品 slug 列表（拷贝返回，避免外部直接修改源数组）
export function getProductSlugs() {
  return [...productSlugs]
}

// 获取当前语言下全部产品详情
export function getProductDetails(locale: string) {
  return productDetailsByLocale[normalizeLocale(locale)]
}

// 通过 slug 获取单个产品详情
export function getProductDetail(locale: string, slug: string) {
  return getProductDetails(locale).find((item) => item.slug === slug) ?? null
}
