<script setup>
  import { ref, computed } from "vue";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();

</script>

<template>
  <div className="grid">
    <div className="col-12">
      <div className="card">
        <h5>Welcome to TVTaur</h5>
        <samp>{{ iptv.debug }}</samp>
      </div>
    </div>
  </div>
</template>
