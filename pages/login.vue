<template>
  <v-app>
    <v-main>
      <div class="bg">
        <div class="bg-color">
          <v-container fluid fill-height>
            <v-layout align-center justify-center>
              <v-flex xs12 sm8 md4 lg4>
                <v-card class="elevation-5 pa-3">
                  <v-form @submit.prevent="login">
                    <v-card-text>
                      <div>
                        <v-text-field
                          prepend-icon="mdi-person"
                          name="email"
                          label="อีเมล"
                          type="text"
                          v-model="model.email"
                        ></v-text-field>
                        <v-text-field
                          :prepend-icon="
                            isShowPassword
                              ? 'mdi-visibility_off'
                              : 'mdi-visibility'
                          "
                          @click:append="isShowPassword = !isShowPassword"
                          name="password"
                          label="รหัสผ่าน"
                          id="password"
                          :type="isShowPassword ? 'text' : 'password'"
                          v-model="model.password"
                        ></v-text-field>
                        <v-alert v-if="error" type="warning" :value="true">{{
                          error
                        }}</v-alert>
                      </div>
                    </v-card-text>
                    <br />
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        block
                        color="primary"
                        type="submit"
                        :loading="loading"
                        >เข้าสู่ระบบ</v-btn
                      >
                    </v-card-actions>
                    <!-- <br />
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <nuxt-link color="primary" to="/forgot"
                        >ลืมรหัสผ่าน</nuxt-link
                      >
                    </v-card-actions> -->
                  </v-form>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </div>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      error: "",
      isShowPassword: false,
      model: {
        email: "",
        password: ""
      },
      loginSuccess: false,
      terms: [],
      termSelectAll: false
    };
  },
  mounted() {},
  methods: {
    async login() {
      this.model.email = this.model.email ? this.model.email.toLowerCase() : "";

      let self = this;

      const res = await self.$store.dispatch("me/login", {
        email: self.model.email,
        password: self.model.password
      });



      if (res instanceof Error) {
        self.$toast.open({
          message: res.response.data.errMessage,
          type: "error",
          duration: 6000
        });
      } else {
        self.$toast.open({
          message: 'เข้าสู่ระบบสำเร็จ',
          type: "success",
          duration: 6000
        });
        self.$router.push({ path: "home" });
      }

      // try {
      //   let response = await this.$auth.loginWith("local", {
      //     data: this.model
      //   });

      //   this.$router.push({ path: "home" });
      // } catch (err) {
      //   console.log(err);
      // }
    }
  }
};
</script>
