<script setup lang="ts">
import { TransitionRoot, TransitionChild } from '@headlessui/vue';
import { ref, watch, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Menu, X } from 'lucide-vue-next';

const isDark = ref(false)
const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/quran', label: 'Al Quran' },
  { to: '/hadith', label: 'Hadits' },
  { to: '/asmaul_husna', label: 'Asmaul Husna' },
  { to: '/jadwal_sholat', label: 'Jadwal Sholat' }
]

watch(isDark, (newValue) => {
  if (newValue) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}, { immediate: true })

onMounted(() => isDark.value = true)
</script>

<template>
  <div class="contents sm:p-5 font-poppins">
    <div
      class="p-5 flex flex-row justify-between items-center dark:bg-secondary dark:text-primary bg-green-700 text-text border-b-2 border-gray-300 dark:border-border"
    >
      <div class="flex items-center text-3xl">
        <router-link :to="'/'" class="dark:text-emerald-500 dark:hover:text-emerald-700 text-white font-semibold">
          Muslim Hub
        </router-link>
      </div>

      <!-- Desktop Navigation -->
      <div class="flex md:hidden gap-5 items-center">
        <router-link 
          v-for="link in navLinks" 
          :key="link.to" 
          :to="link.to" 
          class="block relative group"
        >
          <span class="text-white dark:hover:text-green-600 text-lg">{{ link.label }}</span>
          <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-600"></span>
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

      <!-- Mobile Menu Toggle -->
      <div class="md:flex hidden space-x-3 items-center">
        <label
            for="toggleThreeMobile"
            class="flex items-center cursor-pointer select-none text-dark dark:text-white"
          >
            <div class="relative">
              <input type="checkbox" id="toggleThreeMobile" class="peer sr-only" v-model="isDark" />
              <div class="block h-8 rounded-full bg-gray-300 dark:bg-gray-700 w-14"></div>
              <div
                class="absolute flex items-center justify-center w-6 h-6 transition-transform bg-white rounded-full dot dark:bg-gray-500 left-1 top-1 peer-checked:translate-x-full peer-checked:bg-blue-600"
              >
                <i :class="isDark ? 'fa-solid fa-moon text-black' : 'fa-solid fa-sun text-black'"></i>
              </div>
            </div>
          </label>
        <button 
          @click="toggleMobileMenu" 
          class="text-white focus:outline-none focus:border-none transition-transform duration-300"
          :class="{ 'rotate-180': isMobileMenuOpen }"
        >
        <Transition mode="out-in">
          <component 
            :is="isMobileMenuOpen ? X : Menu" 
            :key="isMobileMenuOpen ? 'close' : 'menu'"
            class="transition-all duration-300"
          />
        </Transition>
        </button>
      </div>
    </div>

    <!-- Mobile Dropdown Menu -->
    <TransitionRoot appear :show="isMobileMenuOpen" as="template">
      <TransitionChild 
        enter="transition-all duration-300 ease-out" 
        enter-from="opacity-0 translate-y-[-20px]"
        enter-to="opacity-100 translate-y-0"
        leave="transition-all duration-300 ease-in"
        leave-from="opacity-100 translate-y-0"
        leave-to="opacity-0 translate-y-[-20px]"
        as="div"
      >
        <div 
          class="md:flex absolute z-50 w-full bg-green-700 dark:bg-secondary shadow-lg"
        >
          <div class="flex flex-col p-4 space-y-4 w-full">
            <router-link 
              v-for="link in navLinks" 
              :key="link.to" 
              :to="link.to" 
              @click="toggleMobileMenu"
              class="text-white dark:text-primary text-lg py-2 border-b border-green-600 dark:border-gray-700"
            >
              {{ link.label }}
            </router-link>
          </div>
        </div>
      </TransitionChild>
    </TransitionRoot>

    <RouterView class="min-h-screen p-5 transition-colors duration-300 bg-gradient-to-b from-white via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-green-900/30 text-text dark:text-primary" />
  </div>
</template>

<style scoped>
#app {
  display: contents;
}

* {
  transition: all 0.2s ease-in-out;
}
</style>