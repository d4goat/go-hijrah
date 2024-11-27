<template>
    <main class="py-12">
        <div v-if="!isFetching" class="space-y-6">
            <div class="flex flex-col space-y-4">
                <div class="p-5 bg-white rounded-lg shadow-md flex flex-col space-y-6"
                    v-for="hadith in data.data.hadiths" :key="hadith.number">
                    <div class="flex flex-col gap-7">
                        <spdan class="font-semibold">Hadits Ke {{ hadith.number }}</spdan>
                        <span class="font-medium text-3xl md:text-2xl text-right">{{ hadith.arab }}</span>
                    </div>
                    <span class="font-medium">{{ hadith.id }}</span>
                </div>
            </div>
            <div class="flex" :class="firstRange == 1 ? 'justify-end' : 'justify-between'">
                <button v-if="firstRange !== 1" class="underline text-lg md:text-sm text-green-600 capitalize"
                    @click="handleRangeChange('minus')">sebelumnya</button>
                <button class="underline text-lg md:text-sm text-green-600 capitalize"
                    @click="handleRangeChange('plus')">selanjutnya</button>
            </div>
        </div>
        <div v-else class="flex justify-center">
            <span class="animate-pulse text-2xl font-medium">Loading...</span>
        </div>
        <div class="flex justify-center" v-if="data.error">
            <span class="text-3xl font-medium">No Data Found</span>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import axios from '@/libs/axios'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';

const route = useRoute()
const firstRange = ref(1)
const lastRange = ref(20)
const scroll = ref(false)

const { data, isFetching, refetch } = useQuery({
    queryKey: ['hadith', route.query.hadith_name],
    queryFn: async () => await axios.get(`https://api.hadith.gading.dev/books/${route.query.hadith_name}?range=${firstRange.value}-${lastRange.value}`).then((res: any) => res.data),
    onError: (err: any) => ElMessage.error(err.response.data.message),
    enabled: true,
    cacheTime: 0
})

const handleRangeChange = (set: string) => {
    if (set == "minus") {
        firstRange.value = Math.max(1, firstRange.value - 20);
        lastRange.value = Math.max(20, lastRange.value - 20);
    } else {
        firstRange.value += 20
        lastRange.value += 20
    }
    window.scrollTo(0, 0)
    refetch()
}


</script>
