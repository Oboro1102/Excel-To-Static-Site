<script setup lang="ts">
interface Props {
  背景?: string,
  標題?: string,
  內容?: string[],
}

// state
const props = withDefaults(defineProps<Props>(), {})
</script>

<template>
  <section class="w-full sm:px-[10vw] px-6 py-12" :style="{
    background: `${props['背景']} no-repeat center / cover`
  }">
    <div class="mb-10 last:mb-0">
      <h3 class="w-full mx-auto mb-6 px-4 text-center text-4xl font-bold" v-text="props['標題']" />
      <ol class="w-full mx-auto pl-5 list-decimal table-fixed break-words break-normal text-justify"
        style="text-justify: inter-ideograph">
        <li v-for="(content, index) in props['內容']" :key="index" class="mb-2 last:mb-0 text-lg" v-text="content" />
      </ol>
    </div>
  </section>
</template>