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
            <v-card flat width="270" :to="`/medicalSupplies/${item.id}`">
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
              <v-row v-for="(item, i) in treatments" :key="i">
                <v-col class="pb-0" cols="12" sm="8">
                  <v-combobox
                    label="หัวข้อ/บริการ"
                    dense
                    v-model="item.title"
                    :items="list_title_treatments"
                  ></v-combobox>
                  <!-- <v-text-field
                    v-model="item.title"
                    label="หัวข้อ/บริการ"
                    dense
                    type="text"
                    required
                  ></v-text-field> -->
                </v-col>
                <v-col class="pb-0" cols="12" sm="3">
                  <v-text-field
                    v-model="item.cost"
                    label="ราคา"
                    dense
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col
                  class="pb-0"
                  cols="12"
                  sm="1"
                  v-if="treatments.length > 1"
                >
                  <v-btn icon small @click="treatments.splice(i, 1)">
                    <v-icon small color="red">mdi-minus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
              <v-btn small @click="addTreatmentClick" color="primary">
                <v-icon color="white" small>mdi-plus</v-icon>
                เพิ่มรายการ
              </v-btn>
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
        treatment_title: "ค่ารักษา",
        treatment_cost: 100
      },
      rules: {
        payment: []
      },
      treatments: [],
      list_title_treatments: [
        "ค่าบริการทางการแพทย์",
        "ค่าฉีดยา",
        "ค่าทำหัตถการ",
        "ค่าอัลตร้าซาวด์",
        "ค่าตรวจตั้งครรภ์",
        "ค่าตรวจหมู่เลือด",
        "ค่าตรวจเบาหวาน",
        "ค่รตรวจคลื่นหัวใจ",
        "ค่าตรวจภายใน",
        "ค่าพ่นยา",
        "ค่าเอกซเรย์"
      ]
    };
  },
  computed: {
    me() {
      // this.$store.dispatch("me/me");
      return this.$store.getters["me/getUser"];
    },
    queues() {
      // this.$store.dispatch("queues/fetch");
      return this.$store.getters["queues/getList"];
    },
    list_medical_supplies() {
      // this.$store.dispatch("medicalSupplies/fetch");
      return this.$store.getters["medicalSupplies/getList"];
    }
  },
  mounted() {
    // this.$store.dispatch('loading/setLoading', true)
    this.fetch();

    this.getQueue();
    this.suppliesNoti();
  },
  methods: {
    async fetch() {
      // console.log(this.list_medical_supplies);\
      let me = this.me;
      this.name = `${me.title} ${me.first} ${me.last}`;

      if (me.role == "nurse" || me.role == "assistant") {
        this.role = false;
      } else {
        this.role = true;
      }

      let data_q = this.queues;
      await data_q.forEach(async e => {
        if (e.approve == "wait") {
          await this.queue.push(e);
        }
        if (e.approve == "await_drug") {
          await this.wait.push(e);
        }
      });

      // const response2 = await MedicalSuppliesAPI.getAllMedicalSupplies();
      let supplies = this.list_medical_supplies;
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
            let msg = "";
            if (ex < 0) msg = `หมดอายุแล้ว ${Math.abs(ex + 1)} วัน`;
            else
              msg = `จะหมดอายุในอีก ${ex +
                1} วัน คือ ${momentFormat.format_local(e.expire)}`;
            n.push({
              id: e._id,
              name: e.medical_name,
              msg: msg
            });
          } else {
            let msg = "";
            if (ex < 0)
              msg = `หมดอายุแล้ว ${Math.abs(
                ex + 1
              )} วัน และจะหมดอายุในอีก ${ex} วัน คือ ${momentFormat.format_local(
                e.expire
              )}`;
            else
              msg = `จะหมดอายุในอีก ${ex +
                1} วัน คือ ${momentFormat.format_local(
                e.expire
              )} และจะหมดอายุในอีก ${ex} วัน คือ ${momentFormat.format_local(
                e.expire
              )}`;

            n.push({
              id: e._id,
              name: e.medical_name,
              msg: msg
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
        let w = [];
        await this.$store.dispatch("queues/fetch");
        let data_q = this.queues;
        data_q.forEach(e => {
          if (e.approve == "wait") {
            q.push(e);
          }
          if (e.approve == "await_drug") {
            w.push(e);
          }
        });
        this.queue = q;
        this.wait = w;
      }, 60000 * 5);
    },
    async suppliesNoti() {
      setInterval(async () => {
        // const response = await MedicalSuppliesAPI.getAllMedicalSupplies();
        await this.$store.dispatch("medicalSupplies/fetch");

        let supplies = this.list_medical_supplies;
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
              let msg = "";
              if (ex < 0) msg = `หมดอายุแล้ว ${Math.abs(ex + 1)} วัน`;
              else
                msg = `จะหมดอายุในอีก ${ex +
                  1} วัน คือ ${momentFormat.format_local(e.expire)}`;
              n.push({
                id: e._id,
                name: e.medical_name,
                msg: msg
              });
            } else {
              let msg = "";
              if (ex < 0)
                msg = `หมดอายุแล้ว ${Math.abs(
                  ex + 1
                )} วัน และจะหมดอายุในอีก ${ex} วัน คือ ${momentFormat.format_local(
                  e.expire
                )}`;
              else
                msg = `จะหมดอายุในอีก ${ex +
                  1} วัน คือ ${momentFormat.format_local(
                  e.expire
                )} และจะหมดอายุในอีก ${ex} วัน คือ ${momentFormat.format_local(
                  e.expire
                )}`;

              n.push({
                id: e._id,
                name: e.medical_name,
                msg: msg
              });
            }
          }
        });
        this.noti = n;
      }, 600000);
    },

    async view(id) {
      this.q_id = id;
      this.loading = true;
      this.drug_list = [];
      this.drug_price = 0;

      let res_queue = {};

      await this.$api.getQueue(id).then(response => {
        res_queue = response.data.data;
      });

      await this.$api.getSymptom(res_queue.symptom).then(response => {
        this.symptom_id = response.data.data.id;

        if (response.data.data.certificate == true) {
          this.cert = true;
        }
        if (response.data.data.appointment == true) {
          this.appo = true;
        }

        response.data.data.drugPush.forEach(e => {
          if (e.status != true) {
            console.log(e._id);
            this.drug_price += e.price;
            this.drug_list.push(e);
          } else {
            this.drug_list = [];
          }
        });

        this.loading = false;
        let treatments_new = [
          {
            title: "ค่าบริการทางการแพทย์",
            cost: 100
          }
        ];

        this.treatments = treatments_new;

        this.dialog_drug = true;
      });
    },
    async save() {
      // this.loading = true;
      let err = "";
      let total = 0;
      this.treatments.forEach(e => {
        total += parseFloat(e.cost);
        if (!e.title) {
          this.$toast.open({
            message: "กรุณากรอกข้อมูลให้ครบ",
            type: "error",
            duration: 6000
          });
          err = "true";
        }
      });
      if (err) {
        this.loading = false;
        return;
      }
      let form = {
        approve: "success"
      };

      this.drug_list.forEach(async e => {
        await this.$api.paidDrug(e._id);
      });

      this.payment = {
        symptom: {
          _id: this.symptom_id
        },
        total_price: total + this.drug_price,
        treatment: this.treatments
      };

      // console.log(this.payment)

      await this.$api.updateQueue(this.q_id, form);

      await this.$api
        .createPayment(this.payment)
        .then(response => {
          this.loading = false;
          this.dialog_drug = false;
          this.$router.push({ path: `/payment/${response.data.data._id}` });
        })
        .catch(error => {
          self.$toast.open({
            message: error.response.data.errMessage,
            type: "error",
            duration: 6000
          });
        });
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
    },
    addTreatmentClick() {
      this.treatments.push({
        title: "",
        cost: 0
      });
    }
  }
};
</script>
