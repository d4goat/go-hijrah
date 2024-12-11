<script setup lang="ts">
import axios from '@/libs/axios'
import { useQuery } from '@tanstack/vue-query'
import { ref, onMounted } from 'vue'

const { data, isLoading } = useQuery({
  queryKey: ['hadith'],
  queryFn: async () =>
    await axios.get('https://api.hadith.gading.dev/books').then((res: any) => res.data.data)
})
</script>

<template>
  <main class="flex justify-center items-center">
    <div v-if="!isLoading" class="grid grid-cols-1 gap-8 w-full max-w-6xl">
      <div
        v-for="hadith in data"
        :key="hadith.id"
        class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        <router-link :to="{ name: 'hadith.list', query: { hadith_name: hadith.id } }" class="p-6">
          <h3 class="text-2xl font-semibold mb-2">{{ hadith.name }}</h3>
          <p class="text-gray-500 mb-4">{{ hadith.available }} Hadits telah diriwayatkan</p>
          <div class="flex items-center justify-between">
            <span class="text-gray-500 text-sm"> Hadits Riwayat </span>
            <span class="text-green-500 font-semibold text-sm">
              {{ hadith.available }}
            </span>
          </div>
        </router-link>
      </div>
    </div>
    <div v-else class="flex justify-center"><span class="text-2xl font-medium">Loading...</span></div>
  </main>
</template>
