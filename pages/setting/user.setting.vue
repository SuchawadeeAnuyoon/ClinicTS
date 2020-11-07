<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar color="whtie">
          <v-toolbar-title>ข้อมูลผู้ใช้</v-toolbar-title>
          <v-flex class="mt-4 ml-10" md3>
            <v-text-field
              label="ค้นหาบัญชีผู้ใช้"
              v-model="search"
              dense
              clearable
            ></v-text-field>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn color="blue lighten-2" @click="dialog_add = true"
            >เพิ่มบัญชีผู้ใช้</v-btn
          >
        </v-toolbar>

        <template>
          <v-data-table
            :headers="header_user"
            :items="listFilter"
            :items-per-page="10"
            disable-sort
          >
            <template v-slot:[`item.edit`]="{ item }">
              <!-- <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    color="grey"
                    icon
                    v-bind="attrs"
                    v-on="on"
                    @click="view(item.id, item.name)"
                  >
                    <v-icon>mdi-eye</v-icon>
                  </v-btn>
                </template>
                <span>ดูงานทั้งหมด</span>
              </v-tooltip> -->

              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="grey" icon v-bind="attrs" v-on="on" @click="Delete(item.id, item.name)">
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </template>
                <span>ลบผู้ใช้</span>
              </v-tooltip>
            </template>
          </v-data-table>
        </template>
      </v-card>
    </v-container>

    <!-- เพิ่มผู้ใช้ -->
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
          <div>เพิ่มบัญชีผู้ใช้</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="2">
                <v-text-field
                  label="คำนำหน้าชื่อ"
                  required
                  v-model="form_data.title"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="ชื่อ"
                  required
                  v-model="form_data.first"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="นามสกุล"
                  required
                  v-model="form_data.last"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="4">
                <v-text-field
                  label="หมายเลขประจำตัวแพทย์"
                  required
                  v-model="form_data.doctor_id"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="Email"
                  required
                  v-model="form_data.email"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="3">
                <v-text-field
                  label="เบอร์โทร"
                  required
                  v-model="form_data.phone"
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="2">
                <v-select
                  :items="role_item"
                  label="สิทธิ์"
                  required
                  item-text="name"
                  item-value="value"
                  v-model="form_data.role"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-1" text @click="dialog_add = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="newUser">
            บันทึก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- รายการงาน -->
    <v-dialog
      v-model="dialog_view"
      scrollable
      persistent
      :overlay="false"
      max-width="60%"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title>
          <p>รายการงานของ: {{ view_name }}</p>
          <v-spacer></v-spacer>
          <v-btn color="grey" icon @click="dialog_view = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-container>
            <div class="text-center mt-10" v-if="view_loading">
              <v-progress-circular
              align-center
              class="my-4"
              centered
              indeterminate
              color="primary"
              :size="50"
            ></v-progress-circular>
            </div>
            <div v-if="list_activities == 0 && !view_loading">
              <p class="text-center">ไม่มีรายการงาน</p>
            </div>
            <v-expansion-panels v-if="!view_loading">
              <v-expansion-panel v-for="item in list_activities" :key="item.id">
                <v-expansion-panel-header>
                  <div>
                    {{ item.activity }}: {{ item.from
                    }}<span class="float-right mr-9">{{ item.time }}</span>
                  </div>
                </v-expansion-panel-header>
                <!-- <v-expansion-panel-content>
                  <div v-if="item.from == 'medical-record'">
                    <v-divider></v-divider>
                    <p>{{item.data.title}} {{item.data.first}} {{item.data.last}}<br>
                    {{item.data.citizen_id}}
                    </p>
                  </div>
                </v-expansion-panel-content> -->
              </v-expansion-panel>
            </v-expansion-panels>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- Dialog Load -->
    <v-dialog v-model="dialog_load" width="200">
      <v-card width="200" height="200" flat class="text-center">
        <v-card-subtitle>กำลังอัพโหลดข้อมูล: </v-card-subtitle>
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

    <v-dialog v-model="dialog_delete" max-width="30%">
      <v-card flat >
        <v-card-title>ลบผู้ใช้</v-card-title>
        <v-card-text>
          <p>ต้องการลบผู้ใช้: {{user_name}} ใช่หรือไม่</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="grey darken-3" text @click="dialog_delete = false">
            ยกเลิก
          </v-btn>
          <v-btn color="red" text @click="Delete_user()">
             ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Sancker -->
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
import * as UserApi from "../../utils/userAPI";
import * as ActivitiesAPI from "../../utils/activitiesAPI";
import moment from "../../utils/moment";
import { months } from "moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      search: "",
      dialog_add: false,
      list_user: [],
      header_user: [
        { text: "ชื่อ-นามสกุล", value: "name" },
        { text: "เลขที่ใบประกอบวิชาชีพเวชกรรม", value: "doctor_id" },
        { text: "สิทธิ์", value: "role" },
        { text: "อีเมล", value: "email" },
        { text: "วันเวลาที่สร้าง", value: "time" },
        { text: "จัดการ", value: "edit" }
      ],
      form_data: {},
      snackbar: {
        bool: false,
        color: "",
        msg: ""
      },
      dialog_load: false,
      dialog_view: false,
      list_activities: [],
      view_name: "",
      view_loading: false,
      dialog_delete: false,
      user_name: '',
      user_id: null,
      role_item: [
        {name: 'แพทย์', value: 'doctor'},
        {name: 'พยาบาล', value: 'nurse'},
        {name: 'ผู้ช่วยพยาบาล', value: 'assistant'},
      ],
    };
  },
  computed: {
    listFilter () {
      let text = this.search.trim()
      return this.list_user.filter(item => {
        return item.name.indexOf(text) > -1 || item.doctor_id.indexOf(text) > -1
      })
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const response = await UserApi.getAllUser();
      let list = await [];
      this.form_data = await {}

      await response.data.data.forEach(async e => {
        await list.push({
          id: e.id,
          name: `${e.title} ${e.first} ${e.last}`,
          role: e.role,
          doctor_id: e.doctor_id,
          email: e.email,
          time: moment.format_local_time_PS(e.create_at)
        });
      });

      this.list_user = await list;
    },
    async newUser() {
      this.dialog_load = await true;
      this.form_data.password = await "P@ssw0rd";
      // console.log((this.form_data))
      const response = await UserApi.newUser(this.form_data);

      if (response.data.success === false) {
        alert(response.data.errMessage);
      } else {
        this.dialog_add = await false;
        this.snackbar = await {
          bool: true,
          color: "green",
          msg: "เพิ่มข้อมูลผู้ใช้เสร็จสิ้น"
        };
        await this.fetch();
        this.dialog_load = await false;
      }
    },
    async view(id, name) {
      this.view_name = await name;
      this.view_loading = await true
      this.dialog_view = await true;
      const response = await ActivitiesAPI.getAllActivities();
      const list = [];

      await response.data.data.forEach(async e => {
        if (id === e.act_by.id) {
          await list.push({
            id: e.id,
            activity: e.activities,
            data: e.data,
            time: moment.format_local_time(e.time),
            from: e.from
          });
        }
      });

      this.list_activities = await list;
      this.view_loading = await false

    },
    async Delete(id, name) {
      this.user_id = await id
      this.user_name = await name;
      this.dialog_delete = await true;
    },
    async Delete_user() {
      this.dialog_load = await true
      const response = await UserApi.deleteUser(this.user_id)

      await this.fetch()
      this.dialog_delete = await false
      this.dialog_load = await false
    }
  }
};
</script>
