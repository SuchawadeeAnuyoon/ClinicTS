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
          <!-- <div> -->
          <v-btn v-if="role" color="blue lighten-2" @click="dialog_add = true"
            >เพิ่มข้อมูลเวชภัณฑ์</v-btn
          >
          <!-- </div> -->
        </v-toolbar>

        <v-divider></v-divider>

        <template>
          <v-data-table
            :headers="headers"
            :items="listFilter"
            :items-per-page="10"
            sort-by="medical_name"
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
            <v-form ref="form">
              <v-row>
                <v-col cols="12" sm="6" md="7">
                  <v-text-field
                    label="ชื่อยาทางการแพทย์*"
                    required
                    v-model="form_data.medical_name"
                    :rules="rules.medical_name"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="5">
                  <v-text-field
                    label="ชื่อยาสามัญ*"
                    required
                    v-model="form_data.name"
                    :rules="rules.from"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                  <v-text-field
                    label="จำนวน*"
                    required
                    v-model="form_data.total"
                    :rules="rules.total"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="2">
                  <v-select
                    :items="[
                      'เม็ด',
                      'แผง',
                      'หลอด',
                      'ขวด',
                      'ซอง',
                      'โดส',
                      'แคปซูล',
                      'อื่นๆ'
                    ]"
                    label="หน่วย*"
                    required
                    v-model="form_data.unit"
                    :rules="rules.unit"
                  ></v-select>
                </v-col>

                <v-col cols="12" sm="6" md="2" v-if="form_data.unit == 'อื่นๆ'">
                  <v-text-field
                    label="ระบุ.."
                    v-model="form_data.other_unit"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" :md="form_data.unit == 'อื่นๆ' ? 6 : 4">
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
                        :value="setMomentAdd"
                        label="วัน/เดือน/ปีเข้าคลัง*"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="rules.add"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date.add"
                      no-title
                      scrollable
                      :min="today"
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
                <v-col cols="12" sm="6" :md="form_data.unit == 'อื่นๆ' ? 5 : 4">
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
                        :value="setMomentExpire"
                        label="วัน/เดือน/ปีหมดอายุ*"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                        :rules="rules.expire"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      v-model="date.expire"
                      no-title
                      scrollable
                      :min="today"
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
                    label="ราคาต่อหน่วย*"
                    required
                    v-model="form_data.price_for_unit"
                    :rules="rules.price_for_unit"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="4">
                  <v-checkbox
                    dense
                    v-model="form_data.type4"
                    label="วัตถุออกฤทธิ์ประเภทที่ 3 หรือ 4"
                  ></v-checkbox>
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="เลขที่รุ่นที่/ครั้งที่ผลิด*"
                    required
                    v-model="form_data.number"
                    :rules="rules.number"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    label="ชื่อผู้ผลิต และแหล่งผลิต*"
                    required
                    v-model="form_data.creator"
                    :rules="rules.creator"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" md="12">
                  <v-text-field
                    label="แหล่งที่มา*"
                    required
                    v-model="form_data.from"
                    :rules="rules.from"
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

    <!-- <v-snackbar
      :timeout="5000"
      v-model="snackbar.bool"
      :color="snackbar.color"
      absolute
      right
      rounded="pill"
      top
    >
      {{ snackbar.msg }}
    </v-snackbar> -->
  </div>
</template>

<script>
import moment from "../../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      headers: [
        { text: "ชื่อยาสามัญ", value: "medical_name" },
        { text: "จำนวน", value: "total" },
        { text: "รุ่น", value: "number" },
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
      search: "",
      role: false,
      rules: {
        medical_name: [],
        name: [],
        total: [],
        unit: [],
        add: [],
        expire: [],
        price_for_unit: [],
        number: [],
        creator: [],
        from: []
      },
      today: new Date().toISOString().slice(0, 10),
      unit_other: ""
    };
  },
  computed: {
    listFilter() {
      let text = this.search.trim();
      return this.data_list.filter(item => {
        let text2 = item.medical_name.toLowerCase();
        return text2.indexOf(text) > -1;
      });
    },
    setMomentAdd() {
      return this.date.add ? moment.format_local_PS(this.date.add) : "";
    },
    setMomentExpire() {
      return this.date.expire ? moment.format_local_PS(this.date.expire) : "";
    },
    user() {
      return this.$store.getters["me/getUser"];
    },
    list_medical_supplies() {
      return this.$store.getters["medicalSupplies/getList"];
    }
  },
  async mounted() {
    await this.$store.dispatch("medicalSupplies/fetch");
    this.fetch();
  },
  methods: {
    async fetch() {
      let me = await this.user;
      if (me.role == "assistant") {
        this.role = false;
      } else {
        this.role = true;
      }
      this.data_list = [];

      this.list_medical_supplies.forEach((e, i) => {
        this.data_list.push({
          id: e._id,
          no: i + 1,
          medical_name: e.medical_name,
          total: e.total,
          unit: e.unit,
          number: e.number,
          date_add: moment.format_local_PS(e.date_add),
          date_expire: moment.format_local_PS(e.expire)
        });
      });
    },
    async add() {
      if (
        !this.form_data.medical_name ||
        !this.form_data.name ||
        !this.form_data.total ||
        !this.form_data.unit ||
        !this.date.add ||
        !this.date.expire ||
        !this.form_data.price_for_unit ||
        !this.form_data.number ||
        !this.form_data.creator ||
        !this.form_data.from
      ) {
        this.rules = {
          medical_name: [value => !!value || "กรุณากรอกชื่อยาทางการแพทย์"],
          name: [value => !!value || "กรุณากรอกชื่อยาสามัญ"],
          total: [value => !!value || "กรุณากรอกจำนวน"],
          unit: [value => !!value || "กรุณาเลือกหน่วย"],
          add: [value => !!value || "กรุณาเลือกวัน/เดือน/ปีเข้าคลัง"],
          expire: [value => !!value || "กรุณาเลือกวัน/เดือน/ปีเข้าคลัง"],
          price_for_unit: [value => !!value || "กรุณากรอกราคาต่อหน่วย"],
          number: [value => !!value || "กรุณากรอกเลขที่รุ่นที่/ครั้งที่ผลิด"],
          creator: [value => !!value || "กรุณากรอกชื่อผู้ผลิต และแหล่งผลิต"],
          from: [value => !!value || "กรุณากรอกแหล่งที่มา"]
        };

        this.$refs.form.validate();
      } else {
        this.form_data.date_add = moment.format(this.date.add);
        this.form_data.expire = moment.format(this.date.expire);
        // if (this.form_data.unit == "อื่นๆ") {
        //   this.form_data.unit = this.unit_other;
        // }

        // console.log(this.form_data.unit)

        await this.$api
          .createMedicalSupplies(this.form_data)
          .then(response => {
            this.fetch();
            // this.snackbar.bool = true;
            this.form_data = {};
            this.dialog_add = false;
            
            this.$toast.open({
              message: "เพิ่มข้อมูลสำเร็จ",
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

        this.fetch()
      }
    }
  }
};
</script>
