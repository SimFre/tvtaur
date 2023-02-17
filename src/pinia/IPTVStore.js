import { ref } from "vue";
import { defineStore } from "pinia";

export const useIPTVStore = defineStore("IPTVStore", {
  state: () => {
    return {
      menuNodes: ref({
        "root": []
      }),
      providers: [],
      exceptionObject: {},
      exceptionDisplay: false,
      play: null,
      debug: "no data"
    }
  },
  actions: {
    async init() {
      this.providers.push({
        id: 0,
        name: import.meta.env.VITE_PROVIDER,
        hostname: import.meta.env.VITE_HOSTNAME,
        username: import.meta.env.VITE_USERNAME,
        password: import.meta.env.VITE_PASSWORD,
        live: []
      });
      return true;
    },

    getProviders() {
      try {
        return this.providers;
      } catch (err) {
        console.log("Exception:", err);
      }
    },

    async getLiveCategories(providerId) {
      console.log("getLiveCategories", providerId);
      const p = this.providers[providerId];
      const hn = p.hostname;
      const un = p.username;
      const pw = p.password;
      const url = `${hn}/player_api.php?username=${un}&password=${pw}&action=get_live_categories`;
      console.log("URL:", url);
      const res = await fetch(url);
      const dat = await res.json();
      console.log("Got Categories", dat);
      if (!p.live) {
        p.live = [];
      }
      dat.map((cat) => {
        cat.provider_id = providerId;
        cat.streams = null;
        p.live.push(cat);
      });
      return dat;
    },

    async getLiveStreams(providerId, categoryId) {
      console.log("getLiveStreams", providerId, categoryId);
      try {
        const p = this.providers[providerId];
        const hn = p.hostname;
        const un = p.username;
        const pw = p.password;
        const id = categoryId;

        const index = p.live.findIndex(o => {
          return o.category_id == categoryId;
        });
        if (index < 0) { return false; }

        const url = `${hn}/player_api.php?username=${un}&password=${pw}&action=get_live_streams&category_id=${id}`;
        console.log("URL:", url);
        const res = await fetch(url);
        const dat = await res.json();
        console.log("Got Streams", dat);
        p.live[index].streams = [];
        dat.map((stream) => {
          stream.provider_id = providerId;
          p.live[index].streams.push(stream);
        });
        return dat;
      } catch (err) {
        console.log("Exception:", err);
      }
    },

    error(e) {
      this.exceptionObject = e;
      this.exceptionDisplay = true;
    },
  },
});
