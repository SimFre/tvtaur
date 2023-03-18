<script setup>
  import { ref, computed } from "vue";
  // import ChannelListTable from "@/components/ChannelListTable.vue";
  // import ChannelListTree from "@/components/ChannelListTree.vue";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();
  const props = defineProps(['slug']);
      // const props = "live"; // | vod | series
      // const slug = "live";
</script>

<template>
  <router-view :key="slug" />
</template>
