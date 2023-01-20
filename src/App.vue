<script setup>
// Initialize stuff
import { useIPTVStore } from "@/pinia/IPTVStore.js";
const iptv = useIPTVStore();
iptv.init();
</script>

<template>
  <main class="container">
    <router-view />
  </main>
</template>
