<script setup>
import { ref, computed } from "vue";
import { useIPTVStore } from "@/pinia/IPTVStore.js";
const iptv = useIPTVStore();
// const visibleSidebar = ref(false);

const stream = ref("Waiting");
const playerurl = computed(() => {
  if (iptv.play == null) { return null }
  const i = iptv.play.providerId;
  const h = iptv.providers[i].hostname;
  const u = iptv.providers[i].username;
  const p = iptv.providers[i].password;
  const s = iptv.play.streamId;
  let t = "";
  switch (iptv.play.type) {
    case "movie":
    case "series":
      t = "/" + iptv.play.type;
      break;
    default:
      t = "";
      break;
  }
  console.log("Play:", i, h, u, p, s, t);
  return `${h}${t}/${u}/${p}/${s}`;
})

</script>

<template>
  <video v-if="playerurl" :key="playerurl" width="320" height="240" autoplay controls>
    <source :src="playerurl" />
  </video>
  <!-- <Button icon="pi pi-arrow-right" @click="visibleSidebar = true" /> -->
  <samp>{{ playerurl ?? "blank"}}</samp>
  <samp>{{ iptv.debug }}</samp>


  <!-- <samp>cat: {{ cat }}</samp> -->
  <!-- <samp>stream: {{ stream }}</samp> -->
</template>
