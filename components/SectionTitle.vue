<script setup lang="ts">
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
    <div class="space-y-4 sm:space-y-5">
      <div :class="align === 'left' ? '' : 'flex justify-center'">
        <div class="inline-flex items-center gap-3">
          <span class="h-[3px] w-10 rounded-full bg-sky-500" />
          <span class="text-[0.95rem] font-semibold tracking-[0.08em] text-slate-700">
            {{ eyebrow }}
          </span>
        </div>
      </div>

      <h2
        class="max-w-5xl text-[2.05rem] font-extrabold leading-[1.08] tracking-[-0.03em] text-slate-950 sm:text-[2.55rem] lg:text-[2.95rem]"
        :class="align === 'left' ? '' : 'mx-auto'"
      >
        {{ title }}
      </h2>

      <p
        v-if="description"
        class="max-w-3xl text-[1.02rem] leading-8 text-slate-600 sm:text-[1.08rem]"
        :class="align === 'left' ? '' : 'mx-auto'"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
