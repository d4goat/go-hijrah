<template>
  <div class="container mx-auto px-4">
    <TransitionRoot appear :show="!isFetchingJadwal && !isFetchingHijr" as="div">
      <TransitionChild enter="duration-500 transition-all ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-300" leave-from="opacity-100" leave-to="opacity-0">
        <div class="flex flex-row sm:flex-col gap-4 justify-end">
          <el-date-picker v-model="date" @change="refetch" type="date" placeholder="Pilih Tanggal" size="large" />
        </div>
      </TransitionChild>
      <TransitionChild  enter="transform transition-all duration-700 ease-out delay-500"
      enter-from="opacity-0 translate-y-8" enter-to="opacity-100 translate-y-0"
      leave="transform transition-all duration-500 ease-in" leave-from="opacity-100 translate-y-0"
      leave-to="opacity-0 translate-y-8">
        <div class="flex flex-col items-center space-y-8 mt-8">
          <div class="flex flex-col items-center space-y-3">
            <span class="capitalize text-4xl font-semibold flex items-center">
            waktu sholat daerah {{ selectedCity ? selectedCity : 'Kota Jakarta' }} <chevron-down :size="30" class="ml-2 cursor-pointer" @click="isOpen = true" />
          </span>
          <div class="flex items-center gap-5">
            <ChevronLeft class="cursor-pointer" :size="33" @click="handleDateChange(-1)" />
            <div class="flex flex-col items-center">
              <span class="font-medium md:text-sm text-2xl"> {{ date.toLocaleDateString('id-ID', { weekday: 'long' }) }}, {{
                date.toLocaleDateString('id-ID', { day: '2-digit' }) }} {{ date.toLocaleDateString('id-ID', {
                  month:
                  'long'
                }) }} </span>
            <span class="font-medium text-lg dark:text-green-200/50"> {{ hijr.date[1] }} </span>
          </div>
          <ChevronRight class="cursor-pointer" :size="33" @click="handleDateChange(1)" />
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        <template v-for="(time, name) in getFilteredJadwal" :key="name">
          <div class="bg-white shadow-md dark:bg-emerald-800 rounded-xl p-3 flex items-center justify-between gap-2">
            <div class="flex flex-col text-emerald-700 dark:text-white font-medium">
              <span class="text-base capitalize">{{ name }}</span>
              <span class="text-xl font-medium">{{ time }}</span>
            </div>
            <div class="w-14 h-14 flex items-center justify-center">
              <img :src="`/${name}.png`" class="w-12 h-12 object-contain filter-invert-green dark:filter-invert-white"
              alt="">
            </div>
          </div>
        </template>
      </div>
    </div>
            </TransitionChild>
  </TransitionRoot>

  <div
  v-if="isFetchingJadwal || isFetchingHijr" 
      class="animate-pulse space-y-6"
    >
      <!-- Header Skeleton -->
      <div class="flex flex-col items-center space-y-4">
        <div class="h-8 w-1/2 bg-zinc-300 dark:bg-zinc-700 rounded-md animate-pulse-slower"></div>
      </div>

      <!-- Date Navigation Skeleton -->
      <div class="flex justify-center items-center space-x-4">
        <div class="flex flex-col items-center space-y-2">
          <div class="h-6 w-48 bg-zinc-300 dark:bg-zinc-700 rounded-md animate-pulse-slower"></div>
          <div class="h-4 w-32 bg-zinc-300 dark:bg-zinc-700 rounded-md animate-pulse-slower"></div>
        </div>
      </div>

      <!-- Prayer Times Grid Skeleton -->
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        <div 
          v-for="i in 8" 
          :key="i" 
          class="bg-zinc-300 dark:bg-zinc-700 rounded-xl p-4 flex items-center justify-between animate-pulse-slow"
        >
          <div class="space-y-2">
            <div class="h-5 w-24 bg-zinc-400 dark:bg-zinc-600 rounded-md"></div>
            <div class="h-7 w-16 bg-zinc-400 dark:bg-zinc-600 rounded-md"></div>
          </div>
          <div class="w-14 h-14 bg-zinc-400 dark:bg-zinc-600 rounded-full"></div>
        </div>
      </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="isOpen = false" class="relative z-10">
        <transition-child as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100" leave="duration-300 ease-in" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-black/25"></div>
        </transition-child>
        <div class="fixed inset-0 overflow-y-auto ">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <transition-child as="template" enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95" >
              <dialog-panel class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white dark:bg-component p-10 text-left align-middle shadow-xl transition-all">
                <dialog-title as="h3" class="text-xl font-medium leading-5 mb-3 text-black dark:text-white pb-3">
                  Cari Kota
                </dialog-title>
                <el-select-v2 v-model="kota" class="w-full capitalize" filterable remote :remote-method="remoteMethod"
                  :options="options" :loading="loading" @change="handleCityChange" size="large" placeholder="Kota Jakarta, Kota Surabaya, etc.">
                  <template #loading>
                    <svg class="animate-spin h-7 w-7 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <path class="opacity-50" fill="cyan" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                  </template>
                </el-select-v2>
              </dialog-panel>
            </transition-child>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import axiosInstance from '@/libs/axios'
import { useQuery } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'
import { ChevronDown, ChevronRight, ChevronLeft } from 'lucide-vue-next'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'

interface ListItem {
  value: string
  label: string
}

interface City {
  id: string
  lokasi: string
}

interface JadwalSholat {
  date?: string
  tanggal?: string
  [key: string]: string | undefined
}

const isOpen = ref(false)

const date = ref(new Date())
const selectedCity = ref<string>("")
const kota = ref<string>('')

const { data: city, isFetching: isFetchingCity } = useQuery({
  queryKey: ['jadwal', 'kota'],
  queryFn: async () =>
    await axiosInstance
      .get('https://api.myquran.com/v2/sholat/kota/semua')
      .then((res: any) => res.data.data)
})

const cities = computed(() =>
  city.value?.map((item: City) => ({
    value: item.id,
    label: item.lokasi
  }))
)

const {
  data: jadwal,
  isFetching: isFetchingJadwal,
  refetch
} = useQuery({
  queryKey: ['jadwal', kota, date],
  queryFn: async () => {
    const selectedDate = date.value ? new Date(date.value) : new Date()
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1
    const day = selectedDate.getDate()
    return await axiosInstance
      .get(`https://api.myquran.com/v2/sholat/jadwal/${kota.value || 1301}/${year}/${month}/${day}`)
      .then((res) => res.data.data)
  },
  enabled: true
})

const { data: hijr, isFetching: isFetchingHijr, refetch: refetchHijr } = useQuery({
  queryKey: ['calendar', 'hijriyah'],
  queryFn: async () => {
    const selectedDate = date.value ? new Date(date.value) : new Date()
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1
    const day = selectedDate.getDate()

    return await axiosInstance.get(`https://api.myquran.com/v2/cal/hijr/${year}-${month}-${day}`).then((res: any) => res.data.data)
  }
})

// Watch untuk mengupdate selectedCity ketika cities tersedia
watch([cities, kota], ([newCities, newKota]) => {
  if (newCities && newKota) {
    const found = newCities.find((city: ListItem) => city.value === newKota)
    if (found) {
      selectedCity.value = found.label.toLowerCase()
    }
  }
}, { immediate: true })

const options = ref<ListItem[]>([])
const loading = ref(false)

const remoteMethod = (query: string) => {
  if (query !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = cities.value?.filter((item: ListItem) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      }) || []
    }, 200)
  } else {
    options.value = []
  }
}

const handleCityChange = (value: string) => {
  if (value && cities.value) {
    const selected = cities.value.find((city: ListItem) => city.value === value)
    isOpen.value = false
    if (selected) {
      selectedCity.value = selected.label
    }
  } else {
    selectedCity.value = ""
  }
  refetch()
}

const handleDateChange = (days: number) => {
  const newDate = new Date(date.value)
  newDate.setDate(newDate.getDate() + days)
  date.value = newDate

  refetch()
  refetchHijr()
}

// Computed property untuk memfilter jadwal
const getFilteredJadwal = computed(() => {
  if (!jadwal.value?.jadwal) return {}
  const { date, tanggal, ...filteredJadwal } = jadwal.value.jadwal as JadwalSholat
  return filteredJadwal
})
</script>