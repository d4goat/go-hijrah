<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useDark, useToggle } from '@vueuse/core'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <div class="contents sm:p-5 font-libre">
    <div
      class="p-5 flex flex-row dark:bg-secondary dark:text-primary bg-green-700 text-text border-b-2 border-gray-300 dark:border-border"
    >
      <div class="flex flex-1 items-center text-3xl">
        <router-link :to="'/'" class=" dark:text-green-600 text-white font-semibold">
          Muslim Hub
        </router-link>
      </div>
      <div class="flex gap-5 items-center">
        <router-link :to="'/quran'">
          <span class="text-white dark:hover:text-green-600 hover:underline decoration-2 dark:decoration-green-600 text-lg">Al Quran</span>
        </router-link>
        <router-link :to="'/'">
          <span class="text-white dark:hover:text-green-600 hover:underline decoration-2 dark:decoration-green-600 text-lg">Hadith</span>
        </router-link>
        <router-link :to="'/asmaul_husna'">
          <span class="text-white dark:hover:text-green-600 hover:underline decoration-2 dark:decoration-green-600 text-lg">Asmaul Husna</span>
        </router-link>
        <router-link :to="'/jadwal_sholat'">
          <span class="text-white dark:hover:text-green-600 hover:underline decoration-2 dark:decoration-green-600 text-lg">Jadwal Sholat</span>
        </router-link>
        <label
          for="toggleThree"
          class="flex items-center cursor-pointer select-none text-dark dark:text-white"
        >
          <div class="relative">
            <input type="checkbox" id="toggleThree" class="peer sr-only" v-model="isDark" />
            <div class="block h-8 rounded-full bg-gray-300 dark:bg-gray-700 w-14"></div>
            <div
              class="absolute flex items-center justify-center w-6 h-6 transition-transform bg-white rounded-full dot dark:bg-gray-500 left-1 top-1 peer-checked:translate-x-full peer-checked:bg-blue-600"
            >
              <i :class="isDark ? 'fa-solid fa-moon text-black' : 'fa-solid fa-sun text-black'"></i>
            </div>
          </div>
        </label>
      </div>
    </div>
    <RouterView class="dark:bg-component dark:text-primary bg-primary text-text min-h-screen p-5" />
  </div>
</template>

<style scoped>
#app {
  display: contents;
}

*{
  transition: all 0.2s ease-in-out;
}
</style>
