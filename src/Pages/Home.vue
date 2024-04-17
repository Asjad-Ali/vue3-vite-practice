<script setup>
import VuePdfEmbed, { useVuePdfEmbed } from "vue-pdf-embed";

const { doc } = useVuePdfEmbed({
  source:
    "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
});
</script>

<template>
  <div>
    <VuePdfEmbed :source="doc" />
  </div>
</template>

<!-- <template>
  <iframe
    :src="pdfUrl"
    frameborder="0"
    style="width: 100%; height: 400px"
  ></iframe>
</template>

<script>
export default {
  data() {
    return {
      pdfUrl:
        "https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf",
    };
  },
};
</script> -->
