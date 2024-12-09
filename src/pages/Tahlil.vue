<template>
    <main class="flex justify-center">
        <div v-if="!isLoading" class="grid grid-cols-1 w-[70%] md:w-full gap-4">
            <div v-for="item in data" :key="item.id"
                class="bg-white rounded-lg shadow-lg space-y-4 flex flex-col mt-6 p-5">
                <span class="text-green-600 text-xl font-medium">{{ item.title }}</span>
                <span class="text-2xl text-green-700 text-right">{{ item.arabic }}</span>
                <Accordion value="0" expand-icon="fa-solid fa-chevron-down" collapse-icon="fa-solid fa-chevron-up">
                    <AccordionPanel :value="item.id">
                        <AccordionHeader>
                            <span class="text-lg font-medium text-green-700/75">Arti: </span>
                        </AccordionHeader>
                        <AccordionContent>
                            <span class="text-green-700/75">{{ item.translation }}</span>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>
        <div v-else class="flex justify-center">
            <span class="animate-pulse text-2xl font-medium">Loading...</span>
        </div>
    </main>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import axios from '@/libs/axios';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const { data, isLoading } = useQuery({
    queryKey: ['tahlil'],
    queryFn: async () => await axios.get('https://islamic-api-zhirrr.vercel.app/api/tahlil').then((res:  any) => res.data.data)
})
</script>