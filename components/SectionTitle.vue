<script setup lang="ts">
// 通用模块标题组件
// - eyebrow: 模块名，例如“产品展示”“解决方案”
// - title: 主标题
// - description: 副标题/补充说明
// - align: 对齐方式，首页和内页都可复用
defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}>()
</script>

<template>
  <div
    class="max-w-4xl"
    :class="align === 'left' ? '' : 'mx-auto text-center'"
  >
    <div class="space-y-5 sm:space-y-6">
      <div :class="align === 'left' ? '' : 'flex justify-center'">
        <div class="inline-flex items-center gap-3 rounded-2xl border border-slate-200/80 bg-white/92 px-3.5 py-2 shadow-[0_14px_34px_rgba(148,163,184,0.12)] backdrop-blur-sm">
          <span class="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#2563eb,#60a5fa)] shadow-[0_10px_24px_rgba(59,130,246,0.28)]">
            <span class="h-2.5 w-2.5 rounded-full bg-white/95" />
          </span>
          <span class="text-[0.88rem] font-semibold tracking-[0.16em] text-slate-500">
            {{ eyebrow }}
          </span>
        </div>
      </div>

      <div class="space-y-4">
        <h2
          class="max-w-4xl text-[2rem] font-semibold leading-[1.08] tracking-[-0.05em] text-slate-950 sm:text-[2.5rem] lg:text-[3rem]"
          :class="align === 'left' ? '' : 'mx-auto'"
        >
          {{ title }}
        </h2>

        <p
          v-if="description"
          class="max-w-2xl text-[1rem] leading-8 text-slate-600 sm:text-[1.05rem]"
          :class="align === 'left' ? '' : 'mx-auto'"
        >
          {{ description }}
        </p>
      </div>
    </div>
  </div>
</template>
