<script setup>
  import { ref, computed } from "vue";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();
  // const visibleSidebar = ref(false);
  const props = defineProps(['slug']);

  const stream = ref("Waiting");
  const playerurl = computed(() => {
    if (iptv.play == null) { return null }
    const i = iptv.play.providerId;
    const h = iptv.providers[i].hostname;
    const u = iptv.providers[i].username;
    const p = iptv.providers[i].password;
    const s = iptv.play.streamId;
    const f = iptv.play.extension ? "." + iptv.play.extension : ""; // File suffix
    let t = "";

    switch (iptv.play.section) {
      case "vod":
      case "movie":
        t = "/movie";
        break;
      case "series":
        t = "/series";
        break;
      default:
        t = "";
        break;
    }
    console.log("Play:", i, h, u, p, s, t, f);
    return `${h}${t}/${u}/${p}/${s}${f}`;
  });
</script>

<template>
  <div className="grid">
    <div className="col-12">
      <div className="card">
        <video v-if="playerurl"
               :key="playerurl"
               autoplay
               controls
               style="width: 100%; height: 100%;">
          <source :src="playerurl" />
        </video>
        <!-- <Button icon="pi pi-arrow-right" @click="visibleSidebar = true" /> -->
        <!-- <samp>{{ playerurl ?? "blank" }}</samp>
                <samp>{{ iptv.debug }}</samp> -->


        <!-- <samp>cat: {{ cat }}</samp> -->
        <!-- <samp>stream: {{ stream }}</samp> -->
      </div>
    </div>
  </div>
</template>
