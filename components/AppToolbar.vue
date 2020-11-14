<template>
  <div>
    <v-app-bar elevation="3" fixed app color="white" height="60">
      <v-app-bar-nav-icon @click.stop="toggleDrawer()" />

      <v-spacer></v-spacer>

      <v-menu offset-y fixed left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-badge
              :value="wait.length"
              color="red"
              overlap
              bordered
              :content="wait.length"
            >
              <v-icon>mdi-pill</v-icon>
            </v-badge>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in wait" :key="item.id">
            <v-list-item-title
              >{{ item.queue }}: {{ item.medicalRecode.first }}
              {{ item.medicalRecode.last }}</v-list-item-title
            >
            <v-list-item-action class="mr-8">
              <v-btn color="indigo" dark small @click="view(item._id)"
                >เรียกดู</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

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
            <v-card flat width="250" :to="`/medicalSupplies/${item.id}`">
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
            <v-list-item-title
              >{{ item.queue }}: {{ item.medicalRecode.first }}
              {{ item.medicalRecode.last }}</v-list-item-title
            >
            <v-list-item-action class="mr-8">
              <v-btn
                v-if="role"
                color="indigo"
                small
                dark
                :to="`/symptom/${item._id}`"
                >เรียกดู</v-btn
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-card flat class="ml-4">
        <div>{{ name }}</div>
      </v-card>
    </v-app-bar>

    <v-dialog
      v-model="dialog_drug"
      scrollable
      persistent
      :overlay="false"
      max-width="50%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-text>
          <v-container fluid>
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="12">
                  <v-text-field
                    v-model="payment.treatment_cost"
                    label="ค่ารักษา"
                    :rules="rules.payment"
                    dense
                    @keypress="onlyForCurrency"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>

          <v-simple-table>
            <thead>
              <tr>
                <th>ชื่อยา</th>
                <th>จำนวน</th>
                <th>ราคา</th>
                <th>สั่งโดย</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in drug_list" :key="list._id">
                <th>{{ list.name_drug }}</th>
                <th>{{ list.amount }}</th>
                <th>{{ list.price }}</th>
                <th>{{ list.order_by_name }}</th>
              </tr>
            </tbody>
          </v-simple-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="blue"
            :href="`/registration/certificate/${symptom_id}`"
            target="_blank"
            text
            v-if="cert"
            >ใบรับรองแพทย์</v-btn
          >
          <v-btn
            color="blue"
            :href="`/registration/appointment/${symptom_id}`"
            target="_blank"
            text
            v-if="appo"
            >ใบนัด</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" @click="dialog_drug = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" @click="save()">
            จ่ายยา
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="loading" width="200">
      <v-card width="200" height="200" flat class="text-center">
        <v-card-subtitle>กำลังอัพโหลดข้อมูล</v-card-subtitle>
        <v-progress-circular
          align-center
          class="my-4"
          centered
          indeterminate
          color="primary"
          :size="100"
          :width="10"
        ></v-progress-circular>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as QueueApi from ".././utils/queueAPI";
import * as MedicalSuppliesAPI from ".././utils/medicalSuppliesAPI";
import * as SymptomAPI from ".././utils/symptomAPI";
import * as DrugListAPI from ".././utils/drugListAPI";
import * as PaymentAPI from ".././utils/paymentAPI";
import momentFormat from ".././utils/moment";
import moment from "moment";
export default {
  data() {
    return {
      role: null,
      name: "",
      queue: [],
      wait: [],
      val: null,
      expire: momentFormat.format(new Date()),
      noti: [],
      dialog_drug: false,
      drug_list: [],
      loading: false,
      q_id: null,
      symptom_id: "",
      cert: false,
      appo: false,
      drug_price: null,
      payment: {
        treatment_title: "ค่ารักษา"
      },
      rules: {
        payment: []
      }
    };
  },
  computed: {},
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

      if (me.role == "nurse" || me.role == "assistant") {
        this.role = false;
      } else {
        this.role = true;
      }

      const response = await QueueApi.getAllQueue();

      let data_q = await response.data.data;
      await data_q.forEach(async e => {
        if (e.approve == "wait") {
          await this.queue.push(e);
        }
        if (e.approve == "await_drug") {
          await this.wait.push(e);
        }
      });

      const response2 = await MedicalSuppliesAPI.getAllMedicalSupplies();
      let supplies = response2.data.data;
      let n = [];

      supplies.forEach(async e => {
        let supply_expire = await moment(e.expire, "YYY-MM-DD");
        let check = await moment(this.expire, "YYY-MM-DD");

        let total = await e.total;
        let ex = await supply_expire.diff(check, "days");

        if (total <= 20 || ex <= 30) {
          if (total <= 20 && ex > 30) {
            n.push({
              id: e._id,
              name: e.medical_name,
              msg: `จะหมดคลัง เหลือ ${e.total} ${e.unit}`
            });
            // console.log(unit);
          } else if (ex <= 30 && total > 20) {
            n.push({
              id: e._id,
              name: e.medical_name,
              msg: `จะหมดอายุในอีก ${ex +
                1} วัน คือ ${momentFormat.format_local(e.expire)}`
            });
            // console.log(ex);
          } else {
            n.push({
              id: e._id,
              name: e.medical_name,
              msg: `จะหมดคลัง เหลือ ${e.total} ${
                e.unit
              } และจะหมดอายุในอีก ${ex} วัน คือ ${momentFormat.format_local(
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
        let q = await [];
        let w = await [];
        const response = await QueueApi.getAllQueue();
        let data_q = await response.data.data;
        data_q.forEach(e => {
          if (e.approve == "wait") {
            q.push(e);
          }
          if (e.approve == "await_drug") {
            w.push(e);
          }
        });
        this.queue = await q;
        this.wait = await w;
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

          let total = await e.total;
          let ex = await supply_expire.diff(check, "days");

          if (total <= 20 || ex <= 30) {
            if (total <= 20 && ex > 30) {
              n.push({
                id: e.id,
                name: e.medical_name,
                msg: `จะหมดคลัง เหลือ ${e.total} ${e.unit}`
              });
            } else if (ex <= 30 && total > 20) {
              n.push({
                id: e.id,
                name: e.medical_name,
                msg: `จะหมดอายุในอีก ${ex} คือ ${momentFormat.format_local(
                  e.expire
                )}`
              });
            } else {
              n.push({
                id: e.id,
                name: e.medical_name,
                msg: `จะหมดคลัง เหลือ ${e.total} ${
                  e.unit
                } และจะหมดอายุในอีก ${ex} คือ ${momentFormat.format_local(
                  e.expire
                )}`
              });
            }
          }
        });
        this.noti = n;
      }, 60 * 1000);
    },

    async view(id) {
      this.q_id = await id;
      this.loading = await true;
      this.drug_list = await [];
      this.drug_price = 0;
      const res_q = await QueueApi.getQueue(id);
      // this.dialog_drug = await true
      const response = await SymptomAPI.getSymptom(res_q.data.data.symptom);

      this.symptom_id = response.data.data.id;

      if (response.data.data.certificate == true) {
        this.cert = true;
      }
      if (response.data.data.appointment == true) {
        this.appo = true;
      }

      await response.data.data.drugPush.forEach(async e => {
        if (e.status != true) {
          // console.log(e.status)
          this.drug_price += e.price;
          await this.drug_list.push(e);
        } else {
          this.drug_list = await [];
        }
      });

      this.loading = await false;

      this.dialog_drug = await true;
      // console.log(this.drug_price)
    },
    async save() {
      if (!this.payment.treatment_cost) {
        this.rules = {
          payment: [v => !!v || "กรุณากรอกค่ารักษา"]
        };
        this.$refs.form.validate();
      } else {
        // this.loading = await true;
        let form = await {
          approve: "success"
        };

        this.payment.symptom = await {
          _id: this.symptom_id
        };
        this.payment.total_price =
          (await parseFloat(this.payment.treatment_cost)) + this.drug_price;

        // this.payment = await {
        //   symptom: {
        //     _id: this.symptom_id
        //   },
        //   total_price: parseFloat(this.payment.treatment_cost) + this.drug_price
        // }

        console.log(this.payment);

        this.drug_list.forEach(async e => {
          await DrugListAPI.paidDrugList(e._id);
        });

        await QueueApi.updateQueue(this.q_id, form);
        const response = await PaymentAPI.createPayment(this.payment);
        this.loading = await false;
        this.dialog_drug = await false;

        // console.log(response.data.data)
        if (response.data.success == true) {
          this.$router.push({
            path: `/payment/${response.data.data._id}`
          });
        }
      }
    },
    onlyForCurrency($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.payment.treatment_cost.indexOf(".") != -1)
      ) {
        $event.preventDefault();
      }
      if (
        this.payment.treatment_cost != null &&
        this.payment.treatment_cost.indexOf(".") > -1 &&
        this.payment.treatment_cost.split(".")[1].length > 1
      ) {
        $event.preventDefault();
      }
    }
  }
};
</script>
