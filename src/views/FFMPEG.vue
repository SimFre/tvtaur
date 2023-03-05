<script setup>
  import { ref, computed } from "vue";
  import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
  import { useIPTVStore } from "@/pinia/IPTVStore.js";
  const iptv = useIPTVStore();

  const playerurl = ref("");
  // https://www.youtube.com/watch?v=-OTc0Ki7Sv0&ab_channel=Fireship
  // 2:55 in
  async function streamVideo() {
    // Load ffmpeg

    console.log("Create ffmpeg");
    const ffmpeg = createFFmpeg({ log: true });
    console.log("Load ffmpeg");
    try {
      await ffmpeg.load();

      const videoFileName = "/example.mpg";
      playerurl.value = "INSERT STREAMING URL HERE";
      //playerurl.value = URL.createObjectURL(videoFileName);
      console.log("playerurl", playerurl.value);

      // Write file to memory
      ffmpeg.FS("writeFile", "input.mp4", await fetchFile(playerurl.value));
      console.log("wrote to memory");

      // Execute ffmpeg
      ffmpeg.run("-i", "input.mp4", "-c:v", "libvpx", "-c:a", "libvorbis", "output.webm");
      console.log("ffmpeg ran");

      // Read the result
      const data = ffmpeg.FS("readFile", "output.webm");
      console.log("read frp, ffmpeg");



      // Create video URL
      const outputurl = URL.createObjectURL(new Blob([data.buffer], { type: "video/webm" }));
      playerurl.value = outputurl;
    } catch (err) {
      console.error("ffmpeg exception", err);
    }
  }

</script>

<template>
  <!-- <video v-if="playerurl"
                       :key="playerurl"
                       width="320"
                       height="240"
                       autoplay
                       controls>
                  <source :src="playerurl" />
                </video> -->
  <Button icon="pi pi-arrow-right"
          label="GO!"
          @click="streamVideo" />
  <samp>{{ playerurl ?? "blank" }}</samp>
</template>
