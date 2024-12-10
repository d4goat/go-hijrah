<template>
    <main class="flex justify-center">
        <div v-if="!isLoading" class="grid grid-cols-1 w-[70%] gap-4">
            <div v-for="card in sholawat" :key="card.id"
                class="bg-white rounded-lg shadow-lg space-y-4 flex flex-col mt-6 p-5">
                <span class="text-green-600 text-xl font-medium">{{ card.name }}</span>
                <span class="text-2xl text-green-700 text-right">{{ card.arab }}</span>
                <span class="text-green-700 italic">{{ card.latin }}</span>
                <Accordion value="0" expand-icon="fa-solid fa-chevron-down" collapse-icon="fa-solid fa-chevron-up">
                    <AccordionPanel :value="card.id">
                        <AccordionHeader>
                            <span class="text-lg font-medium text-green-700/75">Arti: </span>
                        </AccordionHeader>
                        <AccordionContent>
                            <span class="text-green-700/75">{{ card.arti }}</span>
                        </AccordionContent>
                    </AccordionPanel>
                </Accordion>
            </div>
        </div>
        <div v-else class="flex justify-center">
            <span class="text-2xl font-medium animate-pulse">Loading...</span>
        </div>
    </main>
</template>

<script setup lang="ts">
import Sholawat from "@/json/Sholawat.json"
import { onMounted, ref } from "vue";
import Accordion from 'primevue/accordion';
import AccordionPanel from 'primevue/accordionpanel';
import AccordionHeader from 'primevue/accordionheader';
import AccordionContent from 'primevue/accordioncontent';
import { ChevronDown, ChevronUp } from 'lucide-vue-next';

const sholawat = Sholawat.Sholawat

const isLoading = ref(true)

onMounted(() => {
    setTimeout(() => {
        isLoading.value = false
    }, 1500)

})
</script>