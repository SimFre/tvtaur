
import { defineStore } from "pinia";

export const useIPTVStore = defineStore("IPTVStore", {
  state: () => {
    return {
      providers: [],
      exceptionObject: {},
      exceptionDisplay: false,

      // Temp
      hostname: null,
      username: null,
      password: null
    }
  },
  actions: {
    init() {
      const setup = async () => {
        this.providers.push({
          name: "IPTV Provider X",
          hostname: import.meta.env.VITE_HOSTNAME,
          username: import.meta.env.VITE_USERNAME,
          password: import.meta.env.VITE_PASSWORD
        });
        this.hostname = this.providers[0].hostname;
        this.username = this.providers[0].username;
        this.password = this.providers[0].password;
      }
      setup();
    },
    async getLiveCategories(provider) {
      try {
        const hn = this.providers[provider].hostname;
        const un = this.providers[provider].username;
        const pw = this.providers[provider].password;
        const url = `${hn}/player_api.php?username=${un}&password=${pw}&action=get_live_categories`;
        const res = await fetch(url);
        const dat = await res.json();
        console.log("Got data", dat);
        dat.map((cat) => {
          cat.streams = null;
          this.providers[provider].live[cat.category_id] = cat;
        });
        return dat;
      } catch (err) {
        console.log("Exception:", err);
      }
    },
    async getLiveStreams(provider, categoryId) {
      try {
        const hn = this.providers[provider].hostname;
        const un = this.providers[provider].username;
        const pw = this.providers[provider].password;
        const id = categoryId;
        const url = `${hn}/player_api.php?username=${un}&password=${pw}&action=get_live_streams&category_id=${id}`;
        const res = await fetch(url);
        const dat = await res.json();
        console.log("Got data", dat);
        this.providers[provider].live[categoryId] = [];
        dat.map((stream) => {
          this.providers[provider].live[categoryId][stream.stream_id] = cat;
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
