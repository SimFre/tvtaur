<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();
  const router = useRouter();

  const loading = ref(false);
  const previousSelection = ref({});
  const expandedKeys = ref({});

  const props = defineProps(['section']);
  const SECTION = props.section;

  function getProviderNodes() {
    const children = [];
    let pNum = 0;
    console.log("Get Provider List");
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

  function convertToCategoryNodes(parentKey, nodes) {
    console.log("convertToCategoryNodes; parentKey", parentKey, nodes);
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

  function convertToStreamNodes(parentKey, nodes) {
    console.log("convertToStreamNodes; parentKey", parentKey, nodes);
    const children = [];
    if (nodes) {
      for (const n of nodes) {
        n.key = parentKey + "-" + n.num;
        const entry = {
          "key": n.key,
          "label": n.name,
          "data": n,
          "icon": "pi pi-fw pi-circle",
          "type": "stream",
          "section": SECTION,
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
        streamId: e.data.stream_id ?? e.data.series_id ?? -1,
        section: SECTION,
        extension: e.data.container_extension
      }

      //if (SECTION == "vod" || SECTION == "series") {
      //  const streamInfo = await iptv.getInfo(iptv.play.providerId, iptv.play.section, iptv.play.streamId);
      //  console.log("ZZSTREAM INFO:", streamInfo);
      //  if (streamInfo.movie_data.container_extension) {
      //    iptv.play.extension = "." + streamInfo.movie_data.container_extension;
      //  }
      //}

      console.log("Play:", iptv.play);
      router.push({ path: "/" + SECTION + "/play" });
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
      const categories = await iptv.getCategories(e.data.provider_id, SECTION);
      e.children = convertToCategoryNodes(e.key, categories);
    }
    else if (e.type == "category" && e.children.length == 0) {
      const streams = await iptv.getStreams(e.data.provider_id, SECTION, e.data.category_id);
      e.children = convertToStreamNodes(e.key, streams);
    }
    // else if (e.type == "series" && e.children.length == 0) {
    //   const streams = await iptv.getInfo(e.data.provider_id, SECTION, e.data.category_id)
    //   e.children = convertToStreamNodes(e.key, streams);
    // }
  }

  function onNodeUnselect(e) {
    console.log("UnSelect", e);
  }

  onMounted(() => {
    iptv.menuNodes.root = getProviderNodes();
    console.log("Provider Nodes:", iptv.menuNodes.root);
  })

</script>

<template>
  <Tree v-if="iptv.menuNodes.root.length > 0"
        :value="iptv.menuNodes.root"
        selectionMode="single"
        v-model:expandedKeys="expandedKeys"
        :metaKeySelection="false"
        @nodeSelect="onNodeSelect"
        @nodeUnselect="onNodeUnselect"
        @nodeExpand="onNodeExpand"
        :rowHover="true"
        :lazy="true"
        :loading="loading"
        indentation="0.2"
        class="p-treetable-sm"
        :scrollable="true"
        scrollHeight="flex">
  </Tree>

  <!-- <samp>{{ iptv.menuNodes }}</samp> -->
</template>