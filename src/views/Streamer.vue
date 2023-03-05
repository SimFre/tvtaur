<script setup>
  import { ref, computed } from "vue";
  import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  import Hls from 'hls.js';
  const iptv = useIPTVStore();

  const playerurl = ref("");
  const videoplayer = ref(null);
  // https://www.youtube.com/watch?v=-OTc0Ki7Sv0&ab_channel=Fireship
  // 2:55 in
  async function streamVideo() {
    const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
    console.log("HLS Supported", Hls.isSupported());
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: false });
      hls.loadSource(videoSrc);
      hls.attachMedia(videoplayer.value);
      hls.on(Hls.Events.MANIFEST_PARSED, function (z) {
        videoplayer.value.play();
      });
    }
    // When the browser has built-in HLS support (check using `canPlayType`),
    // we can provide an HLS manifest (i.e. .m3u8 URL) directly to the video
    // element through the `src` property. This is using the built-in support
    // of the plain video element, without using HLS.js.
    //
    // Note: it would be more normal to wait on the 'canplay' event below however
    // on Safari (where you are most likely to find built-in HLS support) the
    // video.src URL must be on the user-driven white-list before a 'canplay'
    // event will be emitted; the last video event that can be reliably
    // listened-for when the URL is not on the white-list is 'loadedmetadata'.
    else if (videoplayer.value.canPlayType('application/vnd.apple.mpegurl')) {
      videoplayer.value.src = videoSrc;
    }

    else {
      console.error("Hls is not supported");
    }
  }
</script>

<template>
  <Button icon="pi pi-arrow-right"
          label="GO!"
          @click="streamVideo" />
  <samp>{{ playerurl ?? "blank" }}</samp>

  <video ref="videoplayer"
         width="500"
         height="500"
         controls
         style="border: solid 2px brown"></video>
</template>
