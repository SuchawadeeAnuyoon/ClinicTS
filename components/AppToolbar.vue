<template>
  <v-app-bar elevation="3" fixed app color="white" dense>
    <v-app-bar-nav-icon @click.stop="toggleDrawer()" />

    <v-spacer></v-spacer>

    <v-btn icon>
      <v-badge v-if="true" color="red" overlap bordered>
        <v-icon>mdi-bell</v-icon>
      </v-badge>
      <v-icon v-if="false">mdi-bell</v-icon>
    </v-btn>

    <v-card flat class="ml-4">
      <div>{{name}}</div>
    </v-card>
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      name: ''
    };
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      let me = await this.$auth.user.data
      // console.log(this.me)
      this.name = `${me.title} ${me.first} ${me.last}`
    },
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  },
};
</script>
