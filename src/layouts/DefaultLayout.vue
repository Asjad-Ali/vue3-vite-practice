<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
</script>
<template>
  <div>
    <Header />
    <h1>Default layout</h1>
    <RouterView></RouterView>
    <Footer />
  </div>
</template>
