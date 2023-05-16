<script setup lang="ts">
interface Props {
  url?: string,
  logo?: string,
  alt?: string,
  facebook?: string,
  instagram?: string,
  background?: string,
  copyright?: string
}

// state
const props = withDefaults(defineProps<Props>(), {
  alt: '官方網站',
  background: '#0f172a'
})
</script>

<template>
  <footer class="w-full">
    <div class="flex flex-col items-center justify-center w-full py-8 px-4 text-xs text-white" :style="{
      background: props.background
    }">
      <a :href="props.url" target="_blank" rel="noopener noreferrer">
        <img :src="props.logo" :alt="props.alt" />
      </a>
      <ul class="flex items-center justify-around min-w-[75px] mt-4" v-if="props.facebook || props.instagram">
        <li v-if="props.facebook">
          <a :href="props.facebook" target="_blank" rel="noopener noreferrer"><i class="gg-facebook" /></a>
        </li>
        <li v-if="props.instagram">
          <a :href="props.instagram" target="_blank" rel="noopener noreferrer"><i class="gg-instagram" /></a>
        </li>
      </ul>
      <span class="mt-4" v-text="props.copyright" />
    </div>
  </footer>
</template>
