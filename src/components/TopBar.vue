
<script>
  import { ref } from 'vue';
  // import { useSiteStore } from "@/pinia/SiteStore.js";
  export default {
    //setup() {
    //  const SiteStore = useSiteStore();
    //  return { SiteStore };
    //},
    name: "TopBar",
    emits: ["section"],

    data() {
      return {
        items: null,
        active: null
      };
    },

    methods: {
      emitSection(tab) {
        this.$emit('section', this.items[tab.index]);
      }
    },

    mounted() {
      this.items = [
        {
          key: "live",
          label: 'Live TV',
          icon: 'pi pi pi-globe',
          //command: this.emitSection('live'),
          // to: '/live'
        },
        {
          key: "vod",
          label: 'VOD',
          icon: 'pi pi-eye',
          //command: this.emitSection('section', 'vod'),
          // to: '/vod',
          // disabled: true
        },
        {
          key: "series",
          label: 'Series',
          icon: 'pi pi-video',
          //command: this.emitSection('series'),
          // to: '/series',
          // disabled: true
        },
        {
          key: "favorites",
          label: 'Favorites',
          icon: 'pi pi-heart',
          to: '/favorites',
          disabled: true
        },
        {
          key: "streamer",
          label: 'Streamer',
          icon: 'pi pi-truck',
          to: '/streamer'
        },
        {
          key: "settings",
          label: 'Settings',
          icon: 'pi pi-cog',
          to: '/settings'
        },
      ];
    }
  }
</script>

<template>
  <TabMenu :model="items"
           v-model:activeIndex="active"
           @tabChange="emitSection" />
</template>
