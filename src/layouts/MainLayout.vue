<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Menu, X } from 'lucide-vue-next';

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const navLinks = [
  { to: '/quran', label: 'Al Quran' },
  { to: '/hadith', label: 'Hadits' },
  { to: '/asmaul_husna', label: 'Asmaul Husna' },
  { to: '/jadwal_sholat', label: 'Jadwal Sholat' }
]
</script>

<template>
    <div class="contents sm:p-5">
        <div class="p-5 flex flex-row justify-between items-center bg-green-800 text-white border-b-2 border-gray-300">
            <div class="flex items-center text-3xl">
              <router-link :to="'/'" class="font-semibold hover:text-green-300 transition duration-300">
                Muslim Hub
              </router-link>
            </div>
        
            <!-- Desktop Navigation -->
            <div class="flex md:hidden gap-8 items-center">
              <router-link 
                v-for="link in navLinks" 
                :key="link.to" 
                :to="link.to" 
                class="relative group"
              >
                <span class="text-lg hover:text-green-300 transition duration-300">{{ link.label }}</span>
                <span class="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-green-300"></span>
              </router-link>
            </div>
        
            <!-- Mobile Menu Toggle -->
            <div class="md:flex hidden items-center">
                <button 
                @click="toggleMobileMenu" 
                class="text-white focus:outline-none focus:border-none transition-transform duration-300"
              >
              <!-- <Transition mode="out-in">
                <component 
                  :is="isMobileMenuOpen ? X : Menu" 
                  :key="isMobileMenuOpen ? 'close' : 'menu'"
                  class=""
                />
              </Transition> -->
              <X v-if="isMobileMenuOpen" class="transition-transform duration-300 rotate-90" />
              <Menu v-else class="transition-transform duration-300" />
              </button>
            </div>
          </div>
        
          <!-- Mobile Dropdown Menu -->
           <transition name="fade">
               <div v-if="isMobileMenuOpen" class="md:flex absolute z-50 w-full bg-green-800 shadow-lg">
                   <div class="flex flex-col p-4 space-y-2">
                       <router-link 
                       v-for="link in navLinks" 
                :key="link.to" 
                :to="link.to" 
                @click="toggleMobileMenu"
                class="text-white text-lg py-2 hover:bg-green-700 transition duration-300"
              >
                {{ link.label }}
              </router-link>
            </div>
        </div>
    </transition>
  
      <RouterView class="min-h-screen p-5 transition-colors duration-300 bg-emerald-50/90 text-text" />
    </div>
  </template>

  <style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>