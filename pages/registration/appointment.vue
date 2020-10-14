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
              <v-col cols="12" sm="6" md="12">

                <v-text-field
                  label="ชื่อยาทางการแพทย์"
                  required
                  v-model="form.header"
                ></v-text-field>

              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="add">
            บันทึก
          </v-btn>
        <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Appoinment_pdf from '../../utils/appoinment_pdf'
export default {
  layout: "dashboard",
  middleware: "auth",
  data() {
    return {
      form: {}
    }
  },
  mounted() {},
  methods: {
    add() {
      Appoinment_pdf.Appoinment(this.form)
    }
  }
};
</script>
