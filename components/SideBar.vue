<template>
  <div
    class="fixed top-0 w-80 left-0 h-full px-8 py-10 transition-all duration-300"
  >
    <!-- Sidebar Menu -->
    <div class="mt-4">
      <ul>
        <li
          v-for="item in [
            { name: 'My day', route: '/myday', icon: Sun },
            { name: 'Important', route: '/important', icon: Star },
            { name: 'Tasks', route: '/tasks', icon: CircleCheck },
          ]"
          :key="item.name"
        >
          <nuxt-link
            :to="item.route"
            class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded"
            active-class="bg-gray-100"
          >
            <component class="w-4" :is="item.icon" />
            <span>{{ item.name }}</span>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>

import { Sun, Star, CircleCheck } from "lucide-vue-next";
</script>
