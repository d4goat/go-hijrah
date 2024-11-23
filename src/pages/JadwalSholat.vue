<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import axiosInstance from '@/libs/axios'
import { useQuery } from '@tanstack/vue-query'
import { ElMessage } from 'element-plus'

interface ListItem {
  value: string
  label: string
}

interface City {
  id: number
  lokasi: string
}

const date = ref()
const selectedCity = ref<string>("Jakarta")
const kota = ref<string>('')

const { data: city, isLoading: isLoadingCity } = useQuery({
  queryKey: ['jadwal', 'kota'],
  queryFn: async () =>
    await axiosInstance
      .get('https://api.myquran.com/v2/sholat/kota/semua')
      .then((res: any) => res.data.data)
  // onError: (err: any) => ElMessage.error(err.response.data.message)
})

const cities = computed(() =>
  city.value?.map((item: City) => ({
    value: item.id,
    label: item.lokasi
  }))
)

const options = ref<ListItem[]>([])
const loading = ref(false)

const remoteMethod = (query: string) => {
  if (query !== '') {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      options.value = cities.value.filter((item: any) => {
        return item.label.toLowerCase().includes(query.toLowerCase())
      })
    }, 1000)
  } else {
    options.value = []
  }
}

async function getJadwal(kota: any, year: any, month: any, date: any) {
  try {
    const response = await axiosInstance.get(
      `https://api.myquran.com/v2/sholat/jadwal/${kota}/${year}/${month}/${date}`
    )
    jadwal.value = response.data.data
  } catch (error) {
    console.error(error)
  }
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
  <div class="container">
    <div class="flex flex-row justify-between">
      <el-select-v2
        v-model="kota"
        style="width: 240px"
        filterable
        remote
        clearable
        :remote-method="remoteMethod"
        :options="options"
        :loading="loading"
        @change="() => {refetch, selectedCity = kota}"
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
    <div class="flex justify-center">
        <span> {{ selectedCity }} </span>
    </div>
  </div>
</template>
