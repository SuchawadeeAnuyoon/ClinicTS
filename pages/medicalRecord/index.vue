<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>ข้อมูลเวชระเบียน</v-toolbar-title>
          <v-flex class="mt-4 ml-10" md3>
            <v-text-field
              label="ค้นหาด้วยหมายเลขบัตรประชาชน"
              v-model="search"
              dense
              clearable
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2" @click.stop="dialog_add = true"
            >เพิ่มข้อมูลเวชระเบียน</v-btn
          >
        </v-toolbar>

        <template>
          <v-data-table
            :headers="headers"
            :items="listFilter"
            :items-per-page="10"
            disable-sort
          >
            <template v-slot:[`item.citizen_id`]="{ item }">
              <nuxt-link :to="`/medicalrecord/${item.id}`">{{
                item.citizen_id
              }}</nuxt-link>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </v-container>

    <v-dialog
      v-model="dialog_add"
      scrollable
      persistent
      :overlay="false"
      max-width="60%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <div>เพิ่มข้อมูลเวชระเบียน</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="2">
                <v-select
                  :items="['นาย', 'นาง', 'นางสาว', 'ดช.', 'ดญ.']"
                  label="คำนำหน้าชื่อ"
                  required
                  v-model="form_data.title"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  label="ชื่อ"
                  required
                  v-model="form_data.first"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  label="นามสกุล"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="เลขประจำตัวประชาชน"
                  required
                  v-model="form_data.citizen_id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <v-select
                  :items="['ชาย', 'หญิง']"
                  label="เพศ"
                  required
                  v-model="form_data.sex"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="form_data.birth"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form_data.birth"
                      label="วัน/เดือน/ปีเกิด"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form_data.birth"
                    no-title
                    scrollable
                    locale="th"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu = false">
                      ยกเลิก
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu.save(form_data.birth)"
                    >
                      ตกลง
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="สัญชาติ"
                  required
                  v-model="form_data.nationality"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="ที่อยู่"
                  required
                  v-model="form_data.address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="1">
                <v-text-field
                  label="หมู่"
                  required
                  v-model="form_data.moo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="ถนน"
                  required
                  v-model="form_data.road"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="ตำบล"
                  required
                  v-model="form_data.tambon"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="อำเภอ"
                  required
                  v-model="form_data.distric"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="จังหวัด"
                  required
                  v-model="form_data.province"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="เบอร์โทรติดต่อ"
                  required
                  v-model="form_data.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4">
                <v-select
                  :items="['A', 'B', 'AB', 'O', 'ไม่ทราบหมู่เลือด']"
                  label="หมู่เลือด"
                  required
                  v-model="form_data.blood"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="โรคประจำตัว"
                  required
                  v-model="form_data.disease"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="ประวัติแพ้ยา"
                  required
                  v-model="form_data.drug_allergy"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_add = false">
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
import moment from "../../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      headers: [
        { text: "ลำดับที่", value: "no" },
        { text: "เลขบัตรประจำตัวประชาชน", value: "citizen_id" },
        { text: "ชื่อ", value: "first" },
        { text: "สกุล", value: "last" }
      ],
      data_list: [],
      dialog_add: false,
      menu: false,
      form_data: {},
      search:''
    };
  },
  computed: {
    listFilter () {
      let text = this.search.trim()
      return this.data_list.filter(item => {
        return item.citizen_id.indexOf(text) > -1
      })
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.data_list = [];

      await MedicalRecordAPI.getAllMedicalRecord().then(response => {
        let i = 0;
        let res = response.data.data;

        res.forEach(e => {
          this.data_list.push({
            no: ++i,
            id: e._id,
            citizen_id: e.citizen_id,
            first: e.first,
            last: e.last
          });
        });
      });
    },
    async add() {
      this.form_data.birth = await moment.format(this.form_data.birth);
      const response = await MedicalRecordAPI.newMedicalRecord(this.form_data);
      if (response.data.success == false) {
        alert(response.data.errMessage);
      } else {
        this.fetch();
        this.dialog_add = false;
      }
    },
  }
};
</script>
