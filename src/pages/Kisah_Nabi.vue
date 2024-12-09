<template>
    <main class="flex justify-center">
        <div class="grid grid-cols-1 w-[70%] md:w-full gap-4">
            <div v-for="item in data" :key="item.name" class="bg-white rounded-lg shadow-lg flex flex-col space-y-4 mt-6 p-5">
                <span class="text-green-600 text-2xl font-semibold">{{ item.name }}</span>
                <span class="text-green-800 line-clamp-6">{{ item.description }}</span>
                <router-link :to="{name: 'kisah_nabi_detail', query: { name: item.name }}"><span class="text-green-600 underline">Lihat Selengkapnya</span></router-link>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import axios from '@/libs/axios';

const { data, isLoading } = useQuery({
    queryKey: ['kisah', 'nabi'],
    queryFn: async () => await axios.get('https://islamic-api-zhirrr.vercel.app/api/kisahnabi').then((res: any) => res.data)
})
</script>