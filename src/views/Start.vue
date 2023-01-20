<script setup>
import { ref } from "vue";
import { useIPTVStore } from "@/pinia/IPTVStore.js";
const iptv = useIPTVStore();
const visibleSidebar = ref();
visibleSidebar = false;

</script>

<template>
<Sidebar v-model:visible="visibleSidebar" :dissmissable="false" :showCloseIcon="false">
 <ul>
  <li v-for="cat of iptv.providers[0].live" :key="cat.category_id">{{ cat.category_id }}, {{ cat.category_name }}</li>
 </ul>
</Sidebar>
  <div>
    Hello!
  </div>

<Button icon="pi pi-arrow-right" @click="visibleLeft = true" />

<div>
    <Button label="Load Categories" @click="iptv.getLiveCategories(0);"></Button>
  </div>
  <samp>{{ iptv }}</samp>
</template>
