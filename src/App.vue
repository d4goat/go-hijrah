<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="contents">
    <div class="p-5 flex flex-row">
      <div class="flex-1">
        <router-link :to="'/'">
          <span>Muslim Hub</span>
        </router-link>
      </div>
      <div class="flex gap-3">
        <router-link :to="'/quran'">
          <span>Muslim Hub</span>
        </router-link>
        <router-link :to="'/'">
          <span>Muslim Hub</span>
        </router-link>
      </div>
    </div>
    <RouterView class="bg-primary dark:text-primary" />
  </div>
</template>

<style>

#app{
  display: contents;
}

</style>