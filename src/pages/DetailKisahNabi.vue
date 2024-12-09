<template>
    <main class="flex flex-col items-center">
        <div class="w-[80%] md:w-full bg-white rounded-lg p-5 flex flex-col gap-4 shadow-lg">
            <div class="flex gap-4 items-center">
                <router-link to="/kisah_nabi">
                    <ArrowLeft class="text-green-600" />
                </router-link>
                <span class="text-green-600 md:text-lg text-3xl font-semibold">Kisah {{ items?.name }}</span>
            </div>
            <div class="border-b-2 border-green-600 my-1"></div>
            <span class="text-green-700 leading-relaxed tracking-wider text-lg md:text-sm md:leading-snug md:tracking-wide" v-html="items?.description.replace(/\n/gi, '<br>')"></span>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import axios from '@/libs/axios';
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowLeft } from 'lucide-vue-next';

const route = useRoute()
const router = useRouter()

const { data, isLoading } = useQuery({
    queryKey: ['kisah', 'nabi'],
    queryFn: async () => await axios.get('https://islamic-api-zhirrr.vercel.app/api/kisahnabi').then((res: any) => res.data)
})

interface Kisah {
    description: string,
    icon_url: string,
    image_url: string,
    name: string,
    thn_kelahiran: string,
    tmp: string,
    usia: string
}

const items = computed(() => {
    if (!data.value || !route.query.name) return null;

    const query = route.query.name
    return (
        data.value.find((i: Kisah) => i.name == query)
    )
})

onMounted(() => window.scrollTo(0, 0))
</script>