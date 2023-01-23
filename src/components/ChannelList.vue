<script setup>
import { ref, onMounted } from "vue";
import { useIPTVStore } from "@/pinia/IPTVStore.js";
const iptv = useIPTVStore();

const loading = ref(false);
const previousSelection = ref({});
const expandedKeys = ref({});

function getProviderNodes() {
  const children = [];
  let pNum = 0;
  const providerList = iptv.getProviders();
  console.log("Provider List", providerList);
  for (const p of providerList) {
    const pEntry = {
      "key": "" + pNum,
      "label": p.name,
      "data": {
        provider_id: p.id,
        provider_name: p.name
      },
      "icon": "pi pi-fw pi-server",
      "type": "provider",
      "children": [],
      "leaf": false
    };
    children.push(pEntry);
    pNum++;
  }
  return children;
}

function getCategoryNodes(parentKey, nodes) {
  const children = [];
  if (nodes != null) {
    let num = 0;
    for (const n of nodes) {
      n.num = num;
      n.key = parentKey + "-" + n.num;
      const entry = {
        "key": n.key,
        "label": n.category_name,
        "data": n,
        "icon": "pi pi-fw pi-desktop",
        "type": "category",
        "children": [],
        "leaf": false
      }
      children.push(entry);
      num++;
    }
  }
  return children;
}

function getStreamNodes(parentKey, nodes) {
  const children = [];
  if (nodes != null) {
    for (const n of nodes) {
      n.key = parentKey + "-" + n.num;
      const entry = {
        "key": n.key,
        "label": n.name,
        "data": n,
        "icon": "pi pi-fw pi-circle",
        "type": "stream",
        "leaf": true
      }
      children.push(entry);
    }
  }
  return children;
}


async function onNodeSelect(e) {
  console.log("Select", e);
  if (e.type == "stream") {
    previousSelection.value.icon = "pi pi-fw pi-circle";
    previousSelection.value = e;
    e.icon = "pi pi-fw pi-circle-fill";
    iptv.debug = e;
    iptv.play = {
      type: e.type,
      providerId: e.data.provider_id,
      categoryId: e.data.category_id,
      streamId: e.data.stream_id,
    }
    console.log("Play:", iptv.play);
  }

  else {
    iptv.debug = "null";
    if (e.key in expandedKeys.value) {
      delete expandedKeys.value[e.key];
    } else {
      expandedKeys.value[e.key] = true;
      onNodeExpand(e);
    }
  }
}

async function onNodeExpand(e) {
  console.log("Expanded", e);

  if (e.type == "provider" && e.children.length == 0) {
    const categories = await iptv.getLiveCategories(e.data.provider_id);
    e.children = getCategoryNodes(e.key, categories);
  }
  else if (e.type == "category" && e.children.length == 0) {
    const streams = await iptv.getLiveStreams(e.data.provider_id, e.data.category_id);
    e.children = getStreamNodes(e.key, streams);
  }
}

function onNodeUnselect(e) {
  console.log("UnSelect", e);
}

onMounted(() => {
  iptv.menuNodes.root = getProviderNodes();
})

</script>

<template>
  <Tree v-if="iptv.menuNodes.root.length > 0" :value="iptv.menuNodes.root" selectionMode="single"
    v-model:expandedKeys="expandedKeys" :metaKeySelection="false" @nodeSelect="onNodeSelect"
    @nodeUnselect="onNodeUnselect" @nodeExpand="onNodeExpand" :rowHover="true" :lazy="true" :loading="loading"
    indentation="0.2" class="p-treetable-sm" :scrollable="true" scrollHeight="flex"></Tree>
</template>