<template>
    <div>
      <WelcomeHead v-if="headerType === 'welcome'" ></WelcomeHead>
      <UserHead v-if="headerType === 'user'" ></UserHead>
      <AdminHead v-if="headerType === 'admin'" ></AdminHead>
    </div>
  </template>
  
  <script>
  import WelcomeHead from './WelcomeHead.vue';
  import AdminHead from './AdminHead.vue';
  import UserHead from './UserHead.vue';

  export default {
    props: {
    headerType: String,
  },
    components: {
        WelcomeHead,
        AdminHead,
        UserHead
  }
  };
  </script>
  