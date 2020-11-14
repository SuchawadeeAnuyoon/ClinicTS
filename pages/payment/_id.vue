<template>
  <div>
    <v-container fluid class="ma-10">
      <h2 class="text-center">รายการชำระเงิน</h2>
      <v-divider width="60%" class="mx-auto mt-5"></v-divider>

      <v-card flat width="60%" class="mx-auto" v-if="!loading">
        <v-card-title>ข้อมูลคนไข้</v-card-title>
        <v-card-text class="payment mx-10">
          <v-row>
            <v-col cols="12" sm="6" class="pa-0">
              <p>ชื่อ : {{ medical_record_data.first }}</p>
            </v-col>

            <v-col cols="12" sm="6" class="pa-0">
              <p>นามสกุล : {{ medical_record_data.last }}</p>
            </v-col>

            <v-col cols="12" sm="6" md="2" class="pa-0">
              <p>อายุ : {{ medical_record_data.age }}</p>
            </v-col>

            <v-col cols="12" sm="6" md="2" class="pa-0">
              <p>เพศ : {{ medical_record_data.sex }}</p>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="12" class="pa-0">
              <p>โรคประจำตัว : {{ medical_record_data.disease }}</p>
            </v-col>

            <v-col cols="12" sm="12" class="pa-0">
              <p>ประวัติการแพ้ยา : {{ medical_record_data.drug_allergy }}</p>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-divider width="60%" class="mx-auto mt-5"></v-divider>

      <v-card flat width="60%" class="mx-auto" v-if="!loading">
        <v-card-title>ข้อมูลรายการเวชภัณฑ์
          <span class="mx-5 payment-status red--text" v-if="payment_data.status == false">ยังไม่ได้ชำระเงิน</span>
          <span class="mx-5 payment-status green--text" v-if="payment_data.status == true">ชำระเงินแล้ว</span>
        </v-card-title>
          <v-simple-table>
            <thead>
              <tr>
                <th>ชื่อยา</th>
                <th>จำนวน</th>
                <th>ราคาต่อหน่วย</th>
                <th>ราคา</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in drug_data" :key="item.id">
                <td>{{item.name_drug}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.price_for_unit}}</td>
                <td>{{item.price}}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-center">{{payment_data.treatment_title}}</td>
                <td>{{payment_data.treatment_cost}}</td>
              </tr>
              <tr>
                <td colspan="3" class="text-center">รวม</td>
                <td>{{payment_data.total_price}}</td>
              </tr>
            </tbody>
          </v-simple-table>
        <v-card-text class="payment mx-10"> </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-2" text outlined @click="back">กลับ</v-btn>
          <v-btn color="green darken-2" text outlined @click="pay">เสร็จสิ้น</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
    <v-snackbar
      :timeout="5000"
      v-model="snackbar.bool"
      :color="snackbar.color"
      absolute
      right
      rounded="pill"
      top
    >
      {{snackbar.msg}}
    </v-snackbar>
  </div>
</template>

<script>
import * as PaymentAPI from "../../utils/paymentAPI";
import * as SymptomAPI from "../../utils/symptomAPI";
import moment from "../../utils/moment";
export default {
  middleware: "auth",
  asyncData({ params }) {
    return {
      id: params.id
    };
  },
  data() {
    return {
      medical_record_data: {},
      symptom_data: {},
      payment_data: {},
      drug_data: [],
      loading: true,
      drug_price: 0,
      snackbar: {}
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.loading = await true;
      const response = await PaymentAPI.getPayment(this.id);

      this.payment_data = await response.data.data;

      const res_symptom = await SymptomAPI.getSymptom(
        this.payment_data.symptom
      );

      this.symptom_data = await res_symptom.data.data;
      this.medical_record_data = await this.symptom_data.medicalRecord_id;
      this.drug_data = await this.symptom_data.drugPush;

      this.drug_price = 0

      await this.drug_data.forEach(async e => {
        this.drug_price += e.price
      })

      this.loading = await false;

      console.log(this.payment_data);
    },
    back() {
      this.$router.push({ path: '/home'})
    },
    async pay() {
      const response = await PaymentAPI.updatePay(this.id)

      if (response.data.success == true) {
        this.snackbar = await {
          bool: true,
          color: 'green',
          msg: 'การชำระเงินเสร็จสิ้น'
        }
      } else {
        this.snackbar = await {
          bool: true,
          color: 'red',
          msg: response.data.message
        }
      }

      await this.fetch()
    }
  }
};
</script>
