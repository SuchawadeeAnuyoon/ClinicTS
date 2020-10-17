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

    <!-- <v-btn icon>
      <v-badge
        v-if="queue.length > 0"
        color="red"
        overlap
        bordered
        :content="queue.length"
      >
        <v-icon>mdi-human-queue</v-icon>
      </v-badge>
      <v-icon v-if="(queue.length = 0)">mdi-human-queue</v-icon>
    </v-btn> -->

    <v-menu offset-y fixed left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-badge
            :value="queue.length"
            color="red"
            overlap
            bordered
            :content="queue.length"
          >
            <v-icon>mdi-human-queue</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="item in queue" :key="item.id">
          <v-list-item-title>คิวที่ : {{item.queue}}</v-list-item-title>
          <v-list-item-action class="mr-8">
            <v-btn color="indigo" dark>เรียกดู</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-menu>

    <v-card flat class="ml-4">
      <div>{{ name }}</div>
    </v-card>
  </v-app-bar>
</template>

<script>
import * as QueueApi from ".././utils/queueAPI";
export default {
  data() {
    return {
      name: "",
      queue: [],
      val: null,
      items: [
        { key: "test" },
        { key: "test" },
        { key: "test" },
        { key: "test" },
        { key: "test" },
        { key: "test" }
      ]
    };
  },
  mounted() {
    this.fetch();
    this.getQueue();
  },
  methods: {
    async fetch() {
      let me = await this.$auth.user.data;
      // console.log(this.me)
      this.name = `${me.title} ${me.first} ${me.last}`;

      const response = await QueueApi.getAllQueue();
      let data_q = await response.data.data;
      data_q.forEach(e => {
        if (e.approve == false) {
          this.queue.push(e);
        }
      });
    },
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    getQueue() {
      setInterval(async () => {
        let q = []
        const response = await QueueApi.getAllQueue();
        let data_q = await response.data.data;
        data_q.forEach(e => {
          if (e.approve == false) {
            q.push(e);
          }
        });
        this.queue = q
      }, 30 * 1000);
    }
  }
};
</script>
