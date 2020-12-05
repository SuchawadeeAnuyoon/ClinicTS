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
            >ข้อมูลเวชภัณฑ์:
            {{ medical_supply_data.medical_name }}</v-toolbar-title
          >
        </v-toolbar>

        <div>
          <template>
            <v-container fluid>
              <v-col>
                <v-row>
                  <div class="mr-5">ข้อมูลเวชภัณฑ์</div>
                  <v-btn
                  v-if="me.role != 'assistant'"
                    small
                    :color="btn_edit.color"
                    @click="edit(readonly)"
                    >{{ btn_edit.text }}</v-btn
                  >
                  <div v-if="!readonly">
                    <v-btn small class="ml-2" color="error" @click="dialog_delete = true"
                      >ลบ</v-btn
                    >
                    <v-btn
                      color="grey"
                      class="mx-2"
                      small
                      @click="edit('cancel')"
                      >ยกเลิก</v-btn
                    >
                  </div>
                </v-row>

                <v-divider class="my-3"></v-divider>
                <v-row>
                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      label="ชื่อยาทางการแพทย์"
                      :readonly="readonly"
                      v-model="medical_supply_data.medical_name"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="12" md="6">
                    <v-text-field
                      label="ชื่อยาสามัญ"
                      :readonly="readonly"
                      v-model="medical_supply_data.name"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      :append-outer-icon="!readonly ? 'mdi-plus' : ''"
                      @click:append-outer="dialog_add_amount = true"
                      label="จำนวน"
                      readonly
                      v-model="medical_supply_data.total"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" md="2">
                    <v-select
                      :items="['เม็ด', 'แผง', 'หลอด', 'ขวด', 'ซอง', 'โดส', 'แคปซูล']"
                      label="หน่วย"
                      :readonly="readonly"
                      v-model="medical_supply_data.unit"
                      dense
                    ></v-select>
                  </v-col>

                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="date.add"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      dense
                      :disabled="readonly"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="setMomentAdd"
                          label="วัน/เดือน/ปีเข้าคลัง"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
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

                  <v-col cols="12" sm="6" md="3">
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :return-value.sync="date.expire"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                      :disabled="readonly"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          :value="setMomentExpire"
                          label="วัน/เดือน/ปีหมดอายุ"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                          dense
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

                  <v-col cols="12" sm="6" md="2">
                    <v-text-field
                      label="ราคาต่อหน่วย"
                      :readonly="readonly"
                      v-model="medical_supply_data.price_for_unit"
                      dense
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6">
                    <v-checkbox
                      dense
                      v-model="medical_supply_data.type4"
                      label="วัตถุออกฤทธิ์ประเภทที่ 3 หรือ 4"
                      :readonly="readonly"
                    ></v-checkbox>
                  </v-col>


                </v-row>

                <v-row v-if="medical_supply_data.type4 == true">

                  <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="เลขที่รุ่นที่/ครั้งที่ผลิด"
                    required
                    dense
                    v-model="medical_supply_data.number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    label="ชื่อผู้ผลิตและแหล่งผลิต"
                    required
                    dense
                    v-model="medical_supply_data.creator"
                  ></v-text-field>
                </v-col>

                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      label="แหล่งที่มา"
                      :readonly="readonly"
                      v-model="medical_supply_data.from"
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" sm="12" md="12">
                    <div>ประวัติ</div>
                    <v-divider class=""></v-divider>
                    <template>
                      <v-simple-table>
                        <thead>
                          <tr>
                            <th></th>
                            <th>ชื่อยาทางการแพทย์</th>
                            <th>จำนวน</th>
                            <th>หน่วย</th>
                            <th>ราคาต่อหน่วย (บาท)</th>
                            <th>ราคารวม (บาท)</th>
                            <th>วันเวลา</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="list in activities_supplies"
                            :key="list.id"
                          >
                            <td>{{ list.activities }}</td>
                            <td>{{ list.medical_name }}</td>
                            <td>{{ list.amount }}</td>
                            <td>{{ list.unit }}</td>
                            <td>{{ list.price_for_unit }}</td>
                            <td>{{ list.price_total }}</td>
                            <td>{{ list.time }}</td>
                            <td>{{ list.activitor }}</td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </template>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </template>
        </div>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog_update" width="200">
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

    <v-dialog v-model="dialog_add_amount" max-width="20%">
      <v-card flat >
        <v-card-title>เพิ่มจำนวนเวชภัณฑ์</v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="จำนวน"
                  required
                  v-model="add_amount"
                  dense
                  type="Number"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-3" text @click="dialog_add_amount = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="addAmount()">
             เพิ่ม
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog_delete" max-width="25%">
      <v-card flat >
        <v-card-title>ลบเวชภัณฑ์</v-card-title>
        <v-card-text>
          <p>ต้องการลบเวชภัณฑ์: {{medical_supply_data.medical_name}} ใช่หรือไม่</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-3" text @click="dialog_delete = false">
            ยกเลิก
          </v-btn>
          <v-btn color="red" text @click="Delete(id)">
             ตกลง
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
      {{snackbar.msg}}
    </v-snackbar>
  </div>
</template>

<script>
import * as MedicalSuppliesAPI from "../../utils/medicalSuppliesAPI";
import * as ActivitiesAPI from "../../utils/activitiesAPI";
import moment from "../../utils/moment";
import { months } from "moment";
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
      medical_supply_data: {},
      loading: true,
      readonly: true,
      btn_edit: {
        text: "แก้ไข",
        color: "blue lighten-2"
      },
      menu: false,
      menu2: false,
      form_data: {},
      date: {
        add: null,
        expire: null
      },
      // datepicker: {
      //   add: null,
      //   expire: null
      // },
      activities_supplies: [],
      dialog_update: false,
      dialog_add_amount: false,
      dialog_delete: false,
      add_amount: null,
      snackbar: {
        bool: false,
        color: '',
        msg: ''
      },
      me: {}
    };
  },
  computed: {
    setMomentAdd() {
      return this.date.add ? moment.format_local_PS(this.date.add) : ''
    },
    setMomentExpire() {
      return this.date.expire ? moment.format_local_PS(this.date.expire) : ''
    }
  },
  mounted() {
    this.fetch();
    this.fecthActivities();
  },
  methods: {
    async fetch() {
      this.me = await this.$auth.user.data;
      const response = await MedicalSuppliesAPI.getOneMidicalSupply(this.id);

      this.medical_supply_data = await response.data.data;

      // this.date.add = await moment.format_local(this.medical_supply_data.date_add)
      this.date = await {
        add: moment.format_datepicker(this.medical_supply_data.date_add),
        expire: moment.format_datepicker(this.medical_supply_data.expire)
      };

      // this.datepicker = await {
      //   add: moment.format_datepicker(this.medical_supply_data.date_add),
      //   expire: moment.format_datepicker(this.medical_supply_data.expire)
      // };

      this.loading = await false;
    },
    back() {
      this.$router.push({ path: "/medicalsupplies" });
    },
    async fecthActivities() {
      const response = await ActivitiesAPI.getAllActivities();
      let activities = await response.data.data;
      let act_list = await [];

      await activities.forEach(async e => {
        if (e.from === "medical-supply" && e.data_id == this.id) {
          await act_list.push({
            id: e._id,
            medical_name: e.data.medical_name,
            activities: e.activities,
            time: moment.format_local_time_PS(e.time),
            activitor: `${e.act_by.title} ${e.act_by.first} ${e.act_by.last}`,
            amount: e.data.amount,
            unit: e.data.unit,
            price_for_unit: e.data.price_for_unit,
            price_total: e.data.price_total
          });
        }
      });

      this.activities_supplies = await act_list;
    },
    async edit(bool) {
      // console.log(bool)
      if (bool == true) {
        this.readonly = false;
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
      if (bool == false) {
        let supply_data = await this.medical_supply_data;

        let form = await {
          medical_name: supply_data.medical_name,
          name: supply_data.name,
          amount: 0,
          expire: moment.format(this.date.expire),
          date_add: moment.format(this.date.add),
          from: supply_data.from,
          price_for_unit: supply_data.price_for_unit
        };

        await this.update(form)
      }
    },
    async addAmount() {
      this.dialog_add_amount = await false
      this.dialog_update = await true
      let form = await {
        amount: parseInt(this.add_amount)
      }

      const response = await MedicalSuppliesAPI.updateAmountMidicalSupply(
          form,
          this.id
        );

        if (response.data.success == true) {
          this.readonly = await true
          this.dialog_update = await false

          this.snackbar = await {
            bool: true,
            color: 'green',
            msg: 'แก้ไขข้อมูลเสร็จสิ้น'
          }

          await this.fetch()
          await this.fecthActivities()
        }

    },
    async update(form) {
      this.dialog_update = await true
      const response = await MedicalSuppliesAPI.updateMidicalSupply(
          form,
          this.id
        );

        if (response.data.success == true) {
          this.readonly = await true
          this.dialog_update = await false

          this.snackbar = await {
            bool: true,
            color: 'green',
            msg: 'แก้ไขข้อมูลเสร็จสิ้น'
          }

          await this.fetch()
          await this.fecthActivities()
        }
    },
    async Delete(id) {
      this.dialog_update = await true
      const response = await MedicalSuppliesAPI.deleteMidicalSupply(id)

      await this.$router.push({ path: '/medicalsupplies'})
    }
  }
};
</script>
