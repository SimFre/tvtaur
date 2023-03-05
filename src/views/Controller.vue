<script setup>
  import { ref, computed } from "vue";
  // import ChannelListTable from "@/components/ChannelListTable.vue";
  import ChannelListTree from "@/components/ChannelListTree.vue";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();
  const props = defineProps(['slug']);
</script>

<template>
  <samp>Props: _{{ props }}_</samp>
  <div class="grid vertical-align-top text-white h-screen">
    <div class="col-3 h-full max-h-screen overflow-scoll surface-800 opacity-90 p-0">
      <ChannelListTree :section="props.slug"
                       :key="props.slug" />
    </div>
    <div class="col-9 align-items-center surface-800 opacity-90 justify-content-center">
      <router-view :key="props.slug" />
    </div>
  </div>
</template>
