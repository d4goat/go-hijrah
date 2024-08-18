<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axiosInstance from '@/libs/axios';
import { useRoute } from 'vue-router';

const route = useRoute()

const surah = ref({})
const tafsir = ref({})

async function getSurah (nomor: any){
    try{
        const response = await axiosInstance.get(`https://equran.id/api/v2/surat/${nomor}`)
        surah.value = response.data.data
    } catch(error) {
        console.error(error)
    }
}

onMounted(() => {
    getSurah(route.query.surah_ke)
})

</script>

<template>
    <div class="flex-col">
        <div v-for="ayat in surah.ayat" :key="ayat.nomorAyat" >
            <div class="">
                <div class="flex flex-col gap-3 mx-3 my-5 px-3 py-5 rounded border-solid border-2 border-border">
                    <div class="flex justify-between">
                        <span class="border-2 rounded-full p-2">
                            {{ ayat.nomorAyat }}
                        </span>
                        <span class="text-2xl">
                            {{ ayat.teksArab }} 
                        </span>
                    </div>
                    <span> {{ ayat.teksIndonesia }} </span>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
</style>