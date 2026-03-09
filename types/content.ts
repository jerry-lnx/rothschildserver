// 网站支持的语言代码
export type LocaleCode = 'zh' | 'en' | 'ru'

// 站点基础信息：头部、页脚、联系页等公共信息统一取这里
export interface SiteConfig {
  companyName: string
  companyNameEn: string
  tagline: string
  emails: string[]
  phones: string[]
  address: string
}

export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
}

export interface FeatureItem {
  title: string
  description: string
}

export interface ProductCategory {
  title: string
  description: string
  highlights: string[]
}

export interface ProductDetailContent {
  slug: string
  heroTitle: string
  heroDescription: string
  useCases: string[]
  specs: string[]
  serviceNotes: string[]
}

export interface SolutionItem {
  title: string
  description: string
}

export interface HomePageContent {
  hero: HeroContent
  capabilities: FeatureItem[]
  categories: ProductCategory[]
  solutions: SolutionItem[]
  brands: string[]
}

export interface AboutPageContent {
  intro: string
  pillars: FeatureItem[]
}

export interface ContactPageContent {
  title: string
  description: string
  responsePromise: string
}

export interface UiContent {
  nav: {
    home: string
    products: string
    solutions: string
    about: string
    contact: string
  }
  sections: {
    capabilitiesEyebrow: string
    capabilitiesTitle: string
    capabilitiesDescription: string
    productsEyebrow: string
    productsTitle: string
    productsDescription: string
    solutionsEyebrow: string
    solutionsTitle: string
    solutionsDescription: string
    brandsEyebrow: string
    brandsTitle: string
    brandsDescription: string
    workflowEyebrow: string
    workflowTitle: string
    workflowDescription: string
  }
  forms: {
    inquiryTitle: string
    inquiryDescription: string
    name: string
    contact: string
    product: string
    message: string
    requestQuote: string
    sending: string
    success: string
    forwarded: string
    error: string
  }
  metrics: {
    supply: string
    coverage: string
    focus: string
    supplyDetail: string
    coverageDetail: string
    focusDetail: string
  }
  productsPage: {
    processTitle: string
    processSteps: string[]
    supportTitle: string
    supportItems: string[]
    viewDetails: string
  }
  productDetail: {
    backToProducts: string
    specs: string
    useCases: string
    deliveryNotes: string
  }
  footerRights: string
}
