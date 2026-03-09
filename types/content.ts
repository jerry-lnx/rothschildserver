// 站点支持的语言代码（路由前缀与内容索引都依赖此联合类型）
export type LocaleCode = 'zh' | 'en' | 'ru'

// 站点基础信息：用于头部、页脚、联系页等公共区域
export interface SiteConfig {
  companyName: string
  companyNameEn: string
  tagline: string
  email: string
  phone: string
  address: string
}

// 首页首屏文案结构
export interface HeroContent {
  eyebrow: string
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
}

// 通用“标题+描述”内容块（能力、支柱等模块复用）
export interface FeatureItem {
  title: string
  description: string
}

// 产品分类卡片结构（首页/产品页复用）
export interface ProductCategory {
  title: string
  description: string
  highlights: string[]
}

// 产品详情页结构（按 slug 精确映射）
export interface ProductDetailContent {
  slug: string
  heroTitle: string
  heroDescription: string
  useCases: string[]
  specs: string[]
  serviceNotes: string[]
}

// 解决方案条目结构
export interface SolutionItem {
  title: string
  description: string
}

// 首页内容聚合结构
export interface HomePageContent {
  hero: HeroContent
  capabilities: FeatureItem[]
  categories: ProductCategory[]
  solutions: SolutionItem[]
  brands: string[]
}

// 关于页内容结构
export interface AboutPageContent {
  intro: string
  pillars: FeatureItem[]
}

// 联系页内容结构
export interface ContactPageContent {
  title: string
  description: string
  responsePromise: string
}

// 全站 UI 文案结构：
// 把按钮/标题/表单提示等“界面文本”与业务内容解耦，便于后续后台维护
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
