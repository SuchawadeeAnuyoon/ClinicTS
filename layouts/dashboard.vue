<template>
  <v-app dark>
    <template>
      <app-toolbar />
      <app-drawer />
      <v-main>
        <div class="page-wrapper">
          <nuxt />
        </div>
      </v-main>
    </template>
  </v-app>
</template>

<script>
import AppToolbar from "@/components/AppToolbar";
import AppDrawer from "@/components/AppDrawer";
export default {
  components: {
    AppToolbar,
    AppDrawer
  }
};
</script>
