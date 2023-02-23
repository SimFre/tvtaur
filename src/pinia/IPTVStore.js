import { ref } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import * as path from "@tauri-apps/api/path";
import * as fs from "@tauri-apps/api/fs";

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
      try {
        const configFilename = import.meta.env.VITE_CONFIGFILE;
        const configFilepath = await path.resolveResource("resources/" + configFilename);
        const configFound = await fs.exists(configFilename, { dir: path.BaseDirectory.Resource });


        /// FIXME THE SCOPE NEEDS TO BE SET.
        if (configFound) {
        const configDocument = await fs.readTextFile(configFilepath);
        const config = await JSON.parse(configDocument);
        console.log("Loaded Config", config);
        this.providers = config.providers;
        return true;
        }
        else {
          console.log("No config file found.");
          return false;
        }
      } catch (err) {
        console.log("Init Error", err);
        return false;
      }
    },

    async save() {
      try {
        const configData = {
          "timestamp": Date.toISOString(),
          "providers": structuredClone(this.providers)
        };
        const configFilename = import.meta.env.VITE_CONFIGFILE;
        const configFilepath = await path.resolveResource("resources/" + configFilename);
        const configDocument = await fs.writeTextFile({
            path: configFilepath,
            contents: JSON.stringify(configData)
          },
          { dir: BaseDirectory.Resource }
        );
        return configDocument;
      } catch (err) {
        console.log("Save Error", err);
        return false;
      }
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
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useIPTVStore, import.meta.hot));
}