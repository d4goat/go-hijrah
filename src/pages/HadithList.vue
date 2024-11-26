<template>
    <main>
        <div class="flex flex-col space-y-4">
            <div class="dark:bg-dropdown p-4 rounded-lg shadow" v-for="hadith in data.hadiths" :key="hadith.number">
                text 
            </div>
        </div>
        <ChevronRight :size="30" color="#fff" @click="handleRangeChange('minus')" />
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'
import axios from '@/libs/axios'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus';
import { ChevronRight, ChevronLeft } from 'lucide-vue-next';

const route = useRoute()
const firstRange = ref(1)
const lastRange = ref(20)

const { data, isLoading, refetch } = useQuery({
    queryKey: ['hadith', route.query.hadith_name],
    queryFn: async () => await axios.get(`https://api.hadith.gading.dev/books/${route.query.hadith_name}?range=${firstRange.value}-${lastRange.value}`).then((res: any) => res.data.data),
    onError: (err: any) => ElMessage.error(err.response.data.message)
})

const handleRangeChange = (set: string) => {
    if(set == "minus") {
        firstRange.value = Math.max(1, firstRange.value - 20);
        lastRange.value = Math.max(20, lastRange.value - 20);
    } else {
        firstRange.value += 20
        lastRange.value += 20
    }
    refetch()
}

</script>
