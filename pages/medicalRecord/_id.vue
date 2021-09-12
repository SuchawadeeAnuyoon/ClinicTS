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
                    <v-select
                      :items="['นาย', 'นาง', 'นางสาว', 'ดช.', 'ดญ.']"
                      label="คำนำหน้า*"
                      dense
                      :readonly="readonly"
                      v-model="medical_record_data.title"
                    ></v-select>
                    <!-- <v-text-field
                      label="คำนำหน้า"
                      v-model="medical_record_data.title"
                      :readonly="readonly"
                      dense
                    ></v-text-field> -->
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
                    <v-text-field
                      label="วัน/เดือน/ปีเกิด"
                      v-model="medical_record_data.birth"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                    <!-- <v-menu
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
                    </v-menu> -->
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-select
                      :items="['ชาย', 'หญิง']"
                      label="เพศ"
                      dense
                      v-model="medical_record_data.sex"
                      :readonly="readonly"
                    ></v-select>
                    <!-- <v-text-field
                      label="เพศ"
                      v-model="medical_record_data.sex"
                      :readonly="readonly"
                      dense
                    ></v-text-field> -->
                  </v-col>

                  <v-col cols="12" sm="3" md="2">
                    <v-text-field
                      label="สัญชาติ"
                      v-model="medical_record_data.nationality"
                      :readonly="readonly"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="3" md="3">
                    <v-select
                      color
                      v-model="medical_record_data.blood"
                      :items="['A', 'B', 'AB', 'O', '-']"
                      label="กรุ๊บเลือด"
                      :readonly="readonly"
                      dense
                    ></v-select>
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
                        label="อำเภอ/เขต"
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
                        label="ตำบล/แขวง"
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
                          <th>ผลการวินิจฉัย</th>
                          <th>วัน เวลาที่วินิจฉัย</th>
                          <th>บันทึกโดย</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="list in symptoms" :key="list.id">
                          <td>{{ list.create_at }}</td>
                          <td>{{ list.initial }}</td>
                          <td>{{ list.predicate }}</td>
                          <td>{{ list.predicate_at }}</td>
                          <td>{{ list.name_create }}</td>
                          <td class="d-flex flex-row align-center">
                            <div class="view mx-2" @click="viewClick(list)">
                              <v-icon small color="">mdi-eye</v-icon>
                            </div>
                            <div class="view" @click="editHistoryClick(list)">
                              <v-icon small color="">mdi-pencil</v-icon>
                            </div>
                          </td>
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

    <v-dialog
      v-model="dialog_history"
      persistent
      :overlay="false"
      max-width="70%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <div>ประวัติการรักษา ({{ symptom.create_at }})</div>
        </v-card-title>
        <v-card-text>
          <!-- {{symptom}} -->
          <div>
            <!-- <div>ชื่อ-สกุล: <span class="font-weight-bold py-2">{{medical_record_data.title}} {{medical_record_data.first}} {{medical_record_data.last}}</span></div>
            <div>อาการเบื้องต้น: <span class="font-weight-bold" style="margin-right: auto;">{{symptom.initial}}</span>บันทึกโดย: <span class="font-weight-bold py-2">{{symptom.create_by}}</span></div>
            <div>วินิจฉัยโดย: <span class="font-weight-bold py-2">{{symptom.name_predicate}}</span></div> -->
            <table style="width: 100%">
              <tbody>
                <tr>
                  <td style="width: 15%">ชื่อ-สกุล:</td>
                  <td colspan="3" class="font-weight-bold">
                    {{ medical_record_data.title }}
                    {{ medical_record_data.first }}
                    {{ medical_record_data.last }}
                  </td>
                </tr>
                <div style="padding: 3px 0;"></div>
                <tr>
                  <td style="width: 15%">อาการเบื้องต้น:</td>
                  <td class="font-weight-bold">{{ symptom.initial }}</td>
                </tr>
                <tr>
                  <td style="width: 15%">บันทึกโดย:</td>
                  <td class="font-weight-bold">{{ symptom.create_by }}</td>
                  <td style="width: 15%">เวลาลงบันทึก:</td>
                  <td colspan="3" class="font-weight-bold">
                    {{ symptom.create_at }}
                  </td>
                </tr>
                <div style="padding: 3px 0;"></div>
                <tr>
                  <td style="width: 15%">อาการวินิจฉัย:</td>
                  <td class="font-weight-bold">{{ symptom.predicate }}</td>
                </tr>
                <tr>
                  <td style="width: 15%">วินิจฉัยโดย:</td>
                  <td class="font-weight-bold">{{ symptom.name_predicate }}</td>
                  <td style="width: 15%">เวลาลงการวินิจฉัย:</td>
                  <td colspan="3" class="font-weight-bold">
                    {{ symptom.predicate_at }}
                  </td>
                </tr>
                <div style="padding: 3px 0;"></div>
              </tbody>
            </table>

            <div>รายการเวชภัณฑ์</div>
            <!-- <table> -->
            <table style="width: 100%;">
              <thead>
                <th class="text-left">ชื่อยา</th>
                <th>จำนวน</th>
                <th>ราคาต่อหน่วย</th>
                <th class="text-left">ออกโดย</th>
                <th class="text-left">วันที่</th>
              </thead>
              <tbody>
                <tr v-for="(item, i) in symptom.drugPush" :key="i">
                  <td>{{ item.name_drug }}</td>
                  <td class="text-center">{{ item.amount }}</td>
                  <td class="text-center">{{ item.price_for_unit }}</td>
                  <td>{{ item.order_by_name }}</td>
                  <td>{{ item.order_at }}</td>
                </tr>
              </tbody>
            </table>
            <!-- </table> -->
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_history = false">
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog_edit_history"
      persistent
      :overlay="false"
      max-width="70%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <div>แก้ไขประวัติการรักษา ({{ symptom_edit.create_at }})</div>
        </v-card-title>
        <v-card-text>
          <div>
            <v-text-field type="text" flat label="อาการเบื้องต้น"  v-model="symptom_edit.initial" outlined color></v-text-field>
          </div>
          <div>
            <v-text-field type="text" flat label="ผลการวินิจฉัย"  v-model="symptom_edit.predicate" outlined color></v-text-field>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="gary darken-1" text @click="dialog_edit_history = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEditHistoryClick()">
            บันทึก
          </v-btn>
        </v-card-actions>
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
      symptoms: [],
      symptom: {},
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
      menu: false,
      dialog_history: false,
      dialog_edit_history: false,
      symptom_edit: {}
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
      await this.$api.getMedicalRecord(this.id).then(response => {
        this.medical_record_data = response.data.data;
        this.birth = this.medical_record_data.birth;
        this.contact = `${this.medical_record_data.address} หมู่ที่ ${this.medical_record_data.moo} ถนน ${this.medical_record_data.road} ซอย ${this.medical_record_data.soi} ตำบล ${this.medical_record_data.tambon} อำเภอ ${this.medical_record_data.distric} จังหวัด ${this.medical_record_data.province} รหัสไปรษณีย์ ${this.medical_record_data.zip}`;
        this.phone = `เบอร์ติดต่อ ${this.medical_record_data.phone}`;
      });

      // Symptom
      this.symptoms = [];
      this.medical_record_data.SymptomPush.forEach(e => {
        this.symptoms.push({
          id: e._id,
          initial: e.initial,
          create_at: moment.format_local_time_PS(e.create_at),
          name_create: e.name_create,
          predicate: e.predicate,
          name_predicate: e.name_predicate,
          predicate_at:
            e.predicate_at != null
              ? moment.format_local_time_PS(e.predicate_at)
              : ""
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

      await this.$api
        .addInitialSymptom(data)
        .then(response => {
          this.dialog_load = false;
          this.dialog_symotom = false;
          this.fecth();
          this.$toast.open({
            message: "เพิ่มอาการเบื้องต้นและคิวเรียบร้อย",
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
        });
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
      // this.medical_record_data.birth = await this.birth;

      await this.$api
        .updateMedicalRecords(this.id, this.medical_record_data)
        .then(response => {
          this.readonly = true;
          this.dialog_load = false;
          this.fecth();

          this.$toast.open({
            message: "แก้ไขข้อมูลเสร็จสิ้น",
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
        });
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
    },
    async viewClick(item) {
      // console.log(item.id)
      await this.$api.getSymptom(item.id).then(async response => {
        this.symptom = response.data.data;
        this.symptom.create_by = response.data.data.name_create;
        this.symptom.name_predicate = response.data.data.name_predicate;
        this.symptom.drugPush = response.data.data.drugPush;
        this.symptom.create_at = moment.format_local_time_PS(
          response.data.data.create_at
        );
        this.symptom.predicate_at = this.symptom.predicate_at
          ? moment.format_local_time_PS(this.symptom.predicate_at)
          : "";

        await this.symptom.drugPush.forEach(e => {
          e.order_at = moment.format_local_time_PS(e.order_at);
        });
      });

      this.dialog_history = true;
    },
    editHistoryClick(list) {
      this.symptom_edit = list
      this.dialog_edit_history = true
    },
    async saveEditHistoryClick() {
      let form = {
        initial: this.symptom_edit.initial,
        predicate: this.symptom_edit.predicate
      }
      await this.$api.updateSymptom(this.symptom_edit.id, form)
        .then(response => {
          this.$toast.open({
            message: 'บันทึกสำเร็จ',
            type: 'success',
            duration: 6000
          })
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: 'error',
            duration: 6000
          })
        })

        this.dialog_edit_history = false
    }
  }
};
</script>

<style>
.view {
  cursor: pointer;
  color: rgb(58, 105, 233);
  width: fit-content;
}
</style>
