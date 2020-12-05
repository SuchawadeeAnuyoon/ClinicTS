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
          <v-toolbar-title
            >ข้อมูลเวชระเบียน: {{ medical_record_data.first }}
            {{ medical_record_data.last }}
          </v-toolbar-title>

          <v-spacer></v-spacer>
        </v-toolbar>

        <div>
          <template>
            <v-container>
              <v-col>
                <v-row>
                  <div class="mr-5">ข้อมูลเวชระเบียน</div>
                </v-row>
                <v-divider class="my-3"></v-divider>
                <v-row>
                  <v-col cols="12" sm="2" md="2">
                    <v-text-field
                      label="คำนำหน้า"
                      v-model="medical_record_data.title"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="5" md="5">
                    <v-text-field
                      label="ชื่อ"
                      v-model="medical_record_data.first"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="5" md="5">
                    <v-text-field
                      label="นามสกุล"
                      v-model="medical_record_data.last"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="5">
                    <v-text-field
                      label="เลขประจำตัวประชาชน"
                      v-model="medical_record_data.citizen_id"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="3">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="birth"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      :disabled="readonly"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="setMoment"
                          label="วัน/เดือน/ปีเกิด"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          dense
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="birth"
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
                          @click="$refs.menu.save(birth)"
                        >
                          ตกลง
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-text-field
                      label="เพศ"
                      v-model="medical_record_data.sex"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-text-field
                      label="สัญชาติ"
                      v-model="medical_record_data.nationality"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <div>ข้อมูลติดต่อ</div>
                <v-divider class="my-3"></v-divider>

                <div v-if="!readonly">
                  <v-row>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        label="ที่อยู่"
                        v-model="medical_record_data.address"
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="2">
                      <v-text-field
                        label="หมู่"
                        v-model="medical_record_data.moo"
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                      <v-text-field
                        label="ถนน"
                        v-model="medical_record_data.road"
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                      <v-text-field
                        label="ซอย"
                        v-model="medical_record_data.soi"
                        dense
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        :items="province"
                        :filter="customFilterP"
                        item-text="PROVINCE_NAME"
                        item-value="PROVINCE_NAME"
                        v-model="medical_record_data.province"
                        label="จังหวัด"
                      >
                        <template v-slot:item="data">
                          <template>
                            <v-list-item-content
                              @click="setDistrict(data.item.PROVINCE_CODE)"
                              >{{
                                data.item.PROVINCE_NAME
                              }}</v-list-item-content
                            >
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        :items="district"
                        :filter="customFilterD"
                        item-text="DISTRICT_NAME"
                        item-value="DISTRICT_NAME"
                        v-model="medical_record_data.distric"
                        label="อำเภอ"
                      >
                        <template v-slot:item="data">
                          <template>
                            <v-list-item-content
                              @click="setSubDistrict(data.item.DISTRICT_CODE)"
                              >{{
                                data.item.DISTRICT_NAME
                              }}</v-list-item-content
                            >
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-autocomplete
                        :items="tambon"
                        :filter="customFilterS"
                        item-text="SUB_DISTRICT_NAME"
                        item-value="SUB_DISTRICT_NAME"
                        v-model="medical_record_data.tambon"
                        label="ตำบล"
                      >
                        <template v-slot:item="data">
                          <template>
                            <v-list-item-content
                              @click="setZip(data.item.SUB_DISTRICT_CODE)"
                              >{{
                                data.item.SUB_DISTRICT_NAME
                              }}</v-list-item-content
                            >
                          </template>
                        </template>
                      </v-autocomplete>
                    </v-col>

                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        label="รหัสไปรษณีย์"
                        required
                        v-model="medical_record_data.zip"
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="3">
                      <v-text-field
                        label="เบอร์โทรศัพท์"
                        v-model="medical_record_data.phone"
                        dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </div>

                <div v-if="readonly">
                  <div>{{ contact }}</div>
                  <div>{{ phone }}</div>
                </div>

                <div class="mt-7">
                  ข้อมูลโรคประจำตัว ประวัติการแพ้ยา และประวัติการรักษา
                </div>
                <v-divider class="my-3"></v-divider>

                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="โรคประจำตัว"
                      :readonly="readonly"
                      flat
                      v-model="medical_record_data.disease"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <v-text-field
                      label="ประวัติการแพ้ยา"
                      :readonly="readonly"
                      flat
                      v-model="medical_record_data.drug_allergy"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="12" class="text-center">
                    <v-btn
                      v-if="readonly"
                      small
                      color="blue lighten-2"
                      @click="edit('edit')"
                      >แก้ไข</v-btn
                    >
                    <v-btn
                      v-if="!readonly"
                      small
                      color="green lighten-2"
                      @click="edit('save')"
                      >บันทึก</v-btn
                    >

                    <v-btn
                      v-if="!readonly"
                      small
                      color="grey"
                      @click="edit('cancel')"
                      >ยกเลิก</v-btn
                    >
                    <v-btn
                      small
                      class="mx-1"
                      color="blue lighten-2"
                      @click="dialog_symotom = true"
                      >เพิ่มคิว</v-btn
                    >
                  </v-col>

                  <v-col cols="12" sm="12" md="12">
                    <div>ประวัติการรักษา</div>
                    <v-simple-table>
                      <thead>
                        <tr>
                          <th>วัน เวลาบันทึก</th>
                          <th>อาการเบื้องต้น</th>
                          <th>อาการที่วินิจฉัย</th>
                          <th>วัน เวลาที่วินิจฉัย</th>
                          <th>ยาที่ได้รับ</th>
                          <th>บันทึกโดย</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="list in symptom" :key="list.id">
                          <td>{{ list.create_at }}</td>
                          <td>{{ list.initial }}</td>
                          <td>{{ list.predicate }}</td>
                          <td>{{ list.predicate_at }}</td>
                          <td>{{ list.name_predicate }}</td>
                          <td>{{ list.name_create }}</td>
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

    <v-dialog v-model="dialog_load" width="200">
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

    <v-snackbar
      :timeout="5000"
      v-model="snackbar.bool"
      :color="snackbar.color"
      absolute
      right
      rounded="pill"
      top
    >
      {{ snackbar.msg }}
    </v-snackbar>
  </div>
</template>

<script>
import * as MedicalRecordAPI from "../../utils/medicalRecordAPI";
import * as SympyomAPI from "../../utils/symptomAPI";
import moment from "../../utils/moment";
import Province from "../../utils/province.json";
import District from "../../utils/district.json";
import Tambon from "../../utils/tambon.json";
import Zip from "../../utils/zip.json";
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
      readonly: true,
      btn_edit: {
        text: "แก้ไข",
        color: "blue lighten-2"
      },

      loading: true,
      dialog_symotom: false,
      dialog_load: false,
      snackbar: {},
      province: Province,
      district: [],
      tambon: [],
      test: "test",
      menu: false
    };
  },
  computed: {
    setMoment() {
      return this.birth ? moment.format_local_PS(this.birth) : "";
    }
  },
  mounted() {
    this.fecth();
  },
  methods: {
    async fecth() {
      const response = await MedicalRecordAPI.getOneMedicalRecord(this.id);
      this.medical_record_data = await response.data.data;
      this.birth = await this.medical_record_data.birth;
      this.contact = await `${this.medical_record_data.address} หมู่ที่ ${this.medical_record_data.moo} ถนน ${this.medical_record_data.road} ซอย ${this.medical_record_data.soi} ตำบล ${this.medical_record_data.tambon} อำเภอ ${this.medical_record_data.distric} จังหวัด ${this.medical_record_data.province} รหัสไปรษณีย์ ${this.medical_record_data.zip}`;
      this.phone = await `เบอร์ติดต่อ ${this.medical_record_data.phone}`;

      // Symptom
      this.symptom = [];
      await this.medical_record_data.SymptomPush.forEach(e => {
        // if (!e.predicate) {
        //   this.symptom.push({
        //     initial: e.initial,
        //     create_at: moment.format_local_time(e.create_at),
        //     name_create: e.name_create
        //   });
        // } else {
        // console.log(e)
        this.symptom.push({
          initial: e.initial,
          create_at: moment.format_local_time_PS(e.create_at),
          name_create: e.name_create,
          predicate: e.predicate,
          name_predicate: e.name_predicate,
          predicate_at: moment.format_local_time_PS(e.predicate_at)
        });
        // }
      });
      this.loading = await false;
    },
    back() {
      this.$router.push({ path: "/medicalrecord" });
    },
    async add() {
      this.dialog_load = await true;
      let data = {
        medicalRecord_id: {
          _id: this.id
        },
        initial: this.initial
      };

      const response = await SympyomAPI.createSymptom(data);

      await this.fecth();
      this.dialog_load = await false;
      this.dialog_symotom = await false;

      this.snackbar = await {
        bool: true,
        msg: "เพิ่มอาการเบื้องต้นและคิวเรียบร้อย",
        color: "green"
      };
    },
    async checkProvince() {
      await this.province.forEach(async e => {
        if (this.medical_record_data.province == e.PROVINCE_NAME) {
          await this.checkDistrict(e.PROVINCE_CODE);
        }
      });
    },
    async checkDistrict(province_code) {
      let districts = [];
      await District.forEach(async e => {
        let district_code = await `${e.DISTRICT_CODE[0]}${e.DISTRICT_CODE[1]}`;
        if (district_code == province_code) {
          districts.push(e);
          if (this.medical_record_data.distric == e.DISTRICT_NAME) {
            await this.checkSubDistrict(e.DISTRICT_CODE);
          }
        }
      });

      this.district = await districts;
    },
    async checkSubDistrict(district_code) {
      let tambons = [];
      await Tambon.forEach(async e => {
        let tambon_code = await `${e.SUB_DISTRICT_CODE[0]}${e.SUB_DISTRICT_CODE[1]}${e.SUB_DISTRICT_CODE[2]}${e.SUB_DISTRICT_CODE[3]}`;
        if (tambon_code == district_code) {
          await tambons.push(e);
        }
      });
      this.tambon = await tambons;
    },
    edit(bool) {
      if (bool == "edit") {
        this.readonly = false;
        this.checkProvince();
        this.btn_edit = {
          text: "บันทึก",
          color: "green lighten-2"
        };
      }
      if (bool == "cancel") {
        this.readonly = true;
        this.btn_edit = {
          text: "แก้ไข",
          color: "blue lighten-2"
        };
      }
      if (bool == "save") {
        this.dialog_load = true;
        this.update();
      }
    },
    async update() {
      this.medical_record_data.birth = await this.birth
      const response = await MedicalRecordAPI.updateMedicalRecord(
        this.medical_record_data,
        this.id
      );

      if (response.data.sucess == true) {
        this.readonly = await true;
        this.fecth();
        this.dialog_load = await false;
        this.snackbar = await {
          bool: true,
          msg: "แก้ไขข้อมูลเสร็จสิ้น",
          color: "green"
        };
      } else {
        alert(response.data.errMessage);
      }
    },
    customFilterP(item, queryText, itemText) {
      const textOne = item.PROVINCE_NAME.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    customFilterD(item, queryText, itemText) {
      const textOne = item.DISTRICT_NAME.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    customFilterS(item, queryText, itemText) {
      const textOne = item.SUB_DISTRICT_NAME.toLowerCase();
      const searchText = queryText.toLowerCase();

      return textOne.indexOf(searchText) > -1;
    },
    async setDistrict(province_code) {
      let districts = [];
      await District.forEach(async e => {
        let district_code = await `${e.DISTRICT_CODE[0]}${e.DISTRICT_CODE[1]}`;
        if (district_code == province_code) {
          districts.push(e);
        }
      });

      this.district = await districts;
    },
    async setSubDistrict(district_code) {
      let tambons = [];
      await Tambon.forEach(async e => {
        let tambon_code = await `${e.SUB_DISTRICT_CODE[0]}${e.SUB_DISTRICT_CODE[1]}${e.SUB_DISTRICT_CODE[2]}${e.SUB_DISTRICT_CODE[3]}`;
        if (tambon_code == district_code) {
          await tambons.push(e);
        }
      });
      this.tambon = await tambons;
    },
    async setZip(tambon_code) {
      await Zip.forEach(async e => {
        if (tambon_code == e.SUB_DISTRICT_CODE) {
          this.medical_record_data.zip = await e.ZIPCODE;
        }
      });
    }
  }
};
</script>
