<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar color="white">
          <v-toolbar-title>ข้อมูลเวชภัณฑ์</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2" @click.stop="dialog_add = true"
            >เพิ่มข้อมูลเวชภัณฑ์</v-btn
          >
        </v-toolbar>

        <v-divider></v-divider>

        <template>
          <v-data-table
            :headers="headers"
            :items="data_list"
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
          <div>เพิ่มข้อมูลเวชภัณฑ์</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ชื่อยาทางการแพทย์"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ชื่อยาสามัญ"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="จำนวน"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2">
                <v-select
                  :items="['เม็ด', 'แผง', 'กระปุก', 'ขวด', 'ซอง']"
                  label="หน่วย"
                  required
                  v-model="form_data.title"
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
                      label="วัน/เดือน/ปีเข้าคลัง"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form_data.birth" no-title scrollable locale="th">
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
                <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="แหล่งที่มา"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  label="ราคาต่อหน่วย"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>
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
                      label="วัน/เดือน/ปีหมดอายุ"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="form_data.birth" no-title scrollable locale="th">
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
        { text: "จำนวน", value: "amount" },
        { text: "หน่วย", value: "unit" },
        { text: "วัน/เดือน/ปีเข้าคลัง", value: "date_add" },
        { text: "วัน/เดือน/ปีหมดอายุ", value: "date_expire" }
      ],
      data_list: [],
      dialog_add: false,
      menu: false,
      form_data: {}
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      this.data_list = [];
      const response = await MedicalSupplies.getAllMedicalSupplies()
      const res = await response.data.data
      let i = 0
      await res.forEach(e => {
        this.data_list.push({
          no: ++i,
          medical_name: e.medical_name,
          amount: e.amount,
          unit: e.unit,
          date_add: moment.format_local(e.date_add),
          date_expire: moment.format_local(e.expire)
        })
      });
    },
    async add() {
    }
  }
};
</script>
