<script setup>
  import ChannelListTable from "./components/ChannelListTable.vue";
  import ChannelListTree from "./components/ChannelListTree.vue";

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
  <TopBar />
  <div class="grid vertical-align-top text-white h-screen">
    <div class="col-3 h-full max-h-screen overflow-scoll surface-800 opacity-90 p-0">
      <ChannelListTree />
    </div>
    <div class="col-9 align-items-center surface-800 opacity-90 justify-content-center">
      <router-view v-if="enabled" />
      <p v-else>Loading config...</p>
    </div>
  </div>
</template>
