<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/libs/axios';

const jadwal = ref([])
const initCity = ref('jakarta')

async function getJadwal(params: any) {
    try{
        const response = await axiosInstance.get(`https://api.myquran.com/v2/sholat/kota/cari/${params}`)
        jadwal.value = response.data.data
    } catch(error) {
        console.error(error)
    }
}

onMounted(() => {
    getJadwal(initCity.value)
})

function updateData(city: any){
    getJadwal(city)
}

</script>

<template>
    <div class="flex">
        <input type="search" v-model="initCity" placeholder="Cari Kota...">
        <button @click="updateData" type="button">Cari</button>
    </div>
    <div v-if="jadwal.length > 0">
        {{ jadwal }}
    </div>
</template>