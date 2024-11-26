<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/libs/axios'

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

const surah = ref<Surah[]>([])

const getSurahList = async () => {
  try {
    const response = await axios.get('https://equran.id/api/v2/surat')
    // Type assertion to ensure response.data.data matches Surah[]
    surah.value = response.data.data as Surah[]
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
    <div class="flex-1">
      <div v-if="surah.length > 0">
        <div class="flex flex-wrap justify-center gap-3">
          <div v-for="item in surah" :key="item.nomor">
            <router-link
              :to="{ name: 'quran.surah', query: { surah: item.namaLatin, surah_ke: item.nomor } }"
            >
              <div
                class="w-128 md:w-80 p-2.5 border-2 rounded border-green-700 dark:border-border flex flex-wrap gap-3 items-center justify-between"
              >
                <div class="flex gap-5 items-center">
                  <div>
                    {{ item.nomor }}
                  </div>
                  <div class="flex flex-col">
                    <div class="flex gap-2 items-center">
                      <span class="font-semibold text-md">
                        {{ item.namaLatin }}
                      </span>
                      <span class="dark:text-gray-500"> ( {{ item.arti }} ) </span>
                    </div>
                    <span class="dark:text-gray-500">
                      {{ item.tempatTurun }} • {{ item.jumlahAyat }} Ayat
                    </span>
                  </div>
                </div>
                <div class="">
                  <span>
                    {{ item.nama }}
                  </span>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
