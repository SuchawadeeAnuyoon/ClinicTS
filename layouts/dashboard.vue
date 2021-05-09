<template>
  <v-app dark>
    <template v-if="!isLoading">
      <app-toolbar />
      <app-drawer />
      <v-main>
        <div class="page-wrapper">
          <nuxt />
        </div>
      </v-main>
    </template>

    <!-- <loading
      :active.sync="isLoading"
      :can-cancel="false"
      :is-full-page="true"
    ></loading> -->
  </v-app>
</template>

<script>
import AppToolbar from "@/components/AppToolbar";
import AppDrawer from "@/components/AppDrawer";
// import Loading from 'vue-loading-overlay'
// import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  components: {
    AppToolbar,
    AppDrawer,
    // Loading,
  },
  data() {
    return {
      isLoading: false
    }
  },
  computed: {
  },
  async mounted() {
    this.isLoading = true
    await this.$store.dispatch("me/me");
    await this.$store.dispatch("queues/fetch");
    await this.$store.dispatch("medicalSupplies/fetch");
    this.isLoading = false
  }
};
</script>
