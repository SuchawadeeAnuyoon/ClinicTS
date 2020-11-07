<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
    width="270"
  >
    <v-toolbar elevation="3" color="white" height="60">
      <v-row class="text-center mx-auto">
        <v-avatar size="36" color="white">
          <img src="/logo.jpg" alt />
        </v-avatar>
        <v-spacer></v-spacer>
        <div>
          <h1 class="text-center name-hospital">ท่าซุงคลินิกเวชกรรม</h1>
        </div>
      </v-row>
    </v-toolbar>
    <v-list nav expand>
      <v-list-item-group color="primary">
        <template>
          <!-- Overviews -->
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                ><div class="menu">หน้าแรก</div></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <!-- Overviews -->
          <v-list-item to="/medicalrecord">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                ><div class="menu">งานเวชระเบียน</div></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <!-- Overviews -->
          <v-list-item to="/medicalsupplies">
            <v-list-item-icon>
              <v-icon>mdi-pill</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title
                ><div class="menu">คลังเวชภัณฑ์</div></v-list-item-title
              >
            </v-list-item-content>
          </v-list-item>

          <!-- Group Hardware -->
          <v-list-group
            :value="true"
            no-action="no-action"
            prepend-icon="mdi-file-document-multiple"
          >
            <template v-slot:activator>
              <v-list-item-title
                ><div class="menu">งานทะเบียน</div></v-list-item-title
              >
            </template>

            <template>
              <v-list-item ripple="ripple" to="/registration/appointment">
                <v-list-item-title
                  ><div class="menu">ใบนัด</div></v-list-item-title
                >
              </v-list-item>

              <v-list-item ripple="ripple" to="/registration/certificate">
                <v-list-item-title
                  ><div class="menu">ใบรับรองแพทย์</div></v-list-item-title
                >
              </v-list-item>

              <v-list-item ripple="ripple" to="/registration/activereport">
                <v-list-item-title
                  ><div class="menu">
                    รายงานวัตถุออกฤทธิ์
                  </div></v-list-item-title
                >
              </v-list-item>
            </template>
          </v-list-group>

          <!-- Group Hardware -->
          <v-list-group no-action="no-action" prepend-icon="mdi-cog-sync" :value="true">
            <template v-slot:activator>
              <v-list-item-title
                ><div class="menu">ตั้งค่า</div></v-list-item-title
              >
            </template>

            <template>
              <v-list-item ripple="ripple" to="/setting/user.setting" v-if="me.role == 'admin'">
                <v-list-item-title
                  ><div class="menu">จัดการผู้ใช้</div></v-list-item-title
                >
              </v-list-item>

              <v-list-item ripple="ripple" to="/setting/account.setting">
                <v-list-item-title
                  ><div class="menu">ตั้งค่าบัญชี</div></v-list-item-title
                >
              </v-list-item>
            </template>
          </v-list-group>
        </template>
      </v-list-item-group>

      <v-spacer></v-spacer>

      <v-list-item class="mt-auto" @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            ><div class="menu">ออกจากระบบ</div></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      fixed: false,
      miniVariant: false,
      item: 0,
      me: {},
      name_role: ""
    };
  },
  computed: {
    drawer: {
      get() {
        return this.$store.state.drawer;
      },
      set(val) {
        this.$store.commit("drawer", val);
      }
    }
  },
  mounted() {
    this.fetch()
  },
  methods: {
    async fetch() {
      this.me = await this.$auth.user.data;
    },
    logout() {
      this.$auth.logout();
    }
  }
};
</script>
