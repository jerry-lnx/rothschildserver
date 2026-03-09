<script setup lang="ts">
import type { SolutionItem } from '~/types/content'

// 解决方案网格组件
defineProps<{
  items: SolutionItem[]
}>()
</script>

<template>
  <div class="stagger-grid grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    <article
      v-for="item in items"
      :key="item.title"
      class="rounded-[1.35rem] border border-slate-200 bg-white p-5 shadow-[0_10px_24px_rgba(148,163,184,0.1)] sm:p-6"
    >
      <div class="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
        <svg class="h-5 w-5" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M4 10h12" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
          <path d="M10 4v12" stroke="currentColor" stroke-linecap="round" stroke-width="1.8" />
        </svg>
      </div>
      <h3 class="text-lg font-semibold text-slate-900">{{ item.title }}</h3>
      <p class="mt-3 text-sm leading-7 text-slate-600">{{ item.description }}</p>
    </article>
  </div>
</template>
