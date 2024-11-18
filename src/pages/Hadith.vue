<script setup lang="ts">
import axiosInstance from '@/libs/axios';
import { useQuery } from '@tanstack/vue-query';
import { ref, onMounted } from 'vue';

const { data } = useQuery({
    queryKey: ['hadith'],
    queryFn: async () => await axiosInstance.get('https://api.hadith.gading.dev/books').then((res: any) => res.data.data)
})
</script>

<template>
<main class="flex flex-col items-center gap-4">
    <div class="flex flex-col gap-3 w-1/2 dark:bg-dropdown shadow-md  shadow-gray-600/40 dark:shadow-green-800/50 rounded-lg p-4" v-for="hadith in data" :key="hadith.id" >
        <div class="font-medium text-xl"> {{ hadith.name }} </div>
        <div class="font-medium"> {{ hadith.available }} Hadits telah diriwayatkan </div>
    </div>
</main>    
</template>