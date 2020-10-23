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
        <v-toolbar>
          <v-btn icon @click="back">
            <v-icon>mdi-chevron-left </v-icon>
          </v-btn>
          <v-toolbar-title>ข้อมูลเวรระเบียน</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn small color="blue lighten-2" @click="dialog_symotom = true"
            >เพิ่มคิว</v-btn
          >
        </v-toolbar>

        <div>
          <template>
            <v-container>
              <v-col>
                <div>ข้อมูลคนไข้</div>
                <v-divider class="my-3"></v-divider>
                <v-row>
                  <v-col cols="12" sm="2" md="2">
                    <v-text-field
                      label="คำนำหน้า"
                      v-model="medical_record_data.title"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="5" md="5">
                    <v-text-field
                      label="ชื่อ"
                      v-model="medical_record_data.first"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="5" md="5">
                    <v-text-field
                      label="นามสกุล"
                      v-model="medical_record_data.last"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      label="หมายเลขบัตรประชาชน"
                      v-model="medical_record_data.citizen_id"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="3">
                    <v-text-field
                      label="วัน เดือน ปีเกิด"
                      v-model="birth"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-text-field
                      label="เพศ"
                      v-model="medical_record_data.sex"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-text-field
                      label="สัญชาติ"
                      v-model="medical_record_data.nationality"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-text-field
                      label="กรุ๊ปเลือด"
                      v-model="medical_record_data.blood"
                      readonly
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div>ข้อมูลติดต่อ</div>
                <v-divider class="my-3"></v-divider>

                <div>{{ contact }}</div>
                <div>{{ phone }}</div>

                <div class="mt-7">
                  ข้อมูลโรคประจำตัว ประวัติการแพ้ยา และประวัติการรักษา
                </div>
                <v-divider class="my-3"></v-divider>

                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="โรคประจำตัว"
                      readonly
                      flat
                      v-model="medical_record_data.disease"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="ประวัติการแพ้ยา"
                      readonly
                      flat
                      v-model="medical_record_data.drug_allergy"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <div>ประวัติการรักษา</div>
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>อาการเบื้องต้น</th>
                          <th>วัน เวลาบันทึก</th>
                          <th>บันทึกโดย</th>
                          <th>อาการที่วินิจฉัย</th>
                          <th>วัน เวลาที่วินิจฉัย</th>
                          <th>วินิจฉัยโดย</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="list in symptom" :key="list.id">
                          <td>{{ list.initial }}</td>
                          <td>{{ list.create_at }}</td>
                          <td>{{ list.name_create }}</td>
                          <td>{{ list.predicate }}</td>
                          <td>{{ list.name_predicate }}</td>
                          <td>{{ list.predicate_at }}</td>
                        </tr>
                      </tbody>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </template>
        </div>
      </v-card>
    </v-container>

    <!-- Dialog -->
    <v-dialog
      v-model="dialog_symotom"
      persistent
      :overlay="false"
      max-width="50%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <div>เพิ่มคิว</div>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12" md="12">
                <v-text-field
                  label="อาการเบื้องต้น"
                  v-model="initial"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog_symotom = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="add">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import * as MedicalRecordAPI from "../../utils/medicalRecordAPI";
import * as SympyomAPI from "../../utils/symptomAPI";
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
      medical_record_data: {},
      birth: "",
      contact: "",
      phone: "",
      symptom: [],
      initial: "",

      loading: true,
      dialog_symotom: false
    };
  },
  mounted() {
    this.fecth();
  },
  methods: {
    async fecth() {
      const response = await MedicalRecordAPI.getOneMedicalRecord(this.id);
      this.medical_record_data = await response.data.data;
      this.birth = await moment.format_local(this.medical_record_data.birth);
      this.contact = await `${this.medical_record_data.address} หมู่ที่ ${this.medical_record_data.moo} ซอย ${this.medical_record_data.soi} ถนน ${this.medical_record_data.road} ตำบล ${this.medical_record_data.tambon} อำเภอ ${this.medical_record_data.distric} จังหวัด ${this.medical_record_data.province}`;
      this.phone = await `เบอร์ติดต่อ ${this.medical_record_data.phone}`;

      // Symptom
      this.symptom = [];
      await this.medical_record_data.SymptomPush.forEach(e => {
        if (!e.predicate) {
          this.symptom.push({
            initial: e.initial,
            create_at: moment.format_local_time(e.create_at),
            name_create: e.name_create
          });
        } else {
          this.symptom.push({
            initial: e.initial,
            create_at: moment.format_local_time(e.create_at),
            name_create: e.name_create,
            predicate: e.predicate,
            name_predicate: e.name_predicate,
            predicate_at: moment.format_local_time(e.predicate_at)
          });
        }
      });
      this.loading = await false;
    },
    back() {
      this.$router.push({ path: "/medicalrecord" });
    },
    async add() {
      let data = {
        medicalRecord_id: {
          _id: this.id
        },
        initial: this.initial
      };

      const response = await SympyomAPI.createSymptom(data);
    }
  }
};
</script>
