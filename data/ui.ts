import type { LocaleCode, UiContent } from '~/types/content'

// 多语言 UI 文案源：
// 用于导航、分区标题、表单提示、按钮文本等界面层文案
// 与 data/content.ts 的业务内容分离，方便后续运营独立维护
export const uiByLocale: Record<LocaleCode, UiContent> = {
  zh: {
    nav: {
      home: '首页',
      products: '产品中心',
      solutions: '解决方案',
      about: '关于我们',
      contact: '联系我们'
    },
    sections: {
      capabilitiesEyebrow: '核心能力',
      capabilitiesTitle: '围绕企业采购链路构建服务能力',
      capabilitiesDescription: '从选型建议到交付执行，持续为企业采购提供稳定、可落地的服务支持。',
      productsEyebrow: '产品展示',
      productsTitle: '服务器配件与整机供应品类',
      productsDescription: '覆盖常见服务器配件与整机品类，便于快速筛选所需产品。',
      solutionsEyebrow: '解决方案',
      solutionsTitle: '典型采购与交付场景',
      solutionsDescription: '覆盖扩容、替换、补货等常见采购需求，提供更贴近实际交付的供货建议。',
      brandsEyebrow: '品牌覆盖',
      brandsTitle: '主流品牌合作覆盖',
      brandsDescription: '支持主流服务器生态品牌，覆盖计算、存储与网络方向。',
      workflowEyebrow: '合作流程',
      workflowTitle: '面向 B2B 的协同流程',
      workflowDescription: '从需求确认到交付签收，流程清晰，便于项目协同与批次推进。'
    },
    forms: {
      inquiryTitle: '询价表单',
      inquiryDescription: '提交采购需求后，我们会通过邮件或电话与您对接。',
      name: '姓名 / 公司',
      contact: '邮箱 / 电话',
      product: '产品 / 型号',
      message: '需求说明',
      requestQuote: '提交询价',
      sending: '提交中...',
      success: '询价已提交，我们会尽快联系您。',
      forwarded: '询价已提交，我们正在安排对应人员与您对接。',
      error: '提交失败，请稍后重试或直接邮件联系。'
    },
    metrics: {
      supply: '供应响应',
      coverage: '品类覆盖',
      focus: '业务聚焦',
      supplyDetail: '7×24 小时快速响应企业询价',
      coverageDetail: '覆盖服务器核心配件与整机',
      focusDetail: '围绕采购、补货、替换三类需求'
    },
    productsPage: {
      processTitle: '采购协同流程',
      processSteps: ['确认需求与平台信息', '匹配型号与供货计划', '分批交付与补货支持'],
      supportTitle: '配套支持',
      supportItems: ['兼容性建议', '批量采购支持', '长期补货方案'],
      viewDetails: '查看分类详情'
    },
    productDetail: {
      backToProducts: '返回产品中心',
      specs: '规格与范围',
      useCases: '典型应用',
      deliveryNotes: '交付说明'
    },
    footerRights: '版权所有'
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      solutions: 'Solutions',
      about: 'About',
      contact: 'Contact'
    },
    sections: {
      capabilitiesEyebrow: 'Capabilities',
      capabilitiesTitle: 'Built around enterprise procurement workflows',
      capabilitiesDescription: 'From model selection to delivery execution, we support practical enterprise sourcing requirements.',
      productsEyebrow: 'Products',
      productsTitle: 'Server components and system supply categories',
      productsDescription: 'Homepage categories are designed for quick supply-scope screening.',
      solutionsEyebrow: 'Solutions',
      solutionsTitle: 'Typical procurement and delivery scenarios',
      solutionsDescription: 'Covers common expansion, replacement, and replenishment needs with delivery-oriented suggestions.',
      brandsEyebrow: 'Brand Coverage',
      brandsTitle: 'Mainstream ecosystem brands',
      brandsDescription: 'Coverage across compute, storage, and networking ecosystems.',
      workflowEyebrow: 'Workflow',
      workflowTitle: 'B2B collaboration rhythm',
      workflowDescription: 'From demand confirmation to receiving, each step stays clear for practical coordination.'
    },
    forms: {
      inquiryTitle: 'Inquiry Form',
      inquiryDescription: 'Submit your demand and our sales team will follow up by email or phone.',
      name: 'Name / Company',
      contact: 'Email / Phone',
      product: 'Product / Model',
      message: 'Requirement Details',
      requestQuote: 'Submit Inquiry',
      sending: 'Sending...',
      success: 'Inquiry submitted. We will contact you soon.',
      forwarded: 'Inquiry submitted. Our team is preparing the follow-up for you.',
      error: 'Submission failed. Please retry or contact by email.'
    },
    metrics: {
      supply: 'Supply',
      coverage: 'Coverage',
      focus: 'Focus',
      supplyDetail: '24/7 rapid response for enterprise inquiries',
      coverageDetail: 'Core server components and systems',
      focusDetail: 'Procurement, replenishment, and replacement'
    },
    productsPage: {
      processTitle: 'Procurement Workflow',
      processSteps: ['Confirm requirements and platform details', 'Match models and supply plan', 'Batch delivery and replenishment'],
      supportTitle: 'Support Scope',
      supportItems: ['Compatibility guidance', 'Volume procurement support', 'Recurring supply planning'],
      viewDetails: 'View category details'
    },
    productDetail: {
      backToProducts: 'Back to product center',
      specs: 'Specs and Scope',
      useCases: 'Use Cases',
      deliveryNotes: 'Delivery Notes'
    },
    footerRights: 'All rights reserved'
  },
  ru: {
    nav: {
      home: 'Главная',
      products: 'Продукты',
      solutions: 'Решения',
      about: 'О компании',
      contact: 'Контакты'
    },
    sections: {
      capabilitiesEyebrow: 'Возможности',
      capabilitiesTitle: 'Сервис под корпоративные закупки',
      capabilitiesDescription: 'От подбора моделей до поставки мы сопровождаем практические корпоративные закупки.',
      productsEyebrow: 'Продукты',
      productsTitle: 'Категории серверных комплектующих и систем',
      productsDescription: 'Категории на главной помогают быстро оценить доступный ассортимент.',
      solutionsEyebrow: 'Решения',
      solutionsTitle: 'Типовые сценарии закупки и поставки',
      solutionsDescription: 'Охватывает расширение, замену и пополнение с акцентом на реальные задачи поставки.',
      brandsEyebrow: 'Бренды',
      brandsTitle: 'Покрытие ключевых брендов',
      brandsDescription: 'Поддержка экосистем вычислений, хранения и сетевой инфраструктуры.',
      workflowEyebrow: 'Процесс',
      workflowTitle: 'Ритм B2B взаимодействия',
      workflowDescription: 'Этапы от запроса до приемки выстроены понятно и удобно для согласования поставки.'
    },
    forms: {
      inquiryTitle: 'Форма запроса',
      inquiryDescription: 'Отправьте потребность, и отдел продаж свяжется по email или телефону.',
      name: 'Имя / Компания',
      contact: 'Email / Телефон',
      product: 'Продукт / Модель',
      message: 'Описание запроса',
      requestQuote: 'Отправить запрос',
      sending: 'Отправка...',
      success: 'Запрос отправлен. Мы скоро свяжемся с вами.',
      forwarded: 'Запрос отправлен. Мы готовим дальнейшее сопровождение по вашему обращению.',
      error: 'Ошибка отправки. Повторите позже или напишите на email.'
    },
    metrics: {
      supply: 'Поставка',
      coverage: 'Охват',
      focus: 'Фокус',
      supplyDetail: 'Быстрый ответ 24/7 для корпоративных запросов',
      coverageDetail: 'Ключевые комплектующие и серверы',
      focusDetail: 'Закупка, пополнение и замена'
    },
    productsPage: {
      processTitle: 'Процесс закупки',
      processSteps: ['Подтверждение требований и платформы', 'Подбор моделей и плана поставки', 'Партии поставки и пополнение'],
      supportTitle: 'Поддержка',
      supportItems: ['Рекомендации по совместимости', 'Поддержка оптовой закупки', 'План регулярного пополнения'],
      viewDetails: 'Смотреть детали категории'
    },
    productDetail: {
      backToProducts: 'Назад к продуктам',
      specs: 'Характеристики',
      useCases: 'Сценарии применения',
      deliveryNotes: 'Примечания по поставке'
    },
    footerRights: 'Все права защищены'
  }
}
