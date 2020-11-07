<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title>ใบรับรองแพทย์</v-card-title>
        <v-divider class="mx-3"></v-divider>
        <v-card-text>
          <!-- <v-card> -->
          <v-tabs v-model="tab">
            <v-tab v-for="item in items" :key="item">
              {{ item }}
            </v-tab>
          </v-tabs>
          <!--
          <v-tabs-items v-model="tab">
            <v-tab-item v-for="item in items" :key="item"> -->
          <!-- ใบรับรองแพทย์ -->
          <v-card flat v-if="tab == 0">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="1">
                    <v-text-field
                      label="เล่มที่"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.book"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="1">
                    <v-text-field
                      label="เลขที่"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.num"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2">
                    <v-select
                      :items="['นาย', 'นาง', 'นางสาว', 'ดช.', 'ดญ.']"
                      label="คำนำหน้าชื่อ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.medicalRecord_id.title"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="ชื่อ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.medicalRecord_id.first"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="นามสกุล"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.medicalRecord_id.last"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ที่อยู่"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.medicalRecord_id.address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="1">
                    <v-text-field
                      label="หมู่"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.medicalRecord_id.moo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-autocomplete
                      :items="province"
                      :filter="customFilterP"
                      item-text="PROVINCE_NAME"
                      item-value="PROVINCE_NAME"
                      v-model="form_doc.medicalRecord_id.province"
                      label="จังหวัด"
                      dense
                      hide-details="true"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="setDistrict(data.item.PROVINCE_CODE)"
                            >{{ data.item.PROVINCE_NAME }}</v-list-item-content
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
                      v-model="form_doc.medicalRecord_id.distric"
                      label="อำเภอ"
                      dense
                      hide-details="true"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="setSubDistrict(data.item.DISTRICT_CODE)"
                            >{{ data.item.DISTRICT_NAME }}</v-list-item-content
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
                      v-model="form_doc.medicalRecord_id.tambon"
                      label="ตำบล"
                      dense
                      hide-details="true"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="เลขประจำตัวประชาชน"
                      required
                      dense
                      maxlength="13"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_doc.medicalRecord_id.citizen_id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="setMoment"
                          dense
                          hide-details="true"
                          label="วันที่ตรวจ"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form_doc.date"
                        @input="menu2 = false"
                        locale="th"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="3" md="3">
                    <v-select
                      :items="['นพ. ชัยโรจน์ ขุมมงคล']"
                      label="แพทย์ผู้ตรวจ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.name_predicate"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="เลขที่ใบอนุญาต"
                      required
                      dense
                      maxlength="10"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_doc.doctor_id"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="น้ำหนัก"
                      required
                      dense
                      maxlength="6"
                      @keypress="onlyForCurrency"
                      hide-details="true"
                      v-model="form_doc.weight"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ส่วนสูง"
                      required
                      dense
                      maxlength="7"
                      @keypress="onlyForCurrency2"
                      hide-details="true"
                      v-model="form_doc.height"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ความดันโลหิต"
                      required
                      dense
                      maxlength="3"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_doc.press"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ชีพจร"
                      required
                      dense
                      maxlength="3"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_doc.pulse"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-radio-group
                      v-model="form_doc.deseat"
                      row
                      dense
                      hide-details="true"
                    >
                      <p class="mt-4 mr-2">โรคประจำตัว</p>
                      <v-radio label="ไม่มี" :value="false"></v-radio>
                      <v-radio label="มี" :value="true"></v-radio>
                      <v-text-field
                        class="mt-2"
                        v-if="form_doc.deseat"
                        label="ระบุ"
                        required
                        dense
                        hide-details="true"
                        v-model="form_doc.medicalRecord_id.disease"
                      ></v-text-field>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-radio-group
                      v-model="form_doc.aciden"
                      row
                      dense
                      hide-details="true"
                    >
                      <p class="mt-4 mr-2">อุบัติเหตุ และผ่าตัด</p>
                      <v-radio label="ไม่มี" :value="false"></v-radio>
                      <v-radio label="มี" :value="true"></v-radio>
                      <v-text-field
                        class="mt-2"
                        v-if="form_doc.aciden"
                        label="ระบุ"
                        required
                        dense
                        hide-details="true"
                        v-model="form_doc.aciden_detail"
                      ></v-text-field>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12">
                    <v-radio-group
                      v-model="form_doc.heal"
                      row
                      dense
                      hide-details="true"
                    >
                      <p class="mt-4 mr-2">เคยเข้ารับการรักษาในโรงพยาบาล</p>
                      <v-radio label="ไม่มี" :value="false"></v-radio>
                      <v-radio label="มี" :value="true"></v-radio>
                      <v-text-field
                        class="mt-2"
                        v-if="form_doc.heal"
                        label="ระบุ"
                        required
                        dense
                        hide-details="true"
                        v-model="form_doc.heal_detail"
                      ></v-text-field>
                    </v-radio-group>
                  </v-col>

                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="ประวัติสุขภาพที่สำคัญ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.note1"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12">
                    <v-radio-group
                      v-model="form_doc.body"
                      row
                      dense
                      hide-details="true"
                    >
                      <p class="mt-4 mr-2">สภาพร่างกาย</p>
                      <v-radio label="ปกติ" :value="true"></v-radio>
                      <v-radio label="ผิดปกติ" :value="false"></v-radio>
                      <v-text-field
                        class="mt-2"
                        v-if="!form_doc.body"
                        label="ระบุ"
                        required
                        dense
                        hide-details="true"
                        v-model="form_doc.body_detail"
                      ></v-text-field>
                    </v-radio-group>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="โรคอื่นๆ (ถ้ามี)"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.disease"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="ความเห็นของแพทย์"
                      required
                      dense
                      hide-details="true"
                      v-model="form_doc.opinion"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions
              ><v-spacer></v-spacer>
              <v-btn color="success" @click="cert_doc">ออกใบรับรองแพทย์</v-btn
              ><v-spacer></v-spacer>
            </v-card-actions>
          </v-card>

          <!-- ใบรับรองป่วย -->
          <v-card flat v-if="tab == 1">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="3" md="3">
                    <v-select
                      :items="['นพ.ชัยโรจน์ ขุมมงคล']"
                      label="แพทย์ผู้ตรวจ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.name_predicate"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="เลขที่ใบอนุญาต"
                      required
                      dense
                      maxlength="10"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_sick.doctor_id"
                    ></v-text-field>
                  </v-col>
                  <!-- <v-col cols="12" sm="3" md="4">
                        <v-select
                          :items="['นพ.ชัยโรจน์ ขุมมงคล']"
                          label="แพทย์ผู้ตรวจ"
                          required
                          dense
                          hide-details="true"
                          v-model="form_sick.titleDoc"
                        ></v-select>
                      </v-col> -->
                  <v-col cols="12" sm="2" md="2">
                    <v-select
                      :items="['นาย', 'นาง', 'นางสาว', 'ดช.', 'ดญ.']"
                      label="คำนำหน้าชื่อ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.title"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ชื่อ"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.first"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="นามสกุล"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.last"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="1">
                    <v-text-field
                      label="อายุ"
                      required
                      dense
                      maxlength="3"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.age"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ที่อยู่"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.address"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="1">
                    <v-text-field
                      label="หมู่"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.moo"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-autocomplete
                      :items="province"
                      :filter="customFilterP"
                      item-text="PROVINCE_NAME"
                      item-value="PROVINCE_NAME"
                      v-model="form_sick.medicalRecord_id.province"
                      label="จังหวัด"
                      dense
                      hide-details="true"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="setDistrict(data.item.PROVINCE_CODE)"
                            >{{ data.item.PROVINCE_NAME }}</v-list-item-content
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
                      v-model="form_sick.medicalRecord_id.distric"
                      label="อำเภอ"
                      dense
                      hide-details="true"
                    >
                      <template v-slot:item="data">
                        <template>
                          <v-list-item-content
                            @click="setSubDistrict(data.item.DISTRICT_CODE)"
                            >{{ data.item.DISTRICT_NAME }}</v-list-item-content
                          >
                        </template>
                      </template>
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="2">
                    <v-autocomplete
                      :items="tambon"
                      :filter="customFilterS"
                      item-text="SUB_DISTRICT_NAME"
                      item-value="SUB_DISTRICT_NAME"
                      v-model="form_sick.medicalRecord_id.tambon"
                      label="ตำบล"
                      dense
                      hide-details="true"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="ถนน"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.road"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-text-field
                      label="เลขประจำตัวประชาชน"
                      required
                      dense
                      maxlength="13"
                      @keypress="onlynumber"
                      hide-details="true"
                      v-model="form_sick.medicalRecord_id.citizen_id"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      v-model="m2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="setMoment2"
                          dense
                          hide-details="true"
                          label="วันที่ตรวจ"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form_sick.date"
                        @input="m2 = false"
                        locale="th"
                      ></v-date-picker>
                    </v-menu>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="สรุปผลการรักษา"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.note"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="12">
                    <v-text-field
                      label="คำแนะนำจากแพทย์"
                      required
                      dense
                      hide-details="true"
                      v-model="form_sick.conclude"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions
              ><v-spacer></v-spacer>
              <v-btn color="success" @click="cert_sick">ออกใบรับรองป่วย</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
          <!-- </v-tab-item>
          </v-tabs-items> -->
          <!-- </v-card> -->
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Certificate_pdf from "../../../utils/certificate_pdf";
import Province from "../../../utils/province.json";
import District from "../../../utils/district.json";
import Tambon from "../../../utils/tambon.json";
import moment from "../../../utils/moment";
import * as SymptomAPI from "../../../utils/symptomAPI";
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
      items: ["ใบรับรองแพทย์", "ใบรับรองป่วย"],
      tab: null,
      form_doc: {
        medicalRecord_id: {},
        body: true
      },
      form_sick: {
        medicalRecord_id: {},
      },
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      m2: false,
      province: Province,
      district: [],
      tambon: []
    };
  },
  computed: {
    setMoment() {
      return this.form_doc.date
        ? moment.format_local_PS(this.form_doc.date)
        : "";
    },
    setMoment2() {
      return this.form_sick.date
        ? moment.format_local_PS(this.form_sick.date)
        : "";
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      if (this.id != undefined) {
        const response = await SymptomAPI.getSymptom(this.id);

        this.form_doc = await response.data.data;
        this.form_sick = await response.data.data;
        this.checkProvince();
      }
    },
    onlyForCurrency($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.form_doc.weight.indexOf(".") != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      if (
        this.form_doc.weight != null &&
        this.form_doc.weight.indexOf(".") > -1 &&
        this.form_doc.weight.split(".")[1].length > 1
      ) {
        $event.preventDefault();
      }
    },
    onlyForCurrency2($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;

      if (
        (keyCode < 48 || keyCode > 57) &&
        (keyCode !== 46 || this.form_doc.height.indexOf(".") != -1)
      ) {
        // 46 is dot
        $event.preventDefault();
      }

      if (
        this.form_doc.height != null &&
        this.form_doc.height.indexOf(".") > -1 &&
        this.form_doc.height.split(".")[1].length > 1
      ) {
        $event.preventDefault();
      }
    },

    onlynumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    cert_doc() {
      this.form_doc.day = moment.getDate(this.form_doc.date);
      this.form_doc.month = moment.getMonthDoc(this.form_doc.date);
      this.form_doc.year = moment.getYear(this.form_doc.year);
      // console.log(this.form_doc.day)
      Certificate_pdf.Certificate_doc(this.form_doc);
    },
    cert_sick() {
      this.form_sick.day = moment.getDate(this.form_sick.date);
      this.form_sick.month = moment.getMonthDoc(this.form_sick.date);
      this.form_sick.year = moment.getYear(this.form_sick.year);
      Certificate_pdf.Certificate_sick(this.form_sick);
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
    async checkProvince() {
      await this.province.forEach(async e => {
        if (this.form_doc.medicalRecord_id.province == e.PROVINCE_NAME) {
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
          if (this.form_doc.medicalRecord_id.distric == e.DISTRICT_NAME) {
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
    }
  }
};
</script>
