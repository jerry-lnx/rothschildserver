export default defineNuxtConfig({
  compatibilityDate: '2025-01-15',
  devtools: { enabled: false },
  experimental: {
    // 官网场景不依赖 Nuxt app manifest，关闭后可避免开发态别名解析异常
    appManifest: false
  },
  modules: ['@nuxtjs/tailwindcss'],
  css: ['~/assets/css/main.css'],
  nitro: {
    timing: false,
    prerender: {
      routes: [
        '/',
        '/zh',
        '/zh/products',
        '/zh/products/server-cpu',
        '/zh/products/gpu-accelerators',
        '/zh/products/memory-modules',
        '/zh/products/enterprise-ssd',
        '/zh/products/enterprise-hdd',
        '/zh/products/network-interface',
        '/zh/products/optical-modules',
        '/zh/products/server-systems',
        '/zh/solutions',
        '/zh/about',
        '/zh/contact',
        '/en',
        '/en/products',
        '/en/products/server-cpu',
        '/en/products/gpu-accelerators',
        '/en/products/memory-modules',
        '/en/products/enterprise-ssd',
        '/en/products/enterprise-hdd',
        '/en/products/network-interface',
        '/en/products/optical-modules',
        '/en/products/server-systems',
        '/en/solutions',
        '/en/about',
        '/en/contact',
        '/ru',
        '/ru/products',
        '/ru/products/server-cpu',
        '/ru/products/gpu-accelerators',
        '/ru/products/memory-modules',
        '/ru/products/enterprise-ssd',
        '/ru/products/enterprise-hdd',
        '/ru/products/network-interface',
        '/ru/products/optical-modules',
        '/ru/products/server-systems',
        '/ru/solutions',
        '/ru/about',
        '/ru/contact'
      ]
    }
  },
  runtimeConfig: {
    inquiryWebhookUrl: process.env.INQUIRY_WEBHOOK_URL || '',
    inquiryRecipientEmail: process.env.INQUIRY_RECIPIENT_EMAIL || '1426585028@qq.com',
    inquirySmtpHost: process.env.INQUIRY_SMTP_HOST || '',
    inquirySmtpPort: process.env.INQUIRY_SMTP_PORT || '465',
    inquirySmtpSecure: process.env.INQUIRY_SMTP_SECURE || 'true',
    inquirySmtpUser: process.env.INQUIRY_SMTP_USER || '',
    inquirySmtpPass: process.env.INQUIRY_SMTP_PASS || '',
    inquiryFromEmail: process.env.INQUIRY_FROM_EMAIL || '',
    inquiryFromName: process.env.INQUIRY_FROM_NAME || 'ROTHSCHILDSERVER',
    public: {}
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'ROTHSCHILDSERVER',
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/logo_icon.png'
        }
      ]
    }
  }
})
