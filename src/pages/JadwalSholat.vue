<template>
  <div class="container mx-auto lg:px-4 px-10">
    <div class="flex flex-row sm:flex-col gap-4 justify-end">
      <el-date-picker
        style="--el-color-primary: #16a34a"
        v-model="date"
        @change="refetched"
        type="date"
        :clearable="false"
        placeholder="Pilih Tanggal"
        size="large"
      />
    </div>

    <div
      v-if="!isFetchingJadwal && !isFetchingHijr && loc?.city"
      class="flex flex-col items-center space-y-8 mt-8"
    >
      <div class="flex flex-col items-center space-y-3">
        <span class="capitalize text-4xl md:text-lg font-semibold flex items-center">
          waktu sholat daerah {{ loc?.city }}
          <!-- <chevron-down :size="20" class="ml-2 cursor-pointer" @click="isOpen = true" /> -->
        </span>
        <div class="flex items-center gap-5">
          <ChevronLeft class="cursor-pointer" @click="handleDateChange(-1)" />
          <div class="flex flex-col items-center">
            <span class="font-medium md:text-sm text-2xl">
              {{ date.toLocaleDateString('id-ID', { weekday: 'long' }) }},
              {{ date.toLocaleDateString('id-ID', { day: '2-digit' }) }}
              {{
                date.toLocaleDateString('id-ID', {
                  month: 'long'
                })
              }}
            </span>
            <span class="font-medium text-lg md:text-xs"> {{ hijr?.date[1] }} </span>
          </div>
          <ChevronRight class="cursor-pointer" @click="handleDateChange(1)" />
        </div>
      </div>
      <div
        class="flex flex-col gap-2 bg-white shadow-md md:w-full w-1/3 py-3 items-center text-emerald-700 rounded-xl"
      >
        <div class="flex items-center gap-3">
          <Clock />
          <span class="capitalize font-medium text-lg"
            >menuju waktu sholat {{ nextTime.name }}</span
          >
        </div>
        <span class="font-semibold text-xl"> {{ countdown }} </span>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-2 gap-4 w-full max-w-6xl">
        <template v-for="(time, name) in getFilteredJadwal" :key="name">
          <div class="bg-white shadow-md rounded-xl p-3 flex items-center justify-between gap-2">
            <div class="flex flex-col text-emerald-700 font-medium">
              <span class="text-base capitalize">{{ name }}</span>
              <span class="text-xl font-medium">{{ time }}</span>
            </div>
            <div class="w-14 h-14 flex items-center justify-center">
              <img
                :src="`/${name}.png`"
                class="w-12 h-12 object-contain filter-invert-green"
                alt=""
              />
            </div>
          </div>
        </template>
      </div>
    </div>

    <div v-else class="animate-pulse flex justify-center py-10">
      <span class="text-3xl md:text-lg font-medium">Loading...</span>
    </div>

    <div v-if="!loc" class="flex justify-center py-10">
      <div class="bg-red-300 border border-red-500 rounded-lg container max-w-2xl">
        <span class="text-red-400">Mohon Izinkan Akses Lokasi</span>
      </div>
    </div>

    <!-- <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="isOpen = false" class="relative z-10">
        <transition-child
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-300 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black/25"></div>
        </transition-child>
        <div class="fixed inset-0 overflow-y-auto">
          <div class="flex min-h-full items-center justify-center p-4 text-center">
            <transition-child
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >
              <dialog-panel
                class="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all"
              >
                <dialog-title as="h3" class="text-xl font-medium leading-5 mb-3 text-black pb-3">
                  Cari Kota
                </dialog-title>
                <el-select-v2
                  style="--el-color-primary: #16a34a"
                  v-model="kota"
                  class="w-full capitalize"
                  filterable
                  remote
                  :remote-method="remoteMethod"
                  :options="options"
                  :loading="loading"
                  @change="handleCityChange"
                  size="large"
                  placeholder="Kota Jakarta, Kota Surabaya, etc."
                >
                  <template #loading>
                    <svg
                      class="animate-spin h-7 w-7 mx-2"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        class="opacity-50"
                        fill="cyan"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  </template>
                </el-select-v2>
              </dialog-panel>
            </transition-child>
          </div>
        </div>
      </Dialog>
    </TransitionRoot> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import axios from '@/libs/axios'
import { useQuery } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'
import { ChevronDown, ChevronRight, ChevronLeft, Clock } from 'lucide-vue-next'
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
  subuh: string
  dzuhur: string
  ashar: string
  maghrib: string
  isya: string
}

interface Jadwal {
  daerah: string
  id: number
  jadwal: JadwalSholat
  lokasi: string
}

const isOpen = ref(false)

const date = ref(new Date())
const jadwal = ref<Jadwal>()
const isFetchingJadwal = ref(false)
// const selectedCity = ref<string>('')
const loc = ref({ city: '', cityId: 0 })
const kota = ref<City[]>([])
const countdown = ref<string>('')
const nextTime = ref<any>([])

const getUserLoc = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position: any) => {
      const { latitude, longitude } = position.coords

      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
        )
        // Pastikan kita memperbarui loc dengan struktur yang benar
        loc.value = {
          ...response.data.address,
          city: response.data.address.city
        }
        await getKota(loc.value.city)
      } catch (err) {
        console.error('Gagal mendapatkan nama kota:', err)
        ElMessage.error('Gagal mendapatkan lokasi')
      }
    })
  }
}

// const { data: city, isFetching: isFetchingCity } = useQuery({
//   queryKey: ['jadwal', 'kota'],
//   queryFn: async () =>
//     await axios
//       .get(`https://api.myquran.com/v2/sholat/kota/cari/${loc.value.city}`)
//       .then((res: any) => res.data.data),
//   enabled: !!loc.value.city
// })

// const cities = computed(() =>
//   city.value?.map((item: City) => ({
//     value: item.id,
//     label: item.lokasi
//   }))
// )

const refetched = () => {
  getJadwal(kota.value[0].id)
  refetchHijr()
}

async function getKota(city: string) {
  try {
    const response = await axios.get(`https://api.myquran.com/v2/sholat/kota/cari/${city}`)

    if (response.data.status && response.data.data.length > 0) {
      kota.value = response.data.data
      // Store cityId in loc
      loc.value.cityId = response.data.data[0].id
      // Fetch initial jadwal after getting city ID
      await getJadwal(response.data.data[0].id)
    } else {
      ElMessage.warning('Kota tidak ditemukan')
    }
  } catch (error) {
    console.error('Gagal mengambil data kota:', error)
    ElMessage.error('Gagal mengambil data kota')
  } finally {
  }
}

async function getJadwal(kota: any) {
  isFetchingJadwal.value = true
  try {
    const selectedDate = date.value ? new Date(date.value) : new Date()
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth() + 1
    const day = selectedDate.getDate()
    const response = await axios
      .get(`https://api.myquran.com/v2/sholat/jadwal/${kota}/${year}/${month}/${day}`)
      .then((res) => res.data.data)

    jadwal.value = response
  } catch (err) {
    console.error(err)
  } finally {
    isFetchingJadwal.value = false
  }
}

const {
  data: hijr,
  isFetching: isFetchingHijr,
  refetch: refetchHijr
} = useQuery({
  queryKey: ['calendar', 'hijriyah'],
  queryFn: async () => {
    const selectedDate = date.value ? new Date(date.value) : new Date()
    const year = selectedDate.getFullYear()
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0')
    const day = String(selectedDate.getDate()).padStart(2, '0')

    return await axios
      .get(`https://api.myquran.com/v2/cal/hijr/${year}-${month}-${day}`)
      .then((res: any) => res.data.data)
  }
})

// Watch untuk mengupdate selectedCity ketika cities tersedia
// watch(
//   [cities, kota],
//   ([newCities, newKota]) => {
//     if (newCities && newKota) {
//       const found = newCities.find((city: ListItem) => city.value === newKota)
//       if (found) {
//         selectedCity.value = found.label.toLowerCase()
//       }
//     }
//   },
//   { immediate: true }
// )

const options = ref<ListItem[]>([])
const loading = ref(false)

// const remoteMethod = (query: string) => {
//   if (query !== '') {
//     loading.value = true
//     setTimeout(() => {
//       loading.value = false
//       options.value =
//         cities.value?.filter((item: ListItem) => {
//           return item.label.toLowerCase().includes(query.toLowerCase())
//         }) || []
//     }, 200)
//   } else {
//     options.value = []
//   }
// }

// const handleCityChange = (value: string) => {
//   if (value && cities.value) {
//     const selected = cities.value.find((city: ListItem) => city.value === value)
//     isOpen.value = false
//     if (selected) {
//       selectedCity.value = selected.label
//     }
//   } else {
//     selectedCity.value = ''
//   }
//   refetch()
// }

const handleDateChange = (days: number) => {
  const newDate = new Date(date.value)
  newDate.setDate(newDate.getDate() + days)
  date.value = newDate

  getJadwal(kota.value[0].id)
  refetchHijr()
}

const calculateCountdown = () => {
  if (!jadwal.value || !jadwal.value.jadwal) return

  const now: any = new Date()
  const times = [
    { name: 'subuh', time: jadwal.value.jadwal.subuh },
    { name: 'dzuhur', time: jadwal.value.jadwal.dzuhur },
    { name: 'ashar', time: jadwal.value.jadwal.ashar },
    { name: 'maghrib', time: jadwal.value.jadwal.maghrib },
    { name: 'isya', time: jadwal.value.jadwal.isya }
  ]

  const upcomingTimes = times
    .map(({ name, time }) => {
      const [hour, minute] = time.split(':').map(Number)
      const sholatTime = new Date(now)
      sholatTime.setHours(hour, minute, 0, 0)
      if (sholatTime < now) sholatTime.setDate(sholatTime.getDate() + 1) // Jika sudah lewat, gunakan besok
      return { name, time: sholatTime }
    })
    .sort((a, b) => a.time.getTime() - b.time.getTime()) // Urutkan berdasarkan waktu terdekat

  nextTime.value = upcomingTimes[0] // Waktu terdekat
  const diff = nextTime.value.time - now // Selisih waktu dalam ms

  // Konversi ke format jam, menit, dan detik
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((diff % (1000 * 60)) / 1000)

  countdown.value = `${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`
}

let interval: any
watch(jadwal, () => {
  if (interval) clearInterval(interval)
  calculateCountdown()
  interval = setInterval(calculateCountdown, 1000)
})

onMounted(() => getUserLoc())

// Computed property untuk memfilter jadwal
const getFilteredJadwal = computed(() => {
  if (!jadwal.value?.jadwal) return {}
  const { date, tanggal, ...filteredJadwal } = jadwal.value.jadwal as JadwalSholat
  return filteredJadwal
})
</script>
