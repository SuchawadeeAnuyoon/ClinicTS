<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>ข้อมูลเวชระเบียน</v-toolbar-title>
          <v-flex class="mt-4 ml-10" md3>
            <v-text-field
              label="ค้นหาเวชระเบียน"
              v-model="search"
              dense
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
            <template v-slot:[`item.action`]="{ item }">
              <v-icon @click="deleteClick(item)">
                mdi-delete
              </v-icon>
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
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="2">
                  <v-select
                    :items="['นาย', 'นาง', 'นางสาว', 'ดช.', 'ดญ.']"
                    label="คำนำหน้าชื่อ*"
                    required
                    v-model="form_data.title"
                    :rules="rules.title"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                  <v-text-field
                    label="ชื่อ*"
                    required
                    v-model="form_data.first"
                    :rules="rules.first"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="5">
                  <v-text-field
                    label="นามสกุล*"
                    required
                    v-model="form_data.last"
                    :rules="rules.last"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="เลขประจำตัวประชาชน*"
                    required
                    maxlength="13"
                    @keypress="onlynumber"
                    v-model="form_data.citizen_id"
                    :rules="[check, rules.citizen_id]"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="2">
                  <v-select
                    :items="['ชาย', 'หญิง']"
                    label="เพศ*"
                    required
                    v-model="form_data.sex"
                    :rules="rules.sex"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="วัน/เดือน/ปีเกิด*"
                    required
                    v-model="form_data.birth"
                    :rules="rules.birth"
                  ></v-text-field>
                  <!-- <v-menu
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
                        :value="setMoment"
                        label="วัน/เดือน/ปีเกิด*"
                        prepend-icon="mdi-calendar"
                        v-bind="attrs"
                        v-on="on"
                        :rules="rules.birth"
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
                  </v-menu> -->
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label="สัญชาติ*"
                    required
                    v-model="form_data.nationality"
                    :rules="rules.nationality"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="ที่อยู่*"
                    required
                    v-model="form_data.address"
                    :rules="rules.address"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label="หมู่*"
                    required
                    v-model="form_data.moo"
                    :rules="rules.moo"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label="ถนน*"
                    required
                    v-model="form_data.road"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label="ซอย"
                    required
                    v-model="form_data.soi"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-autocomplete
                    :items="province"
                    :filter="customFilterP"
                    item-text="PROVINCE_NAME"
                    item-value="PROVINCE_NAME"
                    v-model="form_data.province"
                    label="จังหวัด*"
                    :rules="rules.province"
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
                    v-model="form_data.distric"
                    label="อำเภอ/เขต*"
                    :rules="rules.distric"
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
                    v-model="form_data.tambon"
                    label="ตำบล/แขวง*"
                    :rules="rules.tambon"
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
                    label="รหัสไปรษณีย์*"
                    required
                    v-model="form_data.zip"
                    :rules="rules.zip"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <v-text-field
                    label="เบอร์โทรติดต่อ*"
                    required
                    maxlength="10"
                    @keypress="onlynumber"
                    v-model="form_data.phone"
                    :rules="rules.phone"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="3">
                  <!-- <v-col cols="12" sm="6" md="3"> -->
                  <v-select
                    :items="['A', 'B', 'AB', 'O', '-']"
                    label="กรุ๊บเลือด"
                    v-model="form_data.blood"
                  ></v-select>
                  <!-- </v-col> -->
                </v-col>

                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="โรคประจำตัว*"
                    required
                    v-model="form_data.disease"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="ประวัติการแพ้ยา*"
                    required
                    v-model="form_data.drug_allergy"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
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

    <v-dialog v-model="dialogDelete" max-width="600px">
          <v-card>
            <div class="px-5 py-5 text-h6">คุณแน่ใจหรือไม่ที่จะลบข้อมูลเวชระเบียน "{{medical_record.first}} {{medical_record.last}}" ?</div>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="gray darken-1" text @click="dialogDelete = false">ยกเลิก</v-btn>
              <v-btn color="red darken-1" text @click="deleteConfirmClick(medical_record)">ลบ</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
  </div>
</template>

<script>
import Province from "../../utils/province.json";
import District from "../../utils/district.json";
import Tambon from "../../utils/tambon.json";
import Zip from "../../utils/zip.json";
import moment from "../../utils/moment";
import ThaiID from "../../utils/thai-id";
export default {
  layout: "dashboard",
  middleware: "auth",
  components: {},
  data() {
    return {
      headers: [
        { text: "ลำดับที่", value: "no" },
        { text: "เลขบัตรประจำตัวประชาชน", value: "citizen_id" },
        { text: "ชื่อ", value: "first" },
        { text: "สกุล", value: "last" },
        { text: "บันทึกโดย", value: "record_by" },
        { text: "", value: "action" }
      ],
      data_list: [],
      dialog_add: false,
      menu: false,
      form_data: {
        nationality: "ไทย"
      },
      search: "",
      province: Province,
      district: [],
      tambon: [],
      rules: {
        citizen_id: [],
        title: [],
        first: [],
        last: [],
        birth: [],
        nationality: [],
        address: [],
        moo: [],
        road: [],
        soi: [],
        sex: [],
        province: [],
        distric: [],
        tambon: [],
        zip: [],
        phone: []
      },
      filter: {},
      dialogDelete: false,
      medical_record: {}
    };
  },
  computed: {
    listFilter() {
      let text = this.search.trim();
      return this.data_list.filter(item => {
        return (
          item.citizen_id.indexOf(text) > -1 ||
          item.first.indexOf(text) > -1 ||
          item.last.indexOf(text) > -1
        );
      });
    },
    check() {
      let res = ThaiID.checkIDCard(this.form_data.citizen_id);
      if (res == false) {
        return "หมายเลขบัตรประชาชนไม่ถูกต้อง";
      } else {
        return true;
      }
    },
    checkS() {
      let res = ThaiID.checkIDCard(this.search);
      if (res == false) {
        return "หมายเลขบัตรประชาชนไม่ถูกต้อง";
      } else {
        return true;
      }
    },
    list_medical_record() {
      return this.$store.getters["medicalRecords/getList"];
    }
  },
  async mounted() {
    this.fetch();
    // console.log(this.province);
  },
  methods: {
    async fetch() {
      this.data_list = [];
      this.form_data = {
        nationality: "ไทย"
      };
      await this.$store.dispatch("medicalRecords/fetch");
      // console.log(this.list_medical_record)

      this.list_medical_record.forEach((e, i) => {
        // console.log(e.record_by);
        this.data_list.push({
          no: i + 1,
          id: e._id,
          citizen_id: e.citizen_id,
          first: e.first,
          last: e.last,
          record_by: `${e.record_by.title} ${e.record_by.first} ${e.record_by.last}`
        });
      });
    },
    async add() {
      if (
        !this.form_data.title ||
        !this.form_data.first ||
        !this.form_data.last ||
        !this.form_data.citizen_id ||
        !this.form_data.birth ||
        !this.form_data.nationality ||
        !this.form_data.address ||
        !this.form_data.moo ||
        !this.form_data.road ||
        !this.form_data.soi ||
        !this.form_data.sex ||
        !this.form_data.province ||
        !this.form_data.distric ||
        !this.form_data.tambon ||
        !this.form_data.zip ||
        !this.form_data.phone
      ) {
        this.rules = {
          citizen_id: [value => !!value || "กรุณากรอกหมายเลขบัตรประชาชน"],
          title: [value => !!value || "กรุณาเลือกคำนำหน้าชื่อ"],
          first: [value => !!value || "กรุณากรอกชื่อ"],
          last: [value => !!value || "กรุณากรอกนามสกุล"],
          sex: [value => !!value || "กรุณาเลือกเพศ"],
          birth: [value => !!value || "กรุณาเลือกวันเดือนปีเกิด"],
          nationality: [value => !!value || "กรุณากรอกสัญชาติ"],
          address: [value => !!value || "กรุณากรอกที่อยุ่"],
          moo: [value => !!value || "กรุณากรอกเลขที่หมู่บ้าน"],
          province: [value => !!value || "กรุณาเลือกจังหวัด"],
          distric: [value => !!value || "กรุณาเลือกอำเภอ"],
          tambon: [value => !!value || "กรุณาเลือกตำบล"],
          zip: [value => !!value || "กรุณากรอกรหัสไปรษณีย์"],
          phone: [value => !!value || "กรุณากรอกหมายเลขโทรศัพท์"]
        };
        this.$refs.form.validate();
      } else {
        // this.form_data.birth = moment.format(this.form_data.birth);
        await this.$api
          .createMedicalRecords(this.form_data)
          .then(response => {
            this.$toast.open({
              message: "เพิ่มข้อมูลเวชระเบียนเรียบร้อย",
              type: "success",
              duration: 6000
            });
            this.fetch();
            this.dialog_add = false;
          })
          .catch(error => {
            this.$toast.open({
              message: error.response.data.errMessage,
              type: "error",
              duration: 6000
            });
          });
      }
    },
    onlynumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
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
          this.form_data.zip = await e.ZIPCODE;
        }
      });
    },
    deleteClick(item) {
      this.medical_record = item
      this.dialogDelete = true
    },
    async deleteConfirmClick(item) {
      await this.$api.deleteMedicalRecords(item.id)
        .then(response => {
          this.$toast.open({
            message: 'ลบข้อมูลเวชระเบียนแล้ว',
            type: 'success',
            duration: 6000
          })
          this.dialogDelete = false
          this.medical_record = {}
          this.fetch()
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: 'error',
            duration: 6000
          })
        })
    }
  }
};
</script>
