<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axiosInstance from '@/libs/axios'

interface Surah {
  arti: string;
  audioFull: Object;
  deskripsi: string;
  jumlahAyat: number;
  nama: string;
  nomor: number;
  tempatTurun: string
}

const surah = ref<Surah>([])
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
    <div class="flex-1">
      <div v-if="surah.length > 0">
        <div class="flex flex-wrap justify-center gap-3">
          <div v-for="j in surah" :key="j?.nomor">
            <router-link :to="{ name: 'quran.surah', query: {surah: j?.namaLatin, surah_ke: j?.nomor} }">
              <div class="w-128 p-2.5 border-2 rounded border-green-700 dark:border-border flex gap-3 items-center justify-between">
                <div class="flex gap-5 items-center">
                <div>
                    {{ j?.nomor }}
                </div>
                <div class="flex flex-col">
                  <div class="flex gap-2 items-center">
                    <span class="font-semibold text-md">
                      {{ j?.namaLatin }} 
                    </span>
                    <span class="dark:text-gray-500">
                      ( {{ j?.arti }} )
                    </span>
                  </div>
                  <span class="dark:text-gray-500">
                    {{ j?.tempatTurun }} • {{ j?.jumlahAyat }} Ayat
                  </span>
                </div>
              </div>
                <div class="">
                  <span>
                    {{ j?.nama }}
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
