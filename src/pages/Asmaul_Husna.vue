<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '@/libs/axios'

interface Asmaul_Husna {
  arab: string
  id: number
  indo: string
  latin: string
}

const asmaul_husna = ref<Asmaul_Husna[]>([])

async function getAsmaul() {
  try {
    const response = await axios.get('https://api.myquran.com/v2/husna/semua')
    asmaul_husna.value = response.data.data
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  getAsmaul()
})
</script>

<template>
  <div class="flex-1 none">
    <div v-if="asmaul_husna.length > 0">
      <div class="flex flex-wrap justify-center gap-3">
        <div v-for="asmaul in asmaul_husna" :key="asmaul.id">
          <div
            class="w-64 h-48 p-2.5 border-2 rounded border-green-600 flex gap-3 items-center"
          >
            <div class="flex flex-auto flex-col gap-4 text-center">
              <span class="text-4xl">
                {{ asmaul.arab }}
              </span>
              <div class="flex flex-col gap-2">
                <span class="font-bold text-2xl">
                  {{ asmaul.latin }}
                </span>
                <span>
                  {{ asmaul.indo }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
