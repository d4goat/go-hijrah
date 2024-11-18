<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axiosInstance from '@/libs/axios';

const jadwal = ref()
const initCity = ref('jakarta')
const date = new Date()
const kota = ref<any[]>([])

async function getKota() {
    try{
        const response = await axiosInstance.get('https://api.myquran.com/v2/sholat/kota/semua')
        kota.value = response.data.data
    } catch(error) {
        console.error(error)
    }
}

const kotas = computed(() => 
    kota.value?.map((item) => ({
        id: item.id,
        text: item.lokasi
    }))
)
async function getJadwal (kota: any, year: any, month: any, date: any){
    try{
        const response = await axiosInstance.get(`https://api.myquran.com/v2/sholat/jadwal/${kota}/${year}/${month}/${date}`)
        jadwal.value = response.data.data
    } catch(error) {
        console.error(error)
    }
}

onMounted(() => {
    getKota()
    getJadwal('1632', date.getFullYear(), date.getMonth(), date.getDay())
})


</script>

<template>
    <div class="flex">
        <div class="flex items-center gap-3">
            <select2 placeholder="Cari Kota.." class="w-128 md:w-56" :options="kotas" v-model="initCity" >
            </select2>
            <button type="button" class="bg-red-600 p-1.5 rounded-xl">Cari</button>
        </div>
        <div v-if="jadwal.length > 0">
        {{ jadwal }}
    </div>
</div>
</template>