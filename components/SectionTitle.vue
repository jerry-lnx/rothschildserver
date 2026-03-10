<script setup lang="ts">
defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  tag?: 'h1' | 'h2' | 'h3'
  size?: 'default' | 'compact'
}>()
</script>

<template>
  <div
    class="section-title max-w-4xl"
    :class="align === 'left' ? '' : 'mx-auto text-center'"
  >
    <div class="space-y-3 sm:space-y-4">
      <div class="section-title-eyebrow-wrap" :class="align === 'left' ? '' : 'flex justify-center'">
        <div class="section-title-eyebrow inline-flex items-center gap-3">
          <span class="h-[3px] w-10 rounded-full bg-sky-500" />
          <span class="text-[0.9rem] font-semibold tracking-[0.08em] text-slate-700">
            {{ eyebrow }}
          </span>
        </div>
      </div>

      <component
        :is="tag ?? 'h2'"
        class="section-title-heading max-w-5xl tracking-[-0.03em] text-slate-950"
        :class="[
          size === 'compact'
            ? 'text-[1.4rem] font-semibold leading-[1.2] sm:text-[1.7rem] lg:text-[1.95rem]'
            : 'text-[1.8rem] font-bold leading-[1.12] sm:text-[2.15rem] lg:text-[2.45rem]',
          align === 'left' ? '' : 'mx-auto'
        ]"
      >
        {{ title }}
      </component>

      <p
        v-if="description"
        class="section-title-description max-w-3xl text-[0.95rem] leading-7 text-slate-600 sm:text-[1rem]"
        :class="align === 'left' ? '' : 'mx-auto'"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
