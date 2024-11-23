<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import axiosInstance from '@/libs/axios'
import { useQuery } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'

interface ListItem {
  value: string
  label: string
}

interface City {
  id: string
  lokasi: string
}

const date = ref()
const selectedCity = ref<string>("")
const kota = ref<string>('')

const { data: city, isLoading: isLoadingCity } = useQuery({
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

// Watch untuk mengupdate selectedCity ketika cities tersedia
watch([cities, kota], ([newCities, newKota]) => {
  if (newCities && newKota) {
    const found = newCities.find((city: ListItem) => city.value === newKota)
    if (found) {
      selectedCity.value = found.label
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
    if (selected) {
      selectedCity.value = selected.label
    }
  } else {
    selectedCity.value = ""
  }
  refetch()
}

const {
  data: jadwal,
  isLoading: isLoadingJadwal,
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
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex flex-row sm:flex-col gap-4 justify-between">
      <el-select-v2
        v-model="kota"
        style="width: 240px"
        filterable
        remote
        clearable
        :remote-method="remoteMethod"
        :options="options"
        :loading="loading"
        @change="handleCityChange"
        size="large"
        placeholder="Cari Kota"
      >
        <template #loading>
          <svg
            class="animate-spin h-7 w-7 mx-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path class="opacity-50" fill="cyan" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
        </template>
      </el-select-v2>
      <el-date-picker
        v-model="date"
        @change="refetch"
        type="date"
        placeholder="Pilih Tanggal"
        size="large"
      />
    </div>
    <div class="flex flex-col items-center space-y-8 mt-8">
      <span class="capitalize text-4xl font-medium">
        waktu sholat daerah {{ selectedCity ? selectedCity : 'Jakarta' }}
      </span>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full max-w-6xl">
        <template v-for="(time, name) in jadwal.jadwal" :key="name">
          <div 
            v-if="name !== 'date' && name !== 'tanggal'" 
            class="bg-white shadow-md dark:bg-emerald-800 rounded-xl p-3 flex items-center justify-between gap-2"
          >
            <div class="flex flex-col text-emerald-700 dark:text-white font-medium">
              <span class="text-base capitalize">{{ name }}</span>
              <span class="text-xl font-medium">{{ time }}</span>
            </div>
            <div class="w-14 h-14 flex items-center justify-center">
              <img 
                :src="`/public/${name}.png`" 
                class="w-12 h-12 object-contain filter-invert-green dark:filter-invert-white"
                :alt="name"
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>