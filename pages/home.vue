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
                >เพิ่ม</v-btn
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
              :event-color="events.color"
              :type="type"
              @click:event="showEvent"
              @click:more="viewDay"
              @click:date="viewDay"
              @change="updateRange"
            ></v-calendar>
            <v-menu
              v-model="selectedOpen"
              :close-on-content-click="false"
              :activator="selectedElement"
              offset-x
            >
              <v-card color="grey lighten-4" min-width="350px" flat>
                <v-toolbar :color="selectedEvent.color" dark>
                  <v-btn icon>
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-toolbar-title
                    v-html="selectedEvent.name"
                  ></v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                  <span>{{ selectedEvent }}</span>
                </v-card-text>
                <v-card-actions>
                  <v-btn text color="secondary" @click="selectedOpen = false">
                    Cancel
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
          <div>เพิ่มข้อมูลเวชภัณฑ์</div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="ชื่องาน"
                  required
                  v-model="form_data.name"
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  label="รายละเอียด"
                  required
                  v-model="form_data.description"
                  dense
                ></v-text-field>
              </v-col>

              <v-col cols="12" sm="12" md="12">
                <v-radio-group v-model="form_data.color" row>
                  <v-radio label="red" color="red" value="red"></v-radio>
                  <v-radio
                    label="indigo"
                    color="indigo"
                    value="indigo"
                  ></v-radio>
                  <v-radio
                    label="orange"
                    color="orange"
                    value="orange"
                  ></v-radio>
                </v-radio-group>
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
                      label="วันเวลาเริ่ม"
                      type="text"
                      placeholder
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>

                  <div class="white">
                    <v-layout row wrap>
                        <v-date-picker
                          v-model="date.start"
                          width="260"
                          height="400"
                          color="primary"
                          locale="th"
                        ></v-date-picker>
                        <v-time-picker
                          v-model="time.start"
                          color="primary"
                          width="260"
                          format="24hr"
                        ></v-time-picker>

                      <v-flex xs12 class="text-center">
                        <v-btn small @click="menu = false" color="red"
                          >ยกเลิก</v-btn
                        >
                        <!-- <v-btn flat small @click="setDate">ตกลง</v-btn> -->
                      </v-flex>
                    </v-layout>
                  </div>
                </v-menu>
              </v-col>

              <!-- <v-col cols="12" sm="6" md="4">
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
              </v-col> -->
            </v-row>
          </v-container>
        </v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog_add = false">
            ยกเลิก
          </v-btn>
          <v-btn color="blue darken-1" text @click="add">
            บันทึก
          </v-btn>
        </v-card-actions> -->
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
    menu: false
  }),
  mounted() {
    this.$refs.calendar.checkChange();
  },
  methods: {
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
      const events = [];

      const min = new Date(`${start.date}T00:00:00`);
      const max = new Date(`${end.date}T23:59:59`);
      const days = (max.getTime() - min.getTime()) / 86400000;

      const response = await AppointmentAPI.getAllAppointment();
      await response.data.data.forEach(async e => {
        await events.push({
          name: e.name,
          start: moment.fotmat_to_calendar(e.start),
          end: moment.fotmat_to_calendar(e.end),
          color: e.color
        });
      });

      this.events = await events;
    }
  }
};
</script>

<style>
#home {
  font-family: "Sarabun", sans-serif;
}
</style>
