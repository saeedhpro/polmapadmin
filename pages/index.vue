<template>
  <div class="login-box mx-auto">
    <v-card
      class="form-box"
    >
      <v-card-title>
        <div class="header-box">
          ورود پنل ادمین
        </div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col
              cols="12"
            >
              <custom-text-field-component
                v-model="login.phone_number"
                :rules="login.rules.phone_number"
                label="شماره موبایل"
                type="tel"
                name="username"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <custom-text-field-component
                v-model="login.password"
                :rules="login.rules.password"
                label="رمز عبور"
                type="password"
                dir="rtl"
              />
            </v-col>
            <v-col
              cols="12"
            >
              <button
                :disabled="loginDisabled"
                class="button primary-button"
                @click="doLogin"
              >ورود
              </button>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
export default {
  name: "index.vue",
  middleware: "guest",
  components: {CustomTextFieldComponent},
  data() {
    return {
      isPassword: true,
      login: {
        phone_number: '',
        password: '',
        rules: {
          phone_number: [val => (val || '').length > 0 || 'لطفا شماره موبایل خود را وارد کنید'],
          password: [val => (val || '').length > 0 || 'لطفا رمز عبور خود را وارد کنید'],
        }
      },
    }
  },
  methods: {
    toggleIsPassword() {
      this.isPassword = !this.isPassword
    },
    doLogin() {
      this.$store.dispatch('login/login', this.login)
        .then(() => {
          this.$router.push({
            path: '/panel'
          })
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            const keys = Object.keys(err.response.data.errors)
            for (let i = 0; i < keys.length; i++) {
              this.$toast.error(errors[keys[i]][0])
            }
          }
        })
    },
  },
  computed: {
    loginDisabled() {
      return this.login.phone_number === '' && this.login.password === ''
    },
  }
}
</script>

<style scoped>

</style>
