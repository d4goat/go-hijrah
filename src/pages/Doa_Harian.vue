<template>
    <main class="flex justify-center">
        <div class="grid grid-cols-1 w-[70%] gap-4">
            <div v-for="card in data" :key="card.id" class="bg-white rounded-lg shadow-lg space-y-4 flex flex-col mt-6 p-5">
                <span class="text-green-600 text-xl font-medium">{{ card.judul }}</span>
                <span class="text-2xl text-green-700 text-right">{{ card.arab }}</span>
                <span class="text-green-700 italic">{{ card.latin }}</span>
                <Accordion value="0">
                    <AccordionPanel :value="card.id">
                        <AccordionHeader>
                            <span class="text-lg font-medium text-green-700/75">Arti: </span>
                        </AccordionHeader>
                        <AccordionContent>
                            <span class="text-green-700/75">{{ card.terjemah }}</span>
                    </AccordionContent>
                </AccordionPanel>
            </Accordion>
        </div>
    </div>
    </main>
</template>

<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query';
import axios from '@/libs/axios';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue';
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ChevronDown } from 'lucide-vue-next';

const { data } = useQuery({
  queryKey: ['doa', 'harian'],
  queryFn: async () => await axios.get('https://open-api.my.id/api/doa').then((res: any) => res.data)
})
</script>