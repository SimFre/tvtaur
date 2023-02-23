<script setup>
  import { ref, computed } from "vue";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();

</script>

<template>
  <p>Welcome to TVTaur</p>
  <samp>{{ iptv.debug }}</samp>
</template>
