<script setup lang="ts">
import { reactive, onMounted, onBeforeUnmount } from 'vue'
import { useStore } from './store'
import * as XLSX from 'xlsx'
import { useHead } from 'unhead'
import KeyVision from './components/KeyVision.vue'
import EventSection from './components/EventSection.vue'
import ActivitiesMethodSection from './components/ActivitiesMethodSection.vue'
import Footer from './components/Footer.vue'

// state
const store = useStore()
const pageData: any = reactive({})

const metaInfo = (source: { 網站標題?: string, 網站描述?: string, 網站縮圖?: string, 版權文字?: string }) => {
  const data = {
    title: source['網站標題'],
    meta: [
      {
        name: 'copyright',
        content: source['版權文字']
      },
      {
        property: 'og:title',
        content: source['網站標題']
      },
      {
        name: 'description',
        content: source['網站描述']
      },
      {
        property: 'og:description',
        content: source['網站描述']
      },
      {
        property: 'og:image',
        content: source['網站縮圖']
      }
    ]
  }

  return useHead(data)
}

// methods
const detectWindowWidth = () => {
  return store.setWindowWidth(window.innerWidth)
}

const mappingData = async () => {
  const dataLocation = `${location.origin}${location.pathname.split('/index.html')[0]}/data.xlsx`
  await fetch(dataLocation)
    .then((response) => response.arrayBuffer())
    .then((buffer) => {
      const data = XLSX.read(buffer, {
        type: 'binary'
      })
      const source: any = {}

      for (let index = 0; index < data.SheetNames.length; index++) {
        source[data.SheetNames[index]] = XLSX.utils.sheet_to_json(
          data.Sheets[data.SheetNames[index]]
        )
      }

      return source
    })
    .then((xlsxData) => {
      const data: any = {}

      // 整理Excel資料
      if (xlsxData['SEO設定']?.length > 0) {
        Object.assign(data, xlsxData['SEO設定'][0])
        metaInfo(data)
      }
      if (xlsxData['主視覺設定']?.length > 0) {
        Object.assign(data, xlsxData['主視覺設定'][0])
      }

      if (xlsxData['頁腳設定']?.length > 0) {
        Object.assign(data, xlsxData['頁腳設定'][0])
      }

      if (xlsxData['行銷活動']?.length > 0) {
        data['行銷活動'] = {
          行銷區塊背景: xlsxData['行銷活動'][0]['行銷區塊背景'],
          行銷活動: xlsxData['行銷活動']
        }
      }

      const ActivitiesMethodCount = Object.keys(xlsxData).filter((item) => {
        return item.includes('活動辦法')
      }).length
      if (ActivitiesMethodCount > 0) {
        data['活動辦法'] = {
          標題: xlsxData['活動辦法'][0]['標題'],
          背景: xlsxData['活動辦法'][0]['背景'],
          內容: xlsxData['活動辦法'].map((item: any) => {
            return item['內容']
          })
        } as {
          標題: string,
          背景: string,
          內容: string[]
        }
      }

      return Object.assign(pageData, data)
    })
}

mappingData()

// life cycle
onMounted(() => {
  detectWindowWidth()
  window.addEventListener('resize', () => {
    detectWindowWidth()
  })
})
onBeforeUnmount(() => {
  window.addEventListener('resize', () => {
    detectWindowWidth()
  })
})
</script>

<template>
  <KeyVision :keyVisual="pageData['主視覺']" :keyVisualMobile="pageData['手機版主視覺']" :title="pageData['活動標題']"
    :content="pageData['活動內容']" />
  <EventSection v-if="pageData['行銷活動']" v-bind="pageData['行銷活動']" />
  <ActivitiesMethodSection v-if="pageData['活動辦法']" v-bind="pageData['活動辦法']" />
  <Footer v-bind="{
      url: pageData['首頁連結'],
      logo: pageData['頁腳LOGO圖檔'],
      alt: pageData['頁腳LOGO圖檔敘述'],
      background: pageData['頁腳背景'],
      copyright: pageData['版權文字'],
      facebook: pageData['FB粉絲團連結'],
      instagram: pageData['IG連結']
    }" />
</template>