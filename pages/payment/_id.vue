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

            <!-- <v-col cols="12" sm="6" md="2" class="pa-0">
              <p>อายุ : {{ medical_record_data.age }}</p>
            </v-col> -->

            <!-- <v-col cols="12" sm="6" md="2" class="pa-0">
              <p>เพศ : {{ medical_record_data.sex }}</p>
            </v-col> -->
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
      <v-divider width="60%" class="mx-auto"></v-divider>

      <v-card flat width="60%" class="mx-auto" v-if="!loading">
        <v-card-title>ข้อมูลรายการเวชภัณฑ์
          <span class="mx-5 payment-status red--text" v-if="payment_data.status == false">ยังไม่ได้ชำระเงิน</span>
          <span class="mx-5 payment-status green--text" v-if="payment_data.status == true">ชำระเงินแล้ว</span>
        </v-card-title>
          <v-simple-table>
            <tbody>
              <tr style="background-color: #99999999;">
                <th style="font-weight: bold;">ชื่อยา</th>
                <th style="font-weight: bold;">จำนวน</th>
                <th style="font-weight: bold;">ราคาต่อหน่วย</th>
                <th style="font-weight: bold;">ราคา</th>
              </tr>
              <tr v-for="item in drug_data" :key="item.id">
                <td>{{item.name_drug}}</td>
                <td>{{item.amount}}</td>
                <td>{{item.price_for_unit}}</td>
                <td>{{item.price}}</td>
              </tr>
              <tr style="background-color: #99999999;">
                <td colspan="4" style="font-weight: bold;">รายการใช้จ่าย</td>
              </tr>
              <tr v-for="(list, i) in payment_data.treatment" :key="i">
                <td colspan="3" class="text-left">{{list.title}}</td>
                <td>{{list.cost}}</td>
              </tr>
              <!-- <tr>
                <td colspan="3" class="text-center">{{payment_data.treatment_title}}</td>
                <td>{{payment_data.treatment_cost}}</td>
              </tr> -->
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
          <v-btn v-if="!payment_data.status" color="green darken-2" text outlined @click="pay">เสร็จสิ้น</v-btn>
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

      await this.$api.getPayment(this.id)
        .then(response => {
          this.payment_data = response.data.data;
          console.log(this.payment_data)
        })

      // const res_symptom = await SymptomAPI.getSymptom(
      //   this.payment_data.symptom
      // );

      await this.$api.getSymptom(this.payment_data.symptom)
        .then(response => {
          this.symptom_data = response.data.data;
        })
      this.medical_record_data = await this.symptom_data.medicalRecord_id;
      this.drug_data = await this.symptom_data.drugPush;

      this.drug_price = 0

      await this.drug_data.forEach(async e => {
        this.drug_price += e.price
      })

      this.loading = await false;

      // console.log(this.payment_data);
    },
    back() {
      this.$router.push({ path: '/home'})
    },
    async pay() {

      await this.$api.updatePayment(this.id)
        .then(response => {
          this.$toast.open({
            message: "การชำระเงินเสร็จสิ้น",
            type: "success",
            duration: 6000
          });
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: "error",
            duration: 6000
          });
        })

      await this.fetch()
    }
  }
};
</script>
