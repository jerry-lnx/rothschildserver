import type {
  AboutPageContent,
  ContactPageContent,
  HomePageContent,
  LocaleCode,
  ProductCategory,
  SiteConfig,
  SolutionItem
} from '~/types/content'

interface LocaleBundle {
  site: SiteConfig
  home: HomePageContent
  products: ProductCategory[]
  solutions: SolutionItem[]
  about: AboutPageContent
  contact: ContactPageContent
}

export const contentByLocale: Record<LocaleCode, LocaleBundle> = {
  zh: {
    site: {
      companyName: '罗斯柴智算',
      companyNameEn: 'ROTHSCHILD',
      tagline: '服务器配件采购与供应服务商',
      emails: ['lisa@rothschildserver.com', 'asya@rothschildserver.com'],
      phones: ['+86 17815501272', '+86 13843373030'],
      address: '深圳市龙华区观湖街道鹭湖社区观盛四路7号翰宇创新产业大楼A座807'
    },
    home: {
      hero: {
        eyebrow: '企业级配件供应',
        title: '专注服务器配件采购与稳定供货',
        description: '面向企业采购、集成商与数据中心项目，提供 CPU、GPU、网卡、光模块、存储与整机等配件的持续供应与交付支持。',
        primaryCta: '查看产品中心',
        secondaryCta: '即刻联系我们'
      },
      capabilities: [
        { title: '多品类现货与期货组合', description: '按项目交付节奏组合现货与期货资源，降低单一渠道断供风险。' },
        { title: '型号匹配与兼容校验', description: '围绕平台代际、接口规格与兼容要求确认配件，减少错配。' },
        { title: '批量采购价格策略', description: '支持按批次、季度、年度组织采购，兼顾交期和整体成本。' },
        { title: '紧急替换快速响应', description: '面向故障替换和突发扩容场景，提供优先询价与供货支持。' },
        { title: '长期补货计划管理', description: '为长期运维和扩容项目建立补货节奏，保障持续供货。' },
        { title: '交付与签收跟踪', description: '提供出货、运输、签收全流程反馈，便于采购团队跟进。' }
      ],
      categories: [
        { title: '服务器 CPU', description: '覆盖 Intel Xeon 与 AMD EPYC 主流平台代际。', highlights: ['Intel Xeon', 'AMD EPYC'] },
        { title: 'GPU 加速卡', description: '支持 AI 训练、推理与高性能计算节点建设。', highlights: ['NVIDIA', '数据中心 GPU'] },
        { title: '网卡/NIC', description: '支持 10G/25G/40G/100G 速率与多种接口形态。', highlights: ['Ethernet', 'RDMA'] },
        { title: '光模块', description: '适配数据中心互联、骨干链路与机房布线升级。', highlights: ['SFP', 'QSFP'] },
        { title: '内存条', description: '覆盖 DDR4/DDR5 企业级内存与容量组合方案。', highlights: ['ECC', 'Registered'] },
        { title: '企业级 SSD', description: '适用于高 IOPS 和低时延场景的稳定存储配件。', highlights: ['NVMe', 'SATA'] },
        { title: '企业级 HDD', description: '面向归档、备份和海量数据存储的企业硬盘。', highlights: ['Nearline', 'SAS'] },
        { title: '服务器整机', description: '提供机架式整机与定制化配置建议。', highlights: ['1U/2U', 'Custom Build'] }
      ],
      solutions: [
        { title: '数据中心扩容采购', description: '按机柜与节点批次规划配件清单，支持分阶段扩容交付。' },
        { title: 'AI 算力节点建设', description: '围绕 GPU、网络与存储三要素配置，缩短算力上线周期。' },
        { title: '运维备件与替换', description: '建立高频故障件备件池，降低停机风险与更换时长。' },
        { title: '集成商项目代采', description: '协助集成商集中代采多品牌配件，减少供应链沟通成本。' },
        { title: '跨区域项目交付', description: '支持多城市项目并行供货，统一跟踪订单与签收进度。' },
        { title: '年度框架采购合作', description: '按年度采购量与计划锁定资源，提升稳定性与议价空间。' }
      ],
      brands: ['Intel', 'AMD', 'NVIDIA', 'Samsung', 'Micron', 'Broadcom', 'Seagate', 'Western Digital']
    },
    products: [
      { title: '服务器 CPU', description: '企业级 CPU 配件采购与批量供货。', highlights: ['Intel Xeon', 'AMD EPYC', '长期供货'] },
      { title: 'GPU 加速卡', description: '面向 AI 与 HPC 的核心算力配件。', highlights: ['训练', '推理', '数据中心'] },
      { title: '内存条', description: '服务器内存升级与容量扩展方案。', highlights: ['DDR4', 'DDR5', 'ECC'] },
      { title: '企业级 SSD', description: '高性能读写场景下的存储加速。', highlights: ['NVMe', 'SATA', 'Enterprise'] },
      { title: '企业级 HDD', description: '大容量归档与备份存储。', highlights: ['SAS', 'Nearline', '高容量'] },
      { title: '网卡/NIC', description: '高带宽、低时延互联配件。', highlights: ['10G-100G', 'Ethernet', 'RDMA'] },
      { title: '光模块', description: '机房链路升级与跨柜互联。', highlights: ['SFP', 'QSFP', 'Optical'] },
      { title: '服务器整机', description: '按业务场景提供整机与平台配置建议。', highlights: ['Rack Server', 'Custom Config', 'Project Delivery'] }
    ],
    solutions: [
      { title: '企业服务器运维保障', description: '围绕故障替换、备件补给与生命周期维护提供配件支持。' },
      { title: '数据中心升级改造', description: '在受控窗口内完成核心配件替换与性能升级。' },
      { title: 'AI 平台快速上线', description: '通过 GPU、网络与存储配件的组合加快算力部署。' },
      { title: '分支机构统一采购', description: '总部统一规格，分支同步供货，保证采购标准一致。' },
      { title: '项目型集中交付', description: '支持阶段性到货与批次验收，匹配大型项目施工节奏。' },
      { title: '长期框架协议供货', description: '按协议周期稳定供货，降低重复询价与采购管理成本。' }
    ],
    about: {
      intro: '罗斯柴智算专注服务器配件采购与供应，服务企业采购团队、系统集成商与数据中心项目，强调稳定供货、兼容适配与交付效率。',
      pillars: [
        { title: '采购导向', description: '围绕询价、比价、下单与交付等关键流程，提供可执行的采购方案。' },
        { title: '供应链协同', description: '整合多品牌与多渠道资源，提升交付稳定性并降低断供风险。' },
        { title: '项目落地能力', description: '支持从小批量试单到大批量交付的完整服务链路。' }
      ]
    },
    contact: {
      title: '联系罗斯柴智算',
      description: '欢迎提交采购需求、项目清单或合作计划，我们提供 7×24 小时快速响应。',
      responsePromise: '支持企业客户询价、批量采购与长期供货合作咨询。'
    }
  },
  en: {
    site: {
      companyName: 'ROTHSCHILD',
      companyNameEn: 'ROTHSCHILD',
      tagline: 'Server Component Sourcing and Supply Partner',
      emails: ['lisa@rothschildserver.com', 'asya@rothschildserver.com'],
      phones: ['+86 17815501272', '+86 13843373030'],
      address: 'Room 807, Block A, Hanyu Innovation Industrial Building, No. 7 Guansheng 4th Road, Luhu Community, Guanhu Street, Longhua District, Shenzhen, China'
    },
    home: {
      hero: {
        eyebrow: 'Enterprise Component Supply',
        title: 'Focused on Server Component Procurement and Stable Delivery',
        description: 'We support enterprise buyers, integrators, and data center projects with sustainable supply of CPU, GPU, NIC, optical modules, storage components, and complete servers.',
        primaryCta: 'View Product Center',
        secondaryCta: 'Contact Us Now'
      },
      capabilities: [
        { title: 'Spot and Scheduled Supply', description: 'Mix spot inventory and scheduled supply to reduce risk from single-channel sourcing.' },
        { title: 'Model Compatibility Check', description: 'Verify component-level compatibility against your existing platform before ordering.' },
        { title: 'Volume Pricing Strategy', description: 'Provide batch, quarterly, and annual purchasing strategies for better procurement efficiency.' },
        { title: 'Fast Replacement Response', description: 'Priority handling for urgent replacement and rapid expansion requirements.' },
        { title: 'Recurring Replenishment Plan', description: 'Build long-cycle replenishment plans for maintenance and project growth.' },
        { title: 'Delivery Tracking Loop', description: 'Track shipment, transit, and receiving milestones with clear procurement visibility.' }
      ],
      categories: [
        { title: 'Server CPU', description: 'Mainstream Intel Xeon and AMD EPYC generations.', highlights: ['Intel Xeon', 'AMD EPYC'] },
        { title: 'GPU Accelerator', description: 'For AI training, inference, and HPC nodes.', highlights: ['NVIDIA', 'Data Center GPU'] },
        { title: 'Network Interface Card', description: '10G/25G/40G/100G options for different network architectures.', highlights: ['Ethernet', 'RDMA'] },
        { title: 'Optical Module', description: 'For data center interconnect and backbone link upgrades.', highlights: ['SFP', 'QSFP'] },
        { title: 'Memory Module', description: 'DDR4/DDR5 server memory with practical capacity options.', highlights: ['ECC', 'Registered'] },
        { title: 'Enterprise SSD', description: 'Stable storage option for high IOPS and low-latency workloads.', highlights: ['NVMe', 'SATA'] },
        { title: 'Enterprise HDD', description: 'Large-capacity drives for archive and backup scenarios.', highlights: ['Nearline', 'SAS'] },
        { title: 'Complete Server System', description: 'Rack server supply and practical custom configuration support.', highlights: ['1U/2U', 'Custom Build'] }
      ],
      solutions: [
        { title: 'Data Center Expansion Procurement', description: 'Plan component lists by rack and node batches for phased expansion.' },
        { title: 'AI Compute Node Buildout', description: 'Align GPU, networking, and storage components for faster AI cluster launch.' },
        { title: 'Spare-Part Pool for Operations', description: 'Build spare pools for high-failure components to reduce downtime risk.' },
        { title: 'Integrator Project Sourcing', description: 'Centralized multi-brand sourcing support for system integrators.' },
        { title: 'Cross-Region Delivery Coordination', description: 'Parallel delivery support for multi-city deployments under one tracking flow.' },
        { title: 'Annual Framework Procurement', description: 'Lock resources by annual demand planning for better continuity and pricing.' }
      ],
      brands: ['Intel', 'AMD', 'NVIDIA', 'Samsung', 'Micron', 'Broadcom', 'Seagate', 'Western Digital']
    },
    products: [
      { title: 'Server CPU', description: 'Enterprise CPU sourcing with stable batch delivery.', highlights: ['Intel Xeon', 'AMD EPYC', 'Long-term Supply'] },
      { title: 'GPU Accelerator', description: 'Core compute components for AI and HPC projects.', highlights: ['Training', 'Inference', 'Data Center'] },
      { title: 'Memory Module', description: 'Server memory upgrade and capacity expansion options.', highlights: ['DDR4', 'DDR5', 'ECC'] },
      { title: 'Enterprise SSD', description: 'Storage acceleration for high-performance workloads.', highlights: ['NVMe', 'SATA', 'Enterprise'] },
      { title: 'Enterprise HDD', description: 'Large-capacity storage for archive and backup.', highlights: ['SAS', 'Nearline', 'High Capacity'] },
      { title: 'Network Interface Card', description: 'High-bandwidth, low-latency connectivity components.', highlights: ['10G-100G', 'Ethernet', 'RDMA'] },
      { title: 'Optical Module', description: 'Link upgrades and inter-rack optical connectivity.', highlights: ['SFP', 'QSFP', 'Optical'] },
      { title: 'Complete Server System', description: 'Complete server supply with practical platform suggestions.', highlights: ['Rack Server', 'Custom Config', 'Project Delivery'] }
    ],
    solutions: [
      { title: 'Enterprise Maintenance Assurance', description: 'Component support for replacement, replenishment, and lifecycle maintenance.' },
      { title: 'Data Center Upgrade Program', description: 'Upgrade key components during controlled service windows.' },
      { title: 'Fast AI Platform Launch', description: 'Accelerate AI deployments with coordinated GPU, network, and storage procurement.' },
      { title: 'Centralized Branch Procurement', description: 'Unified specs with synchronized supply for multiple branch offices.' },
      { title: 'Project-Based Batch Delivery', description: 'Support phased receiving and milestone-based acceptance.' },
      { title: 'Long-Term Framework Supply', description: 'Stable contract-based supply to reduce repetitive sourcing overhead.' }
    ],
    about: {
      intro: 'ROTHSCHILD focuses on server component procurement and supply for enterprise buyers, system integrators, and data center projects.',
      pillars: [
        { title: 'Procurement-Driven Service', description: 'Built around quotation, comparison, ordering, and delivery execution.' },
        { title: 'Supply Chain Coordination', description: 'Integrates multi-brand and multi-channel resources for stable fulfillment.' },
        { title: 'Project Execution Capability', description: 'Supports both pilot batches and large-scale project delivery.' }
      ]
    },
    contact: {
      title: 'Talk to ROTHSCHILD',
      description: 'Share your demand list, procurement schedule, or cooperation request. Our team provides 24/7 rapid response.',
      responsePromise: 'Support for enterprise inquiry, bulk procurement, and long-term supply cooperation.'
    }
  },
  ru: {
    site: {
      companyName: 'ROTHSCHILD',
      companyNameEn: 'ROTHSCHILD',
      tagline: 'Партнер по закупке и поставке серверных комплектующих',
      emails: ['lisa@rothschildserver.com', 'asya@rothschildserver.com'],
      phones: ['+86 17815501272', '+86 13843373030'],
      address: 'Офис 807, блок A, Hanyu Innovation Industrial Building, No. 7 Guansheng 4th Road, Luhu Community, Guanhu Street, Longhua District, Shenzhen, China'
    },
    home: {
      hero: {
        eyebrow: 'Корпоративные поставки',
        title: 'Закупка серверных комплектующих и стабильные поставки',
        description: 'Мы поддерживаем корпоративные закупки, интеграторов и проекты дата-центров: CPU, GPU, сетевые карты, оптические модули, накопители и серверы.',
        primaryCta: 'Смотреть продукты',
        secondaryCta: 'Связаться с нами сейчас'
      },
      capabilities: [
        { title: 'Склад и плановая поставка', description: 'Сочетание складских и плановых поставок снижает риск дефицита по одному каналу.' },
        { title: 'Проверка совместимости', description: 'Проверяем совместимость моделей с текущей платформой до размещения заказа.' },
        { title: 'Стратегия оптовой цены', description: 'Поддержка помесячного, квартального и годового планирования закупок.' },
        { title: 'Быстрая замена', description: 'Приоритетная обработка срочных запросов на замену и расширение.' },
        { title: 'План регулярного пополнения', description: 'Формируем цикл пополнения для эксплуатации и проектного роста.' },
        { title: 'Прозрачное отслеживание поставки', description: 'Контроль этапов от отгрузки до приемки для закупочной команды.' }
      ],
      categories: [
        { title: 'Серверные CPU', description: 'Основные поколения Intel Xeon и AMD EPYC.', highlights: ['Intel Xeon', 'AMD EPYC'] },
        { title: 'GPU-ускорители', description: 'Для AI-обучения, inference и HPC.', highlights: ['NVIDIA', 'Data Center GPU'] },
        { title: 'Сетевые карты', description: 'Опции 10G/25G/40G/100G под разные архитектуры.', highlights: ['Ethernet', 'RDMA'] },
        { title: 'Оптические модули', description: 'Для межстоечных соединений и апгрейда магистральных линий.', highlights: ['SFP', 'QSFP'] },
        { title: 'Модули памяти', description: 'Серверная память DDR4/DDR5 с разными емкостями.', highlights: ['ECC', 'Registered'] },
        { title: 'Корпоративные SSD', description: 'Надежные решения для высоконагруженных сред.', highlights: ['NVMe', 'SATA'] },
        { title: 'Корпоративные HDD', description: 'Большие объемы для архива и резервного копирования.', highlights: ['Nearline', 'SAS'] },
        { title: 'Серверы целиком', description: 'Поставка стоечных серверов и практичная кастомизация.', highlights: ['1U/2U', 'Custom Build'] }
      ],
      solutions: [
        { title: 'Расширение дата-центра', description: 'Планирование комплектующих по стойкам и партиям узлов.' },
        { title: 'Запуск AI-узлов', description: 'Согласование GPU, сети и хранения для быстрого ввода кластера.' },
        { title: 'Резерв комплектующих для эксплуатации', description: 'Формирование пула запасных частей для снижения простоев.' },
        { title: 'Закупка для интеграторов', description: 'Централизованная поставка мультибрендовых комплектующих.' },
        { title: 'Координация межрегиональной доставки', description: 'Единый трекинг для параллельных поставок в разные города.' },
        { title: 'Годовая рамочная закупка', description: 'Фиксация ресурсов под годовой план для стабильности и цены.' }
      ],
      brands: ['Intel', 'AMD', 'NVIDIA', 'Samsung', 'Micron', 'Broadcom', 'Seagate', 'Western Digital']
    },
    products: [
      { title: 'Серверные CPU', description: 'Корпоративные поставки CPU с устойчивой доступностью.', highlights: ['Intel Xeon', 'AMD EPYC', 'Long-term Supply'] },
      { title: 'GPU-ускорители', description: 'Ключевые вычислительные компоненты для AI и HPC.', highlights: ['Training', 'Inference', 'Data Center'] },
      { title: 'Модули памяти', description: 'Расширение памяти серверной платформы.', highlights: ['DDR4', 'DDR5', 'ECC'] },
      { title: 'Корпоративные SSD', description: 'Ускорение хранения для высоких нагрузок.', highlights: ['NVMe', 'SATA', 'Enterprise'] },
      { title: 'Корпоративные HDD', description: 'Емкие диски для архива и резервного копирования.', highlights: ['SAS', 'Nearline', 'High Capacity'] },
      { title: 'Сетевые карты', description: 'Высокоскоростное и низколатентное сетевое подключение.', highlights: ['10G-100G', 'Ethernet', 'RDMA'] },
      { title: 'Оптические модули', description: 'Оптические каналы для стоек и магистрали.', highlights: ['SFP', 'QSFP', 'Optical'] },
      { title: 'Серверы целиком', description: 'Поставка серверов с практичной конфигурацией.', highlights: ['Rack Server', 'Custom Config', 'Project Delivery'] }
    ],
    solutions: [
      { title: 'Поддержка корпоративной эксплуатации', description: 'Поставка для замены, пополнения и планового обслуживания.' },
      { title: 'Программа модернизации ЦОД', description: 'Обновление ключевых узлов в контролируемые сервисные окна.' },
      { title: 'Быстрый запуск AI-платформы', description: 'Согласованная закупка GPU, сети и хранения для ускорения запуска.' },
      { title: 'Централизованная закупка филиалов', description: 'Единые спецификации и синхронные поставки в филиалы.' },
      { title: 'Проектная партия поставки', description: 'Поддержка этапной приемки и поставки по вехам проекта.' },
      { title: 'Долгосрочный рамочный контракт', description: 'Стабильные договорные поставки без постоянного пересогласования.' }
    ],
    about: {
      intro: 'ROTHSCHILD специализируется на закупке и поставке серверных комплектующих для корпоративных заказчиков, интеграторов и проектов дата-центров.',
      pillars: [
        { title: 'Ориентация на закупку', description: 'Сервис построен вокруг запроса, сравнения, размещения заказа и поставки.' },
        { title: 'Координация цепочки поставок', description: 'Объединяем мультибрендовые и многоканальные ресурсы для устойчивой поставки.' },
        { title: 'Исполнение проектов', description: 'Поддерживаем как пилотные партии, так и крупные проектные поставки.' }
      ]
    },
    contact: {
      title: 'Связаться с ROTHSCHILD',
      description: 'Отправьте список потребностей, план закупки или запрос на сотрудничество. Мы обеспечиваем быстрый ответ 24/7.',
      responsePromise: 'Поддерживаем корпоративные запросы, оптовые закупки и долгосрочное сотрудничество.'
    }
  }
}

