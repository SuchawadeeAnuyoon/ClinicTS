<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>ใบนัด</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="2" md="2">
                <v-select
                  :items="['นาย', 'นาง', 'นางสาว', 'ดช.', 'ดญ.']"
                  label="คำนำหน้าชื่อ"
                  required
                  dense
                  hide-details="true"
                  v-model="form.title"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="ชื่อ"
                  required
                  dense
                  hide-details="true"
                  v-model="form.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="นามสกุล"
                  required
                  dense
                  hide-details="true"
                  v-model="form.last"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="เลขประจำตัวประชาชน"
                  required
                  dense
                  maxlength="13"
                  @keypress="onlynumber"
                  hide-details="true"
                  v-model="form.id"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="เบอร์โทรติดต่อ"
                  required
                  dense
                  maxlength="10"
                  @keypress="onlynumber"
                  hide-details="true"
                  v-model="form.phone"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="ที่อยู่"
                  required
                  dense
                  hide-details="true"
                  v-model="form.address"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="1">
                <v-text-field
                  label="หมู่"
                  required
                  dense
                  hide-details="true"
                  v-model="form.moo"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-autocomplete
                  :items="province"
                  :filter="customFilterP"
                  item-text="PROVINCE_NAME"
                  item-value="PROVINCE_NAME"
                  v-model="form.province"
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
                  v-model="form.district"
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
                  v-model="form.tambon"
                  label="ตำบล"
                  dense
                  hide-details="true"
                >
                </v-autocomplete>
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
                      v-model="form.date"
                      dense
                      hide-details="true"
                      label="วันนัด"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="form.date"
                    @input="menu2 = false"
                    locale="th"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="3">
                <v-menu
                  ref="menu3"
                  v-model="menu3"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="form.time"
                      dense
                      hide-details="true"
                      label="เวลานัด"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="menu3"
                    v-model="form.time"
                    full-width
                    format="24hr"
                    @click:minute="$refs.menu3.save(form.time)"
                  ></v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="หมายเหตุการนัด"
                  required
                  dense
                  hide-details="true"
                  v-model="form.note"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="success" dark @click="add">
            ออกใบนัด
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Appoinment_pdf from "../../utils/appoinment_pdf";
import Province from "../../utils/province.json";
import District from "../../utils/district.json";
import Tambon from "../../utils/tambon.json";
import moment from "../../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      form: {},
      province: Province,
      district: [],
      tambon: [],
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      menu3: false
    };
  },
  mounted() {},
  methods: {
    onlynumber($event) {
      let keyCode = $event.keyCode ? $event.keyCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        // 46 is dot
        $event.preventDefault();
      }
    },
    add() {
      this.form.day = moment.format_local_doc(this.form.date);
      Appoinment_pdf.Appoinment(this.form);
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
    }
  }
};
</script>
