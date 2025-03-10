<template>
    <div>
      <Header :headerType="headerType" />
      <div class="content">
        <router-view></router-view>
      </div>
      <Footer v-if="show" />
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from "vue";
  import { useRoute } from "vue-router";
  import Header from "./views/Header.vue";
  import Footer from "./views/Footer.vue";
  
  const route = useRoute();
  const headerType = ref(null);
  const show = ref(false);
  
  watch(route, (to) => {
    if (to.path.startsWith("/user") || to.path.startsWith("/annotator") || to.path.startsWith("/checker") || to.path.startsWith("/work")) {
      headerType.value = "user";
      show.value = false;
    } else if (to.path.startsWith("/admin")) {
      headerType.value = "admin";
      show.value = false;
    } else {
      headerType.value = "welcome";
      show.value = true;
    }
  });
  </script>
  