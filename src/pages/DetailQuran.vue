<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/libs/axios'
import { useRoute } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const route = useRoute()

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
  try {
    const response = await axios.get(`https://equran.id/api/v2/surat/${nomor}`)
    surah.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getSurah(route.query.surah_ke)
})
</script>

<template>
  <div class="flex-col">
    <div class="flex justify-between">
      <input
        type="search"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-0 focus:border focus:outline-none block w-56 p-2.5"
        placeholder=" Cari Ayat.."
        name=""
        id=""
      />
    </div>
    <div v-for="ayat in surah.ayat" :key="ayat.nomorAyat">
      <div class="">
        <div class="flex flex-col gap-3 px-3 py-5 my-5 rounded-md bg-white shadow-md">
          <div class="flex flex-col gap-5 px-2">
            <div class="rounded-full flex justify-center items-center border border-black w-9 h-9">
              {{ ayat.nomorAyat }}
            </div>
            <span class="text-3xl md:text-2xl text-right">
              {{ ayat.teksArab }}
            </span>
          </div>
          <span> {{ ayat.teksIndonesia }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
