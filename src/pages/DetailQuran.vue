<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import axios from '@/libs/axios'
import { useRoute } from 'vue-router'
import { ArrowLeft, Search } from 'lucide-vue-next'

const route = useRoute()
const searchQuery = ref<string>("")
const isLoading = ref(false)

interface Ayat {
  audio: Object
  nomorAyat: number
  teksArab: string
  teksIndonesia: string
  teksLatin: string
}

interface Surah {
  arti: string
  ayat: Ayat[]
  audioFull: Record<string, unknown>
  deskripsi: string
  nama: string
  namaLatin: string
  nomor: number
  tempatTurun: string
}

const surah = ref<Surah>({} as Surah)
const tafsir = ref({})

async function getSurah(nomor: any) {
  isLoading.value = true
  try {
    const response = await axios.get(`https://equran.id/api/v2/surat/${nomor}`)
    surah.value = response.data.data
    isLoading.value = false
  } catch (error) {
    isLoading.value = false
    console.error(error)
  }
}

function scrollToAyat(ayatNumber: string) {
  const ayatElement = document.getElementById(ayatNumber)
  if (ayatElement) {
    ayatElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

watch(searchQuery, (newQuery) => {
  if (!isNaN(Number(newQuery))) {
    scrollToAyat(newQuery)
  }
})

onMounted(() => {
  getSurah(route.query.surah_ke)
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="flex-col">
    <div class="w-56 rounded-lg">
      <el-input v-model="searchQuery" :suffix-icon="Search" placeholder="Cari Ayat" class="shadow-md h-10"
        style="--el-color-primary: #16a34a;--el-input-border-radius: 10px;" />
    </div>
    <section v-if="!isLoading">
      <div v-if="surah.nomor != 1"
        class="py-8 bg-white rounded-lg flex flex-col items-center gap-5 text-gray-700 mt-4 shadow-md">
        <span class="text-4xl">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</span>
        <span class="font-medium">bismillāhir-raḥmānir-raḥīm(i)</span>
      </div>
      <div v-for="ayat in surah.ayat" :key="ayat.nomorAyat">
        <div class="">
          <div :id="ayat.nomorAyat.toString()" class="flex flex-col gap-3 md:gap-4 px-3 py-5 my-5 rounded-md bg-white shadow-md">
            <div class="flex flex-col gap-5 px-2">
              <div class="rounded-full flex justify-center items-center border border-black w-9 h-9 md:w-7 md:h-7 md:text-xs">
                {{ ayat.nomorAyat }}
              </div>
              <span class="text-3xl md:text-2xl text-right">
                {{ ayat.teksArab }}
              </span>
            </div>x
            <div class="flex flex-col gap-2">
              <span class="md:text-sm"> {{ ayat.teksLatin }} </span>
              <!-- <span> {{ ayat.nomorAyat }}. {{ ayat.teksIndonesia }} </span> -->
            </div>
          </div>
        </div>
      </div>
    </section>
    <div v-else class="flex justify-center">
      <span class="text-2xl font-medium animate-pulse">Loading...</span>
    </div>
  </div>
</template>

<style></style>

<style scoped>
.el-input--suffix {
  border-radius: 10px !important;
}
</style>