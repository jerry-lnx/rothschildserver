import type { LocaleCode, ProductDetailContent } from '~/types/content'

// 产品详情页使用的 slug 列表：
// - 路由生成（/products/[category]）
// - 内容查找与校验
export const productSlugs = [
  'server-cpu',
  'gpu-accelerators',
  'memory-modules',
  'enterprise-ssd',
  'enterprise-hdd',
  'network-interface',
  'optical-modules',
  'server-systems'
] as const

// 各语言下的产品详情主数据
// 每个条目通过 slug 与 productSlugs 及动态路由对应
export const productDetailsByLocale: Record<LocaleCode, ProductDetailContent[]> = {
  zh: [
    {
      slug: 'server-cpu',
      heroTitle: '服务器 CPU 采购与供货',
      heroDescription: '覆盖 Intel Xeon 与 AMD EPYC 多代平台，支持项目采购与长期补货。',
      useCases: ['服务器升级替换', '新增节点建设', '长期运维补件'],
      specs: ['Intel Xeon', 'AMD EPYC', '多平台兼容建议'],
      serviceNotes: ['按平台代际匹配', '支持批量采购', '支持长期供货']
    },
    {
      slug: 'gpu-accelerators',
      heroTitle: 'GPU 加速卡与 AI 算力节点',
      heroDescription: '面向 AI 训练、推理和并行计算场景的 GPU 配件供应支持。',
      useCases: ['AI 训练节点', '推理集群扩容', '高性能计算平台'],
      specs: ['数据中心 GPU', '功耗与散热建议', '机架部署适配'],
      serviceNotes: ['可按节点配比供货', '支持批次交付', '支持跨项目协同']
    },
    {
      slug: 'memory-modules',
      heroTitle: '服务器内存模块',
      heroDescription: '覆盖 DDR4/DDR5 内存规格，满足不同容量和稳定性要求。',
      useCases: ['内存扩容', '高并发业务优化', '存量设备升级'],
      specs: ['DDR4', 'DDR5', 'ECC/Registered'],
      serviceNotes: ['兼容性核验', '规格组合建议', '支持长期补货']
    },
    {
      slug: 'enterprise-ssd',
      heroTitle: '企业级 SSD',
      heroDescription: '适用于高 IOPS 与低时延场景的企业级 SSD 采购方案。',
      useCases: ['数据库加速', '虚拟化存储', '缓存层扩展'],
      specs: ['NVMe', 'SATA', '多容量版本'],
      serviceNotes: ['支持寿命规划建议', '支持接口兼容核验', '支持分批交付']
    },
    {
      slug: 'enterprise-hdd',
      heroTitle: '企业级 HDD',
      heroDescription: '面向归档、备份和海量数据存储的企业级硬盘供货。',
      useCases: ['备份存储扩容', '归档系统建设', '冷数据管理'],
      specs: ['SAS', 'Nearline', '高容量选型'],
      serviceNotes: ['支持容量规划', '适配 RAID 场景', '支持长期供货']
    },
    {
      slug: 'network-interface',
      heroTitle: '网卡与网络配件',
      heroDescription: '支持 10G/25G/40G/100G 网络方案，适配不同业务架构。',
      useCases: ['网络升级改造', '低时延互联', '多节点高带宽部署'],
      specs: ['Ethernet NIC', 'RDMA', '多接口形态'],
      serviceNotes: ['匹配现网接口', '支持批量部署', '支持项目交付']
    },
    {
      slug: 'optical-modules',
      heroTitle: '光模块与链路互联',
      heroDescription: '用于机房内部与跨机柜链路连接的光模块与配套方案。',
      useCases: ['机柜互联', '主干链路升级', '数据中心网络优化'],
      specs: ['SFP', 'QSFP', '速率适配建议'],
      serviceNotes: ['支持链路参数确认', '支持批次供货', '支持交付协同']
    },
    {
      slug: 'server-systems',
      heroTitle: '服务器整机与定制方案',
      heroDescription: '提供整机采购与场景化配置建议，支撑项目快速落地。',
      useCases: ['新项目部署', '旧平台替换', '分阶段扩容'],
      specs: ['1U/2U 机架式', '定制化配置', '多平台可选'],
      serviceNotes: ['可按项目阶段交付', '支持配置建议', '支持长期运维补件']
    }
  ],
  en: [
    {
      slug: 'server-cpu',
      heroTitle: 'Server CPU Sourcing and Supply',
      heroDescription: 'Covers Intel Xeon and AMD EPYC generations for both project procurement and recurring replenishment.',
      useCases: ['Server refresh', 'New node deployment', 'Ongoing maintenance supply'],
      specs: ['Intel Xeon', 'AMD EPYC', 'Platform compatibility guidance'],
      serviceNotes: ['Generation-based matching', 'Batch procurement support', 'Long-term availability']
    },
    {
      slug: 'gpu-accelerators',
      heroTitle: 'GPU Accelerators for AI Compute',
      heroDescription: 'GPU component supply for AI training, inference, and parallel computing workloads.',
      useCases: ['AI training nodes', 'Inference cluster expansion', 'HPC platforms'],
      specs: ['Data center GPU', 'Power and thermal guidance', 'Rack deployment fit'],
      serviceNotes: ['Node-level allocation support', 'Batch delivery support', 'Multi-project coordination']
    },
    {
      slug: 'memory-modules',
      heroTitle: 'Server Memory Modules',
      heroDescription: 'DDR4/DDR5 memory options for different capacity and stability requirements.',
      useCases: ['Memory expansion', 'High-concurrency optimization', 'Installed-base upgrade'],
      specs: ['DDR4', 'DDR5', 'ECC/Registered'],
      serviceNotes: ['Compatibility verification', 'Spec combination guidance', 'Recurring supply support']
    },
    {
      slug: 'enterprise-ssd',
      heroTitle: 'Enterprise SSD',
      heroDescription: 'Enterprise SSD sourcing for high-IOPS and low-latency workloads.',
      useCases: ['Database acceleration', 'Virtualization storage', 'Cache layer expansion'],
      specs: ['NVMe', 'SATA', 'Multiple capacities'],
      serviceNotes: ['Lifecycle planning support', 'Interface compatibility check', 'Phased delivery support']
    },
    {
      slug: 'enterprise-hdd',
      heroTitle: 'Enterprise HDD',
      heroDescription: 'Reliable high-capacity HDD supply for archive, backup, and large-data retention.',
      useCases: ['Backup expansion', 'Archive platform buildout', 'Cold data management'],
      specs: ['SAS', 'Nearline', 'High-capacity options'],
      serviceNotes: ['Capacity planning support', 'RAID scenario support', 'Long-term supply']
    },
    {
      slug: 'network-interface',
      heroTitle: 'Network Interface and Connectivity',
      heroDescription: '10G/25G/40G/100G network component options for different architecture requirements.',
      useCases: ['Network upgrade', 'Low-latency interconnect', 'High-bandwidth multi-node deployment'],
      specs: ['Ethernet NIC', 'RDMA', 'Multiple interface forms'],
      serviceNotes: ['Match existing interface', 'Batch deployment support', 'Project delivery support']
    },
    {
      slug: 'optical-modules',
      heroTitle: 'Optical Modules and Link Interconnect',
      heroDescription: 'Optical module supply for intra-rack and cross-rack link connectivity.',
      useCases: ['Rack interconnect', 'Backbone link upgrade', 'Data center network optimization'],
      specs: ['SFP', 'QSFP', 'Rate adaptation guidance'],
      serviceNotes: ['Link parameter validation', 'Batch supply support', 'Delivery coordination']
    },
    {
      slug: 'server-systems',
      heroTitle: 'Complete Server Systems',
      heroDescription: 'Complete server procurement with scenario-based configuration guidance.',
      useCases: ['New project rollout', 'Legacy platform replacement', 'Phased capacity expansion'],
      specs: ['1U/2U rack servers', 'Custom configurations', 'Multi-platform options'],
      serviceNotes: ['Phased project delivery', 'Config planning support', 'Long-term maintenance support']
    }
  ],
  ru: [
    {
      slug: 'server-cpu',
      heroTitle: 'Закупка серверных CPU',
      heroDescription: 'Покрытие поколений Intel Xeon и AMD EPYC для проектных и регулярных поставок.',
      useCases: ['Обновление серверов', 'Развертывание новых узлов', 'Поставка для эксплуатации'],
      specs: ['Intel Xeon', 'AMD EPYC', 'Рекомендации по совместимости'],
      serviceNotes: ['Подбор по поколению', 'Поддержка оптовых закупок', 'Долгосрочная доступность']
    },
    {
      slug: 'gpu-accelerators',
      heroTitle: 'GPU-ускорители для AI',
      heroDescription: 'Поставка GPU-компонентов для обучения, inference и параллельных вычислений.',
      useCases: ['AI-обучение', 'Расширение inference-кластера', 'HPC-сценарии'],
      specs: ['GPU для дата-центров', 'Рекомендации по питанию и охлаждению', 'Совместимость со стойкой'],
      serviceNotes: ['Подбор на уровне узла', 'Поставка партиями', 'Поддержка мультипроектов']
    },
    {
      slug: 'memory-modules',
      heroTitle: 'Серверные модули памяти',
      heroDescription: 'Опции DDR4/DDR5 для различных требований по емкости и стабильности.',
      useCases: ['Расширение памяти', 'Оптимизация высокой нагрузки', 'Модернизация существующей базы'],
      specs: ['DDR4', 'DDR5', 'ECC/Registered'],
      serviceNotes: ['Проверка совместимости', 'Рекомендации по комбинациям', 'Регулярное пополнение']
    },
    {
      slug: 'enterprise-ssd',
      heroTitle: 'Корпоративные SSD',
      heroDescription: 'Закупка SSD для высоких IOPS и низкой задержки.',
      useCases: ['Ускорение баз данных', 'Хранилище виртуализации', 'Расширение кэша'],
      specs: ['NVMe', 'SATA', 'Разные емкости'],
      serviceNotes: ['Планирование ресурса', 'Проверка интерфейсов', 'Поставка партиями']
    },
    {
      slug: 'enterprise-hdd',
      heroTitle: 'Корпоративные HDD',
      heroDescription: 'Надежные емкие HDD для архива, бэкапа и хранения больших данных.',
      useCases: ['Расширение резервного копирования', 'Архивные платформы', 'Холодные данные'],
      specs: ['SAS', 'Nearline', 'Высокая емкость'],
      serviceNotes: ['Планирование емкости', 'Поддержка RAID-сценариев', 'Долгосрочная поставка']
    },
    {
      slug: 'network-interface',
      heroTitle: 'Сетевые карты и подключение',
      heroDescription: 'Компоненты 10G/25G/40G/100G под разные архитектуры сети.',
      useCases: ['Апгрейд сети', 'Низкая задержка', 'Высокая пропускная способность'],
      specs: ['Ethernet NIC', 'RDMA', 'Разные форм-факторы'],
      serviceNotes: ['Совместимость с текущим интерфейсом', 'Поддержка массового развертывания', 'Проектная поставка']
    },
    {
      slug: 'optical-modules',
      heroTitle: 'Оптические модули',
      heroDescription: 'Поставка модулей для внутристоечных и межстоечных соединений.',
      useCases: ['Соединение стоек', 'Апгрейд магистрали', 'Оптимизация сети ЦОД'],
      specs: ['SFP', 'QSFP', 'Рекомендации по скорости'],
      serviceNotes: ['Проверка параметров канала', 'Поставка партиями', 'Координация доставки']
    },
    {
      slug: 'server-systems',
      heroTitle: 'Серверы целиком',
      heroDescription: 'Поставка серверов с рекомендациями по конфигурации под задачу.',
      useCases: ['Запуск новых проектов', 'Замена старых платформ', 'Поэтапное расширение'],
      specs: ['Стоечные 1U/2U', 'Кастомные конфигурации', 'Разные платформы'],
      serviceNotes: ['Поэтапная поставка', 'Поддержка планирования', 'Поддержка эксплуатации']
    }
  ]
}
