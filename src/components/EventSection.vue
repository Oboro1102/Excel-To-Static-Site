<script setup lang="ts">
import { computed, ref, onBeforeMount } from "vue"
import { useStore } from '../store'

const store = useStore()

interface Props {
  行銷區塊背景?: string,
  行銷活動?: {
    行銷項目?: string,
    行銷活動簡述?: string,
    行銷活動配圖?: string,
  }[]
}

// state
const props = withDefaults(defineProps<Props>(), {})
const windowWidth = computed((): number => store.windowWidth)
const slide = ref<HTMLElement | any>(null)
const dragging = ref<boolean>(false)
const scrollCurrentPoint = ref<number>(0)
const currentSlideScrollLeft = ref<number>(0)
const browserVendor = ref<string>('')
const isSafari = computed((): boolean => browserVendor.value.includes('Apple'))


// methods
const setScrollStartPoint = (event: any, type: string) => {
  dragging.value = type === 'start'
  scrollCurrentPoint.value = event.clientX || event.changedTouches[0].clientX
  if (slide.value) {
    currentSlideScrollLeft.value = slide.value.scrollLeft
  }
}
const scrollSlide = (event: any, count = 1) => {
  const offset =
    currentSlideScrollLeft.value -
    ((event.clientX || event.changedTouches[0].clientX) -
      scrollCurrentPoint.value)
  if (dragging.value) {
    if (offset < currentSlideScrollLeft.value) {
      triggerSlide('previous', count)
    } else {
      triggerSlide('next', count)
    }
  }
}
const triggerSlide = (type: string, count = 1) => {
  const itemWidth = Number(windowWidth) >= 786 ? 308 : 270
  const gap = Number(windowWidth) >= 786 ? 20 : 8
  let leftOffset = null
  if (slide.value) {
    const { scrollLeft, scrollWidth, clientWidth } = slide.value
    if (type === 'previous' && scrollLeft >= 0) {
      leftOffset = scrollLeft - (itemWidth + gap) * count
    } else if (type === 'next' && scrollLeft <= scrollWidth - clientWidth) {
      leftOffset = scrollLeft + (itemWidth + gap) * count
    }

    if (isSafari.value) {
      slide.value.classList.remove('slide--scrollHidden')
      slide.value.scrollTo({
        left: leftOffset,
        behavior: 'smooth'
      })
      setTimeout(() => {
        slide.value?.classList.add('slide--scrollHidden')
      }, 1000)
    } else {
      slide.value.scrollTo({
        left: leftOffset,
        behavior: 'smooth'
      })
    }
  }
}

// life cycle
onBeforeMount(() => {
  const { vendor } = navigator
  browserVendor.value = vendor
})
</script>

<template>
  <section class="w-full sm:px-[10vw] px-6 py-12 overflow-hidden" :style="{
    background: `${props['行銷區塊背景']} no-repeat center / cover`
  }">
    <div class="relative flex items-center" @mousedown="setScrollStartPoint($event, 'start')"
      @touchstart="setScrollStartPoint($event, 'start')" @mousemove="scrollSlide($event, windowWidth >= 1200 ? 4 : 1)"
      @touchmove="scrollSlide($event, windowWidth >= 1200 ? 4 : 1)" @mouseup="setScrollStartPoint($event, 'end')"
      @touchend="setScrollStartPoint($event, 'end')">
      <div
        class="p-2 rounded-full bg-white sm:block hidden absolute bottom-1/2 -left-12 translate-y-1/2 z-10 drop-shadow-md cursor-pointer"
        @click="triggerSlide('previous', windowWidth >= 1200 ? 4 : 1)">
        <i class="gg-chevron-left" />
      </div>
      <div
        class="p-2 rounded-full bg-white sm:block hidden absolute bottom-1/2 -right-12 translate-y-1/2 z-10 drop-shadow-md cursor-pointer"
        @click="triggerSlide('next', windowWidth >= 1200 ? 4 : 1)">
        <i class="gg-chevron-right" />
      </div>
      <ul ref="slide" class="flex w-full p-0 m-0 cursor-grab overflow-auto slide--scrollHidden">
        <li v-for="(item, index) in props['行銷活動']" :key="index"
          class="sm:mx-2 mx-5 bg-white rounded-lg p-4 md:min-w-[308px] min-w-[270px] drop-shadow-md">
          <img :src="item['行銷活動配圖']">
          <h6 class="mt-4 mb-2 text-gray-800 text-xl font-bold" v-text="item['行銷項目']" />
          <p class="mb-0" v-text="item['行銷活動簡述']" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="css">
.slide--scrollHidden {
  overflow: hidden;
}
</style>