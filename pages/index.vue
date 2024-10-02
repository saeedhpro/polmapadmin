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
                v-model="login.email"
                :rules="login.rules.email"
                label="ایمیل"
                type="email"
                name="email"
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
      loading: false,
      login: {
        email: '',
        password: '',
        rules: {
          email: [val => (val || '').length > 0 || 'لطفا ایمیل خود را وارد کنید'],
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
      this.loading = true
      this.$store.dispatch('login/login', this.login)
        .then((res) => {
          this.$router.replace('/panel')
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
        .finally(() => this.loading = false)
    },
  },
  computed: {
    loginDisabled() {
      return (this.login.email === '' && this.login.email === '') || this.loading
    },
  }
}
</script>

<style scoped>

</style>
