<template>
  <div id="home">
    <v-container fluid>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="64">
            <v-toolbar flat>
              <v-btn
                outlined
                class="mr-4"
                color="grey darken-2"
                @click="setToday"
              >
                วันนี้
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="prev">
                <v-icon small>
                  mdi-chevron-left
                </v-icon>
              </v-btn>
              <v-btn fab text small color="grey darken-2" @click="next">
                <v-icon small>
                  mdi-chevron-right
                </v-icon>
              </v-btn>
              <v-toolbar-title v-if="$refs.calendar">
                {{ $refs.calendar.title }}
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn
                color="blue lighten-1"
                outlined
                class="mx-3"
                @click.stop="dialog_add = true"
                >เพิ่มการนัดหมาย</v-btn
              >
              <v-menu bottom right>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    outlined
                    color="grey darken-2"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <span>{{ typeToLabel[type] }}</span>
                    <v-icon right>
                      mdi-menu-down
                    </v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item @click="type = 'day'">
                    <v-list-item-title>วัน</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'week'">
                    <v-list-item-title>สัปดาห์</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = 'month'">
                    <v-list-item-title>เดือน</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="type = '4day'">
                    <v-list-item-title>4 วัน</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </v-toolbar>
          </v-sheet>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              v-model="focus"
              color="primary"
              locale="th"
              :events="events"
              :event-color="getEventColor"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="fetch"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <span>{{ selectedEvent.description }}</span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    ยกเลิก
                  </v-btn>
                  <v-btn
                    text
                    color="red"
                    @click="deleteEvent(selectedEvent.id)"
                  >
                    ลบการนัดหมาย
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-menu>
          </v-sheet>
        </v-col>
      </v-row>
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
          <div>เพิ่มข้อมูลการนัดหมาย</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>

              <v-col cols="12" sm="12" md="3">
                <v-text-field
                  label="ชื่อคนไข้"
                  required
                  v-model="form_data.medical_name"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="9">
                <v-radio-group v-model="form_data.color" row>
                  <v-radio
                    label="แพทย์ประจำโรงพยาบาล"
                    color="green"
                    value="green"
                  ></v-radio>
                  <v-radio
                    label="นัดติดตามอาการ"
                    color="indigo"
                    value="indigo"
                  ></v-radio>
                  <v-radio
                    label="นัดฉีดวัคซีน"
                    color="orange"
                    value="orange"
                  ></v-radio>
                  <v-radio
                    label="อื่นๆ"
                    color="red"
                    value="red"
                  ></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="รายละเอียดการนัดหมาย"
                  required
                  v-model="form_data.description"
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  offset-y
                  full-width
                  color="primary"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      name="date"
                      label="วัน เวลาเริ่ม"
                      type="text"
                      placeholder
                      v-model="form_data.start"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <div class="white">
                    <v-layout row wrap>
                      <v-flex class="text-center">
                        <v-date-picker
                          v-model="date.start"
                          width="260"
                          height="400"
                          color="primary"
                          locale="th"
                        ></v-date-picker>
                      </v-flex>

                      <v-flex class="text-center">
                        <v-time-picker
                          v-model="time.start"
                          color="primary"
                          width="260"
                          format="24hr"
                        ></v-time-picker>
                      </v-flex>

                      <v-flex xs12 class="text-center">
                        <v-btn small @click="menu = false" color="red"
                          >ยกเลิก</v-btn
                        >
                        <v-btn small @click="setDateStart" color="green"
                          >ตกลง</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6" md="6">
                <v-menu
                  ref="menu"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  lazy
                  offset-y
                  full-width
                  color="primary"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      name="date"
                      label="วัน เวลาสิ้นสุด"
                      type="text"
                      placeholder
                      v-model="form_data.end"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <div class="white">
                    <v-layout row wrap>
                      <v-flex class="text-center">
                        <v-date-picker
                          v-model="date.end"
                          width="260"
                          height="400"
                          color="primary"
                          locale="th"
                        ></v-date-picker>
                      </v-flex>

                      <v-flex class="text-center">
                        <v-time-picker
                          v-model="time.end"
                          color="primary"
                          width="260"
                          format="24hr"
                        ></v-time-picker>
                      </v-flex>

                      <v-flex xs12 class="text-center">
                        <v-btn small @click="menw2 = false" color="red"
                          >ยกเลิก</v-btn
                        >
                        <v-btn small @click="setDateend" color="green"
                          >ตกลง</v-btn
                        >
                      </v-flex>
                    </v-layout>
                  </div>
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
import * as AppointmentAPI from "../utils/appointmentAPI";
import moment from "../utils/moment";
export default {
  layout: "dashboard",
  middleware: "auth",
  data: () => ({
    focus: "",
    type: "month",
    typeToLabel: {
      month: "เดือน",
      week: "สัปดาห์",
      day: "วัน",
      "4day": "4 วัน"
    },
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: [],

    appointment_data: [],

    dialog_add: false,
    form_data: {},
    date: {
      start: null,
      end: null
    },
    time: {
      start: null,
      end: null
    },
    menu: false,
    menu2: false
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
    async fetch() {
      this.form_data = await {};
      const events = [];
      const response = await AppointmentAPI.getAllAppointment();
      await response.data.data.forEach(async e => {
        await events.push({
          id: e._id,
          name: e.medical_name,
          start: moment.fotmat_to_calendar(e.start),
          end: moment.fotmat_to_calendar(e.end),
          color: e.color,
          description: e.description
        });
      });

      this.events = await events;
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
    async updateRange({ start, end }) {
      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;
    },
    async add() {
      // console.log(this.form_data)
      this.form_data.start = await new Date(
        moment.format(this.form_data.start)
      );
      this.form_data.end = await new Date(moment.format(this.form_data.end));
      const respone = await AppointmentAPI.newAppoinrment(this.form_data);

      if (respone.data.success == true) {
        this.dialog_add = await false;
        await this.fetch();
      }
    },
    setDateStart() {
      this.form_data.start = `${this.date.start} ${this.time.start}`;
      this.menu = false;
    },
    setDateend() {
      this.form_data.end = `${this.date.end} ${this.time.end}`;
      this.menu2 = false;
    },
    async deleteEvent(id) {
      const respone = await AppointmentAPI.deleteAppoinrment(id);

      if (respone.data.success == true) {
        this.selectedOpen = await false;
        await this.fetch();
      }
    }
  }
};
</script>

<style>
#home {
  font-family: "Sarabun", sans-serif;
}
</style>
