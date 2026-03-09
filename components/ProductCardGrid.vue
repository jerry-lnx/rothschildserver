<script setup lang="ts">
import type { ProductCategory } from '~/types/content'

defineProps<{
  items: ProductCategory[]
}>()
</script>

<template>
  <div class="grid gap-4 lg:grid-cols-2">
    <article
      v-for="item in items"
      :key="item.title"
      class="panel p-6"
    >
      <h3 class="text-xl font-semibold text-slate-900">{{ item.title }}</h3>
      <p class="mt-3 text-sm leading-7 text-stone-300">{{ item.description }}</p>
      <div class="mt-4 flex flex-wrap gap-2">
        <span
          v-for="highlight in item.highlights"
          :key="highlight"
          class="rounded-full border border-amber-200/15 bg-amber-400/10 px-3 py-1 text-xs text-amber-100"
        >
          {{ highlight }}
        </span>
      </div>
    </article>
  </div>
</template>
