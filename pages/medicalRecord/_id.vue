<template>
  <div>
    <v-container fluid>
      <v-card>
        <v-toolbar>
          <v-toolbar-title>ข้อมูลเวรระเบียน</v-toolbar-title>
        </v-toolbar>

        <div>
          <template>
            <v-container>
              <v-col>
                <div>ข้อมูลคนไข้</div>
                <v-divider class="mt-3"></v-divider>
                <v-row>
                  <v-col cols="12" md="2">
                    <v-text-field
                      name="title"
                      label="คำนำหน้า"
                      v-model="medical_record_data.title"
                      disabled
                      color="black"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-col>
            </v-container>
          </template>
        </div>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import * as MedicalRecordAPI from "../../utils/medicalRecordAPI";
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
      medical_record_data: {}
    };
  },
  mounted() {
    this.fecth();
  },
  methods: {
    async fecth() {
      const response = await MedicalRecordAPI.getOneMedicalRecord(this.id);
      this.medical_record_data = await response.data.data;
    }
  }
};
</script>
