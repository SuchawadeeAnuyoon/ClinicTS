<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>ข้อมูลเวชภัณฑ์</v-toolbar-title>
          <v-flex class="mt-4 ml-10" md3>
            <v-text-field
              label="ค้นหาเวชภัณฑ์"
              v-model="search"
              dense
              clearable
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2" @click="dialog_add = true"
            >เพิ่มข้อมูลเวชภัณฑ์</v-btn
          >
        </v-toolbar>

        <v-divider></v-divider>

        <template>
          <v-data-table
            :headers="headers"
            :items="listFilter"
            :items-per-page="10"
            disable-sort
          >
            <template v-slot:[`item.medical_name`]="{ item }">
              <nuxt-link :to="`/medicalsupplies/${item.id}`">{{
                item.medical_name
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
          <div>เพิ่มข้อมูลเวชภัณฑ์</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="7">
                <v-text-field
                  label="ชื่อยาทางการแพทย์"
                  required
                  v-model="form_data.medical_name"
                  hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="5">
                <v-text-field
                  label="ชื่อยาสามัญ"
                  required
                  v-model="form_data.name"
                  hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  label="จำนวน"
                  required
                  v-model="form_data.total"
                  hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="2">
                <v-select
                  :items="['เม็ด', 'แผง', 'กระปุก', 'ขวด', 'ซอง']"
                  label="หน่วย"
                  required
                  v-model="form_data.unit"
                  hide-details="true"
                ></v-select>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="date.add"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date.add"
                      label="วัน/เดือน/ปีเข้าคลัง"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details="true"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date.add"
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
                      @click="$refs.menu.save(date.add)"
                    >
                      ตกลง
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="date.expire"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date.expire"
                      label="วัน/เดือน/ปีหมดอายุ"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      hide-details="true"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date.expire"
                    no-title
                    scrollable
                    locale="th"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="menu2 = false">
                      ยกเลิก
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.menu2.save(date.expire)"
                    >
                      ตกลง
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="ราคาต่อหน่วย"
                  required
                  v-model="form_data.price_for_unit"
                  hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6">
                <v-checkbox
                  dense
                  v-model="form_data.type4"
                  label="วัตถุออกฤทธิ์ประเภทที่ 3 หรือ 4"
                  hide-details="true"
                ></v-checkbox>
              </v-col>
            </v-row>

            <v-row v-if="form_data.type4 == true">
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="เลขที่รุ่นที่/ครั้งที่ผลิด"
                  required
                  v-model="form_data.number"
                  hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ชื่อผู้ผลิต และแหล่งผลิต"
                  required
                  v-model="form_data.creator"
                  hide-details="true"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="12">
                <v-text-field
                  label="แหล่งที่มา"
                  required
                  v-model="form_data.from"
                  hide-details="true"
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
import * as MedicalSupplies from "../../utils/medicalSuppliesAPI";
import moment from "../../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      headers: [
        { text: "ลำดับที่", value: "no" },
        { text: "ชื่อยาสามัญ", value: "medical_name" },
        { text: "จำนวน", value: "total" },
        { text: "หน่วย", value: "unit" },
        { text: "วัน/เดือน/ปีเข้าคลัง", value: "date_add" },
        { text: "วัน/เดือน/ปีหมดอายุ", value: "date_expire" }
      ],
      data_list: [],
      dialog_add: false,
      menu: false,
      menu2: false,
      form_data: {},
      date: {
        add: null,
        expire: null
      },
      snackbar: {
        bool: false,
        color: "",
        msg: ""
      },
      search: ""
    };
  },
  computed: {
    listFilter() {
      let text = this.search.trim();
      return this.data_list.filter(item => {
        let text2 = item.medical_name.toLowerCase()
        return text2.indexOf(text) > -1;
      });
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.data_list = [];
      const response = await MedicalSupplies.getAllMedicalSupplies();
      const res = await response.data.data;
      let i = 0;
      await res.forEach(e => {
        this.data_list.push({
          id: e._id,
          no: ++i,
          medical_name: e.medical_name,
          total: e.total,
          unit: e.unit,
          date_add: moment.format_local(e.date_add),
          date_expire: moment.format_local(e.expire)
        });
      });
    },
    async add() {
      this.form_data.date_add = moment.format(this.date.add);
      this.form_data.expire = moment.format(this.date.expire);

      const response = await MedicalSupplies.newMedicalSupply(this.form_data);

      if (response.data.success == false) {
        alert(response.data.errMessage);
      } else {
        this.fetch();
        this.dialog_add = false;
        this.form_data = {};
        this.snackbar.bool = true;
        (this.snackbar.color = "green"),
          (this.snackbar.msg = "เพิ่มข้อมูลสำเร็จ");
      }
    }
  }
};
</script>
