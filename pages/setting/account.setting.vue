<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-card-title>
          <div>ตั้งค่าบัญชี</div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              v-if="read"
              small
              outlined
              color="blue lighten-2"
              @click="edit('edit')"
              >แก้ไข</v-btn
            >
            <v-btn
              v-if="!read"
              small
              outlined
              color="grey darken-2"
              @click="edit('cancel')"
              >ยกเลิก</v-btn
            >
            <!-- <v-btn
              v-if="!read"
              small
              outlined
              color="red"
              @click="edit('delete')"
              >ลบบัญชี</v-btn
            > -->
            <v-btn
              v-if="!read"
              small
              outlined
              color="green lighten-2"
              @click="edit('save')"
              >บันทึก</v-btn
            >
          </div>
        </v-card-title>
        <v-card-text>

          <v-divider class="my-3"></v-divider>

          <div>
            <v-container>
              <v-row>
                <v-col cols="12" sm="2" md="2">
                  <v-text-field
                    label="คำนำหน้าชื่อ"
                    v-model="me.title"
                    :readonly="read"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="5">
                  <v-text-field
                    label="ชื่อ"
                    v-model="me.first"
                    :readonly="read"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="5">
                  <v-text-field
                    label="นามสกุล"
                    v-model="me.last"
                    :readonly="read"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    label="เลขที่ใบประกอบวิชาชีพเวชกรรม"
                    v-model="me.doctor_id"
                    :readonly="read"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    label="อีเมล"
                    v-model="me.email"
                    :readonly="read"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-text-field
                    label="หมายเลขโทรศัพท์"
                    v-model="me.phone"
                    :readonly="read"
                  ></v-text-field>
                </v-col>

                <v-col cols="12" sm="4">
                  <v-btn
                    small
                    v-if="!btn_change"
                    color="blue lighten-2"
                    @click="btn_change = true"
                    >เปลี่ยนรหัสผ่าน</v-btn
                  >
                  <div class="my-3" v-if="btn_change">
                    <v-text-field
                      v-model="password_old"
                      :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.min]"
                      :type="show1 ? 'text' : 'password'"
                      label="รหัสผ่านเดิม"
                      @click:append="show1 = !show1"
                    ></v-text-field>

                    <v-text-field
                      v-model="password_new"
                      :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.min]"
                      :type="show2 ? 'text' : 'password'"
                      label="รหัสผ่านใหม่"
                      @click:append="show2 = !show2"
                    ></v-text-field>

                    <v-text-field
                      v-model="password_confirm"
                      :append-icon="show3 ? 'mdi-eye' : 'mdi-eye-off'"
                      :rules="[rules.min, rules.check]"
                      :type="show3 ? 'text' : 'password'"
                      label="ยืนยันรหัสผ่านใหม่"
                      @click:append="show3 = !show3"
                    ></v-text-field>

                    <v-row>
                      <v-col>
                        <v-btn small color="grey" @click="btn_change = false"
                          >ยกเลิก</v-btn
                        >
                        <v-btn
                          small
                          :disabled="match"
                          color="success"
                          @click="changePassword()"
                          >เปลี่ยนรหัสผ่าน</v-btn
                        >
                      </v-col>
                    </v-row>
                  </div>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-card-text>
      </v-card>
    </v-container>

    <v-dialog v-model="dialog_loading" width="200">
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

  </div>
</template>

<script>
import * as UserAPI from "../../utils/userAPI";
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      me: {},
      read: true,
      btn_change: false,
      password_old: "",
      password_new: "",
      password_confirm: "",
      show1: false,
      show2: false,
      show3: false,
      rules: {
        min: v => v.length >= 8 || "รหัสผ่านสั้นเกินไปต้องอย่างน้อย 8 ตัวอักษร",
        check: () =>
          this.password_new == this.password_confirm || "รหัสผ่านไม่ตรงกัน"
      },
      dialog_loading: false
    };
  },
  computed: {
    match() {
      if (this.password_new != this.password_confirm) {
        return true;
      } else if (this.password_new.length < 8 || this.password_confirm < 8) {
        return true;
      } else if (this.password_old.length < 8) {
        return true;
      } else {
        return false;
      }
    },
    rules_match() {
      if (this.password_new != this.password_confirm) {
        return true;
      }
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    async fetch() {
      // const response = await UserAPI.getMe()
      this.me = this.$store.getters["me/getUser"]
      // console.log(this.me)
    },
    edit(status) {
      if (status == "edit") {
        this.read = false;
      }

      if (status == "cancel") {
        this.read = true;
      }

      if (status == "save") {
        this.saveEdit();
      }
    },
    async saveEdit() {
      this.dialog_loading = await true;
      let form = await {
        title: this.me.title,
        first: this.me.first,
        last: this.me.last,
        email: this.me.email,
        doctor_id: this.me.doctor_id,
        phone: this.me.phone
      }

      await this.$api.updateMe(form)
        .then(response => {
          this.$toast.open({
            message: "แก้ไขข้อมูลสำเร็จ",
            type: "success",
            duration: 6000
          });

          this.$store.dispatch("me/me")
          this.fetch()
          this.dialog_loading = false
          this.read = true
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: "success",
            duration: 6000
          });
        })
    },
    async changePassword() {
      this.dialog_loading = true
      let form = {};
      form = {
        currentPassword: this.password_old,
        newPassword: this.password_new
      };

      await this.$api.changePassword(form)
        .then(response => {
          this.$toast.open({
            message: "เปลี่ยนหรัสผ่านสำเร็จ",
            type: "success",
            duration: 6000
          });
          this.dialog_loading = false
          this.fetch()
        })
        .catch(error => {
          this.$toast.open({
            message: error.response.data.errMessage,
            type: "success",
            duration: 6000
          });
          this.dialog_loading = false
        })
    }
  }
};
</script>
