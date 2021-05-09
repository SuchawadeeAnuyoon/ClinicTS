<template>
  <v-app>
    <nuxt />

    <!-- <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading> -->
  </v-app>
</template>

<script>
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  // components: {Loading},
  computed: {
    // isLoading() {
    //   return this.$store.getters['loading/getLoading']
    // },
  }
};
</script>
