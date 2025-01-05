<template>
  <div class="bg-gradient-to-b from-green-100 via-[#CBEDD5] to-green-600/30">
    <div class="container flex flex-col items-center pt-24 px-4">
      <TransitionRoot appear :show="isVisible" as="template">
        <div class="max-w-4xl mx-auto text-center space-y-10">
          <!-- Hero Title -->
          <div class="space-y-4">
            <TransitionChild
              as="template"
              enter="transform transition duration-1000"
              enter-from="opacity-0 translate-y-4"
              enter-to="opacity-100 translate-y-0"
              leave="transform duration-300 transition ease-in-out"
              leave-from="opacity-100 translate-y-0"
              leave-to="opacity-0 translate-y-4"
            >
              <div class="relative">
                <div
                  class="text-5xl lg:text-2xl font-semibold lg:font-semibold leading-tight tracking-wide capitalize mb-3 text-gray-800"
                >
                  Genggam Cahaya Islam di Ujung Jari dengan
                  <span
                    class="relative z-10 font-bold text-emerald-600 hover:text-emerald-700 transition-colors duration-300"
                  >
                    Go Hijrah
                  </span>
                </div>
              </div>
            </TransitionChild>

            <!-- Subtitle -->
            <TransitionChild
              as="template"
              enter="transform transition duration-1000 delay-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="transform duration-300 transition ease-in-out"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div class="space-y-3 md:space-y-1">
                <p class="font-medium text-xl md:text-sm capitalize text-gray-700">
                  Dapatkan Kebutuhan Islamimu Dengan Go Hijrah
                </p>
                <p class="font-medium text-xl md:text-sm capitalize text-gray-600">
                  Akses Kapan Saja dan Dimana Saja
                </p>
              </div>
            </TransitionChild>
          </div>

          <!-- Buttons -->
          <TransitionChild
            as="template"
            enter="transform transition duration-1000 delay-500"
            enter-from="opacity-0 translate-y-4"
            enter-to="opacity-100 translate-y-0"
            leave="transform duration-300 transition ease-in-out"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-4"
          >
            <div class="flex flex-col items-center sm:flex-row gap-4 justify-center">
              <a
                href="#menu"
                class="px-8 py-3 md:px-4 md:py-2 bg-emerald-600 text-white font-medium text-lg md:text-base md:font-normal tracking-wider rounded-lg hover:bg-emerald-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Mulai Sekarang
              </a>
            </div>
          </TransitionChild>
        </div>
      </TransitionRoot>
      <TransitionRoot appear :show="isVisible" as="div">
        <div class="space-y-10 text-center mt-6">
          <TransitionChild
            as="template"
            enter="transform transition duration-1000 delay-700"
            enter-from="opacity-0 translate-y-4"
            enter-to="opacity-100 translate-y-0"
            leave="transform duration-300 transition ease-in-out"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-4"
          >
            <div
              class="bg-white rounded-lg shadow-lg flex flex-col mt-6 p-5 mx-auto md:w-full w-[750px]"
            >
              <span class="text-green-600 font-medium text-left">Random Ayat Untukmu</span>
              <div class="text-2xl my-3 text-green-700 text-right">{{ data?.arab }}</div>
              <span class="text-sm text-green-700 text-left">{{ data?.translation }}</span>
            </div>
          </TransitionChild>

          <TransitionChild
            as="template"
            enter="transform transition duration-1000 delay-1000"
            enter-from="opacity-0 translate-y-4"
            enter-to="opacity-100 translate-y-0"
            leave="transform duration-300 transition ease-in-out"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-4"
          >
            <div class="my-6">
              <span class="text-4xl md:text-2xl font-semibold text-green-800"
                >Cari Kebutuhanmu</span
              >
            </div>
          </TransitionChild>
          <TransitionChild
            as="template"
            enter="transform transition duration-1000 delay-1200"
            enter-from="opacity-0 translate-y-4"
            enter-to="opacity-100 translate-y-0"
            leave="transform duration-300 transition ease-in-out"
            leave-from="opacity-100 translate-y-0"
            leave-to="opacity-0 translate-y-4"
          >
            <section id="menu" class="grid grid-cols-4 md:grid-cols-2 gap-4 mt-6">
              <template v-for="card in cards" :key="card.name">
                <router-link
                  :to="card.link"
                  class="p-9 md:p-7 flex flex-col gap-3 items-center justify-center rounded-md bg-green-500"
                >
                  <img :src="card.img" class="w-16 h-16 md:w-12 md:h-12 object-contain" alt="" />
                  <span class="font-medium text-xl md:text-sm">{{ card.name }}</span>
                </router-link>
              </template>
            </section>
          </TransitionChild>
        </div>
      </TransitionRoot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useQuery } from '@tanstack/vue-query'
import axios from '@/libs/axios'

const isVisible = ref(false)

const cards = [
  {
    name: 'Al-Quran',
    img: 'quran.png',
    link: '/quran'
  },
  {
    name: 'Jadwal Sholat',
    img: 'shalat.png',
    link: '/jadwal_sholat'
  },
  {
    name: 'Asmaul Husna',
    img: 'allah.png',
    link: '/asmaul_husna'
  },
  {
    name: 'Hadits',
    img: 'book.png',
    link: '/hadith'
  },
  {
    name: 'Doa Harian',
    img: 'pray.png',
    link: '/doa_harian'
  },
  {
    name: 'Shalawat Nabi',
    img: 'prophet.png',
    link: '/shalawat_nabi'
  },
  {
    name: 'Bacaan Tahlil',
    img: 'tasbih.png',
    link: '/tahlil'
  },
  {
    name: 'Kisah Nabi & Rasul',
    img: 'muslim.png',
    link: '/kisah_nabi'
  }
]

// ۞

const { data, isLoading, refetch } = useQuery({
  queryKey: ['quran', 'random'],
  queryFn: async () =>
    await axios.get('https://quran-api-id.vercel.app/random').then((res: any) => res.data)
})

onMounted(() => {
  isVisible.value = true
  window.scrollTo(0, 0)
})
</script>
