<script setup lang="ts">
import { computed } from "vue"
import { useStore } from '../store'

const store = useStore()

interface Props {
  keyVisual?: string,
  keyVisualMobile?: string,
  title?: string,
  content?: string
}

// state
const props = withDefaults(defineProps<Props>(), {})
const windowWidth = computed((): number => store.windowWidth)
</script>

<template>
  <header
    class="relative z-0 w-full min-h-screen sm:px-[10vw] px-6 flex flex-col items-center justify-center text-white overflow-hidden">
    <div
      class="absolute w-full h-full top-0 left-0 -z-10 content-[''] bg-cover bg-center bg-[rgba(0,0,0,.45)] bg-blend-multiply backgroundAnimation"
      :style="{
        backgroundImage: `url(${windowWidth > 768
          ? props.keyVisual
          : props.keyVisualMobile})`
      }" />
    <h1 class="lg:text-[7vw] text-7xl font-black mb-4 textShadow" v-text="props.title" />
    <p class="text-2xl font-bold textShadow" v-text="props.content" />
  </header>
</template>

<style lang="css" scoped>
@keyframes zooming {
  0% {
    transform: scale(1.25);
  }

  50% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.25);
  }
}

.backgroundAnimation {
  animation-name: zooming;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.textShadow {
  text-shadow: 0 0 0.1em black
}
</style>