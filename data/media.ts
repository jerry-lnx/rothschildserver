export const heroImage = '/images/hero/hero-main.jpg'

export const productImageBySlug: Record<string, string> = {
  'server-cpu': '/images/products/server-cpu.jpg',
  'gpu-accelerators': '/images/products/gpu-accelerators.jpg',
  'memory-modules': '/images/products/memory-modules.jpg',
  'enterprise-ssd': '/images/products/enterprise-ssd.jpg',
  'enterprise-hdd': '/images/products/enterprise-hdd.jpg',
  'network-interface': '/images/products/network-interface.jpg',
  'optical-modules': '/images/products/optical-modules.jpg',
  'server-systems': '/images/products/server-systems.jpg'
}

export const productGalleryImages = [
  productImageBySlug['server-cpu'],
  productImageBySlug['gpu-accelerators'],
  productImageBySlug['network-interface'],
  productImageBySlug['optical-modules'],
  productImageBySlug['memory-modules'],
  productImageBySlug['enterprise-ssd'],
  productImageBySlug['enterprise-hdd'],
  productImageBySlug['server-systems']
]

export const scenarioImageMap = {
  expansion: '/images/scenarios/data-center-expansion.jpg',
  ai: '/images/scenarios/ai-node-launch.jpg',
  maintenance: '/images/scenarios/maintenance-replenishment.jpg'
}

export const aboutImageMap = {
  team: '/images/about/about-team.jpg',
  supply: '/images/about/about-supply.jpg'
}

export const brandLogoMap: Record<string, string> = {
  Intel: '/images/brands/intel.svg',
  AMD: '/images/brands/amd.svg',
  NVIDIA: '/images/brands/nvidia.svg',
  Samsung: '/images/brands/samsung.svg',
  Micron: '/images/brands/micron.svg',
  Broadcom: '/images/brands/broadcom.svg',
  Seagate: '/images/brands/seagate.svg',
  'Western Digital': '/images/brands/western-digital.svg'
}
