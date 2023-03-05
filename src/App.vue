<script setup>
  // Initialize stuff
  import { ref } from "vue";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  import TopBar from "./components/TopBar.vue";
  const iptv = useIPTVStore();
  const enabled = ref(0);
  iptv.init().then((p1) => {
    console.log("Loaded Config:", p1);
    enabled.value = true;
  });
</script>

<template>
  <template v-if="enabled">
    <TopBar />
    <router-view />
  </template>
  <p v-else>Loading config...</p>
</template>
