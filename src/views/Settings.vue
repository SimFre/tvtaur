
<script setup>
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();
</script>

<template>
  <div class="surface-section">
    <div class="font-medium text-3xl text-900 mb-3">Application Settings</div>
    <ul class="list-none p-0 m-0">
      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Hostname</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
          <InputText v-model="iptv.providers[0].hostname" />
        </div>
      </li>
      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Username</div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1">
          <InputText v-model="iptv.providers[0].username" />
        </div>
      </li>
      <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium">Password</div>
        <InputText v-model="iptv.providers[0].password" />
      </li>
      <li class="flex align-items-center py-3 px-2 border-top-1 border-bottom-1 surface-border flex-wrap">
        <div class="text-500 w-6 md:w-2 font-medium"></div>
        <div class="text-900 w-full md:w-8 md:flex-order-0 flex-order-1 line-height-3">
          <Button label="Save"
                  icon="pi pi-save"
                  class="p-button-success"
                  @click="iptv.save()"></Button>
        </div>
      </li>
    </ul>
  </div>
</template>