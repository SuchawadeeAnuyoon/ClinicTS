<template>
  <v-app-bar elevation="3" fixed app color="white" dense>
    <v-app-bar-nav-icon @click.stop="toggleDrawer()" />

    <v-spacer></v-spacer>

    <v-menu offset-y fixed left>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-badge
            :value="noti.length"
            color="red"
            overlap
            bordered
            :content="noti.length"
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="item in noti" :key="item.id">
          <!-- <v-list-item-title>{{ item.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.msg }}</v-list-item-subtitle> -->
          <v-card flat width="250">
            <!-- <v-card-title>{{ item.name }}</v-card-title> -->
            <v-card-text>{{ item.name }} {{ item.msg }}</v-card-text>
          </v-card>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </v-menu>

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
          <v-list-item-title>คิวที่ : {{ item.queue }}</v-list-item-title>
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
import * as MedicalSuppliesAPI from ".././utils/medicalSuppliesAPI";
import momentFormat from ".././utils/moment";
import moment from "moment";
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
      ],
      expire: momentFormat.format(new Date()),
      noti: []
    };
  },
  mounted() {
    this.fetch();
    this.getQueue();
    this.suppliesNoti();
  },
  methods: {
    async fetch() {
      let me = await this.$auth.user.data;
      // console.log(this.me)
      this.name = `${me.title} ${me.first} ${me.last}`;

      const response = await QueueApi.getAllQueue();
      let data_q = await response.data.data;
      await data_q.forEach(async e => {

        if (e.approve == 'false') {
          await this.queue.push(e);
        }
      });

      const response2 = await MedicalSuppliesAPI.getAllMedicalSupplies();
      let supplies = response2.data.data;
      let n = [];

      supplies.forEach(async e => {
        let supply_expire = await moment(e.expire, "YYY-MM-DD");
        let check = await moment(this.expire, "YYY-MM-DD");

        let amount = await e.amount;
        let ex = await supply_expire.diff(check, "days");

        if (amount <= 20 || ex <= 30) {
          if (amount <= 20 && ex > 30) {
            n.push({
              name: e.medical_name,
              msg: `จะหมดคลัง เหลือ ${e.amount} ${e.unit}`
            });
            // console.log(unit);
          } else if (ex <= 30 && amount > 20) {
            n.push({
              name: e.medical_name,
              msg: `จะหมดอายุในอีก ${ex} คือ ${momentFormat.format_local(
                e.expire
              )}`
            });
            // console.log(ex);
          } else {
            n.push({
              name: e.medical_name,
              msg: `จะหมดคลัง เหลือ ${e.amount} ${
                e.unit
              } และจะหมดอายุในอีก ${ex} คือ ${momentFormat.format_local(
                e.expire
              )}`
            });
            // console.log(`${unit} and ${ex}`);
          }
        }
      });
      // console.log(n);
      this.noti = n;
    },
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },
    getQueue() {
      setInterval(async () => {
        let q = [];
        const response = await QueueApi.getAllQueue();
        let data_q = await response.data.data;
        data_q.forEach(e => {
          if (e.approve == 'false') {
            q.push(e);
          }
        });
        this.queue = q;
      }, 30 * 1000);
    },
    async suppliesNoti() {

      setInterval(async () => {
        const response = await MedicalSuppliesAPI.getAllMedicalSupplies();
        let supplies = response.data.data;
        let n = [];

        supplies.forEach(async e => {
          let supply_expire = await moment(e.expire, "YYY-MM-DD");
          let check = await moment(this.expire, "YYY-MM-DD");

          let amount = await e.amount;
          let ex = await supply_expire.diff(check, "days");

          if (amount <= 20 || ex <= 30) {
            if (amount <= 20 && ex > 30) {
              n.push({
                name: e.medical_name,
                msg: `จะหมดคลัง เหลือ ${e.amount} ${e.unit}`
              });
              // console.log(unit);
            } else if (ex <= 30 && amount > 20) {
              n.push({
                name: e.medical_name,
                msg: `จะหมดอายุในอีก ${ex} คือ ${momentFormat.format_local(
                  e.expire
                )}`
              });
              // console.log(ex);
            } else {
              n.push({
                name: e.medical_name,
                msg: `จะหมดคลัง เหลือ ${e.amount} ${
                  e.unit
                } และจะหมดอายุในอีก ${ex} คือ ${momentFormat.format_local(
                  e.expire
                )}`
              });
              // console.log(`${unit} and ${ex}`);
            }
          }
        });
        this.noti = n;
      }, 60 * 1000);
    }
  }
};
</script>
