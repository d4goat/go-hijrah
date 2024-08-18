<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosInstance from '@/libs/axios'

const surah = ref([])
const tafsir = ref([])

const getSurahList = async () => {
  try {
    const response = await axiosInstance.get('https://equran.id/api/v2/surat')
    surah.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getSurahList()
})
</script>

<template>
  <div class="flex flex-col">
    <div class="flex-1 p-4">
      <div v-if="surah.length > 0">
        <div class="flex flex-wrap gap-4">
          <div v-for="j in surah" :key="j.nomor" class="flex-none w-36 p-2 rounded">
            <router-link :to="{ name: 'quran.surah', query: {surah: j.namaLatin, surah_ke: j.nomor} }" > {{ j.namaLatin }} </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
