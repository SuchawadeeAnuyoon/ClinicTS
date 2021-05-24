<template>
  <div>
    <v-container fluid>
      <div v-if="loading" class="mx-auto text-center ma-16 pb-12">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <v-card v-if="!loading">
        <v-card-title>บันทึกอาการ </v-card-title>

        <v-card-text>
          <div class="mx-3">
            <div>ข้อมูลคนไข้</div>
            <v-divider class="my-2"></v-divider>
            <v-row>
              <v-col cols="12" sm="2">
                <v-text-field
                  label="คำนำหน้าชื่อ"
                  readonly
                  dense
                  v-model="medical_data.title"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5">
                <v-text-field
                  label="ชื่อ"
                  readonly
                  dense
                  v-model="medical_data.first"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="5">
                <v-text-field
                  label="นามสกุล"
                  readonly
                  dense
                  v-model="medical_data.last"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="3">
                <v-text-field
                  label="หมายเลขบัตรประชาชน"
                  readonly
                  dense
                  v-model="medical_data.citizen_id"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2">
                <v-text-field
                  label="เพศ"
                  readonly
                  dense
                  v-model="medical_data.sex"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="1">
                <v-text-field
                  label="อายุ"
                  readonly
                  dense
                  v-model="medical_data.age"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2">
                <v-text-field
                  label="วัน เดือน ปีเกิด"
                  readonly
                  dense
                  v-model="medical_data.birth"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2">
                <v-text-field
                  label="กรุ๊ปเลือด"
                  readonly
                  dense
                  v-model="medical_data.blood"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2">
                <v-text-field
                  label="สัญชาติ"
                  readonly
                  dense
                  v-model="medical_data.nationality"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2">
                <v-checkbox
                  label="ใบรับรองแพทย์"
                  dense
                  v-model="symptom_data.certificate"
                ></v-checkbox>
              </v-col>

              <v-col cols="12" sm="2">
                <v-checkbox
                  label="ใบนัด"
                  dense
                  v-model="symptom_data.appointment"
                ></v-checkbox>
              </v-col>
            </v-row>

            <div>ข้อมูลอาการ</div>
            <v-divider class="my-2"></v-divider>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="อาการเบื้องต้น"
                  readonly
                  hide-details
                  dense
                  v-model="symptom_data.initial"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-text-field
                  label="ผลการวินิจฉัย"
                  dense
                  hide-details
                  v-model="symptom_data.predicate"
                ></v-text-field>
              </v-col>
            </v-row>
          </div>
        </v-card-text>
      </v-card>

      <v-card class="mt-3" v-if="!loading">
        <v-container fluid v-if="!dis_btn">
          <v-row>
            <v-col cols="12" sm="1">
              <div class="mt-3">ยา</div>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="ค้นหา"
                v-model="search"
                dense
                hide-details
                clearable
              ></v-text-field>
            </v-col>
          </v-row>
          <v-divider class="mb-2"></v-divider>
          <v-row>
            <v-col cols="12" sm="6">
              <template>
                <v-data-table
                  :headers="supply_header"
                  :items="listFilter"
                  :items-per-page="5"
                  dense
                  sort-by="medical_name"
                >
                  <template v-slot:[`item.drug_amount`]="{ item }">
                    <v-col cols="12" sm="12">
                      <v-text-field
                        dense
                        outlined
                        hide-details
                        v-model="item.drug_amount"
                        :rules="[rules]"
                      ></v-text-field>
                    </v-col>
                  </template>
                  <template v-slot:[`item.add`]="{ item }">
                    <v-btn
                      small
                      color="blue"
                      :disabled="item.status == true"
                      @click="
                        add_drug(
                          item._id,
                          item.medical_name,
                          item.drug_amount,
                          item.price_for_unit
                        )
                      "
                      >เพิ่ม</v-btn
                    >
                  </template>
                </v-data-table>
              </template>
            </v-col>

            <v-divider vertical></v-divider>

            <v-col cols="12" sm="5">
              <template>
                <v-data-table
                  :headers="drug_header"
                  :items="drug_data"
                  :items-per-page="5"
                  hide-default-footer
                  disable-sort
                  dense
                >
                  <template v-slot:[`item.delete`]="{ item }">
                    <v-btn color="red" small icon @click="drugDelete(item._id)">
                      <v-icon>mdi-close</v-icon>
                    </v-btn>
                  </template>
                </v-data-table>
              </template>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn
            class="mx-auto"
            color="green"
            @click="save()"
            :disabled="dis_btn"
            >บันทึก</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog_loading" width="200">
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
import * as QueueAPI from "../../utils/queueAPI";
import * as SymptomAPI from "../../utils/symptomAPI";
import * as MedicalSupplies from "../../utils/medicalSuppliesAPI";
import * as DrugListAPI from "../../utils/drugListAPI";
import moment from "../../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  asyncData({ params }) {
    return {
      id: params.id
    };
  },
  data() {
    return {
      q_data: {},
      symptom_data: {},
      medical_data: {},
      loading: false,
      supplies_data: [],
      supply_header: [
        { text: "ชื่อยาสามัญ", value: "medical_name" },
        { text: "คงเหลือ", value: "total" },
        { text: "รุ่น", value: "number" },
        { text: "หน่วย", value: "unit" },
        { text: "ราคาต่อหน่วย", value: "price_for_unit" },
        { text: "จำนวน", value: "drug_amount", width: "100", align: "center" },
        { text: "", value: "add" }
      ],

      drug_header: [
        { text: "ชื่อยาสามัญ", value: "name_drug" },
        { text: "จำนวน", value: "amount" },
        { text: "", value: "delete" }
      ],
      drug_data: [],
      rules: v => {
        if (parseInt(v)) return true;
        return "กรุณากรอกตัวเลข";
      },
      search: "",
      dis_btn: null,
      dialog_loading: false,
      symptom_id: ""
    };
  },
  computed: {
    listFilter() {
      let text = this.search.trim();
      return this.supplies_data.filter(item => {
        return item.medical_name.indexOf(text) > -1;
      });
    },
    list_medical_supplies() {
      return this.$store.getters["medicalSupplies/getList"];
    }
  },
  mounted() {
    this.loading = true;
    this.fetch();
  },
  methods: {
    async fetch() {
      await this.$api.getQueue(this.id).then(response => {
        this.symptom_id = response.data.data.symptom;

        if (response.data.data.approve == "success") {
          this.dis_btn = true;
        } else {
          this.dis_btn = false;
        }
      });

      await this.$api.getSymptom(this.symptom_id).then(response => {
        this.medical_data = response.data.data.medicalRecord_id;
        this.symptom_data = response.data.data
      });

      await this.$store.dispatch("medicalSupplies/fetch");

      // this.medical_data.birth = moment.format_local_PS(this.medical_data.birth);

      this.fetchDrug();
    },
    async fetchDrug() {
      this.supplies_data =[]
      await this.$api.getSymptom(this.symptom_id).then(response => {
        this.drug_data = response.data.data.drugPush;
      });

      await this.list_medical_supplies.forEach(e => {
        this.supplies_data.push({
          ...e,
          drug_amount: null
        })
      })

      // console.log(this.supplies_data)

      // const res_supplies = this.list_medical_supplies
      this.loading = false;

    },
    async add_drug(sid, name, amount, price_for_unit) {
      let form_data = {
        supply_id: sid,
        name_drug: name,
        amount: amount,
        symptom_id: {
          _id: this.symptom_id
        },
        price_for_unit: price_for_unit
      };

      await this.$api.createDrugList(form_data)
        .then(response => {
          // this.$toast.open({
          //   message: "แก้ไขข้อมูลสำเร็จ",
          //   type: "success",
          //   duration: 6000
          // });
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: "error",
            duration: 6000
          });
        });

      await this.fetchDrug();
    },
    async drugDelete(id) {
      // const response = await DrugListAPI.deleteDrugList(id);
      await this.$api.deleteDrugList(id).then(response => {
        this.fetchDrug();
      });
    },
    async save() {
      this.dialog_loading = await true;
      let form = await {
        approve: "await_drug",
        predicate: this.symptom_data.predicate,
        certificate: this.symptom_data.certificate,
        appointment: this.symptom_data.appointment
      };

      await this.$api.updateQueue(this.id, form);
      // await QueueAPI.updateQueue(this.id, form);
      await this.$api
        .updateSymptom(this.symptom_id, form)
        .then(response => {
          this.$toast.open({
            message: "บันทึกข้อมูลสำเร็จ",
            type: "success",
            duration: 6000
          });
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: "success",
            duration: 6000
          });
        });
      // await SymptomAPI.updateSymptom(this.symptom_data.id, this.symptom_data);

      this.fetch();
      this.dialog_loading = false;
    }
  }
};
</script>
