<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosInstance from '@/libs/axios'

const hadith = ref([])

const getHadith = async () => {
  try {
    const response = await axiosInstance.get('https://api.alquran.cloud/v1/quran/quran-uthmani')
    hadith.value = response.data.data.surahs
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getHadith()
})
</script>

<template>
  <div class="container">
      <div v-if="hadith.length > 0">
        <div class="flex">
        <div v-for="j in hadith" :key="j.number">
          <div class="w-28">
            {{ j.englishName }}
          </div>
          </div>
        </div>
      </div>
  </div>
</template>
