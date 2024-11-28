<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axios from '@/libs/axios'
import { Search } from 'lucide-vue-next';

interface Surah {
  arti: string
  audioFull: Record<string, unknown> // More specific than Object
  deskripsi: string
  jumlahAyat: number
  nama: string
  namaLatin: string // Added missing property
  nomor: number
  tempatTurun: string
}

const searchQuery = ref<string>("")
const isLoading = ref(false)
const surah = ref<Surah[]>([])

const getSurahList = async () => {
  try {
    isLoading.value = true
    const response = await axios.get('https://equran.id/api/v2/surat').then((res: any) => {
      isLoading.value = false
      return res
    }).catch((err) => {
      console.error(err.response.data.message)
      isLoading.value = false
    })
    // Type assertion to ensure response.data.data matches Surah[]
    surah.value = response.data.data as Surah[]
  } catch (error) {
    console.error(error)
  }
}

const filtered = computed(() => {
  if(searchQuery.value == '') return surah.value
  
  const query = searchQuery.value.toLowerCase()

  return surah.value.filter((item: Surah) => {
    return (
      item.namaLatin.toLowerCase().includes(query) || item.tempatTurun.toLowerCase().includes(query)
    )
  })
})

onMounted(() => {
  getSurahList()
})
</script>

<template>
  <div class="flex flex-col pt-8 pb-16">
    <div class="flex-1 space-y-6">
      <div class="flex justify-center">
        <div class="w-128 sm:w-84 rounded-lg">
          <el-input v-model="searchQuery" :suffix-icon="Search" placeholder="Al-Fatihah, Al-Baqarah, etc." class="md:h-10 h-12 shadow-md" style="--el-color-primary: #16a34a;--el-input-border-radius: 10px;"/>  
        </div>
      </div> 
      <div v-if="filtered.length > 0">
        <div class="flex flex-wrap justify-center gap-7">
          <div v-for="item in filtered" :key="item.nomor">
            <router-link
              :to="{ name: 'quran.surah', query: { surah: item.namaLatin, surah_ke: item.nomor } }"
            >
              <div
                class="w-128 sm:w-84 p-4 rounded-md bg-white shadow-md flex flex-wrap gap-3 items-center justify-between"
              >
              <div class="flex gap-5 items-center">
                  <div>
                    {{ item.nomor }}
                  </div>
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                      <span class="font-semibold text-md md:text-sm">
                        {{ item.namaLatin }}
                      </span>
                      <span class="md:text-xs"> ( {{ item.arti }} ) </span>
                    </div>
                    <span class="">
                      {{ item.tempatTurun }} • {{ item.jumlahAyat }} Ayat
                    </span>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
      <div v-else class="flex justify-center">
        <span class="text-2xl font-medium">No Data Found</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-input--suffix {
  border-radius: 10px !important;
}
</style>