
<script setup>
  import { ref } from 'vue';
  const active = ref(3);
  const items = ref([
    {
      label: 'Live TV',
      icon: 'pi pi pi-globe',
      to: '/live'
    },
    {
      label: 'VOD',
      icon: 'pi pi-eye',
      to: '/vod',
      disabled: true
    },
    {
      label: 'Series',
      icon: 'pi pi-video',
      to: '/series',
      disabled: true
    },
    {
      label: 'Favorites',
      icon: 'pi pi-heart',
      to: '/favorites',
      disabled: true
    },
    {
      label: 'Streamer',
      icon: 'pi pi-truck',
      to: '/streamer'
    },
    {
      label: 'Settings',
      icon: 'pi pi-cog',
      to: '/settings'
    },
  ]);
</script>

<template>
  <TabMenu :model="items" />
</template>
