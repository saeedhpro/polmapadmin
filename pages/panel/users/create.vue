<template>
  <main class="account account-page" :class="{'mini': mini}">
    <v-container fluid>
      <v-row>
        <v-col
          cols="12"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">افزودن کاربر</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-row>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.full_name"
                    :rules="user.rules.full_name"
                    label="نام و نام خانوادگی*"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-auto-complete-component
                    v-model="user.role_id"
                    :label="'نقش کاربری*'"
                    :items="roles"
                    :returnObject="false"
                    :item-text="'name'"
                    :item-value="'id'"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.email"
                    :rules="user.rules.email"
                    label="پست الکترونیک"
                    type="mail"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.phone_number"
                    :rules="user.rules.phone_number"
                    label="شماره تلفن همراه*"
                    type="tel"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.password"
                    :rules="user.rules.password"
                    label="رمز عبور*"
                    type="password"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-date-picker
                    :label="`تاریخ تولد`"
                    :disable-past="false"
                    v-model="user.birth_date"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.sheba"
                    label="شماره شبا برای بازگرداندن وجه"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.national_code"
                    label="کد ملی"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="4"
                >
                  <custom-text-field-component
                    v-model="user.job"
                    label="شغل"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <div class="account-form-action-box">
                    <button class="account-form-action main-btn" @click="createUser">افزودن</button>
                  </div>
                </v-col>
              </v-row>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomDatePicker from "~/components/form/CustomDatePicker";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";

export default {
  name: "index.vue",
  components: {CustomAutoCompleteComponent, CustomDatePicker, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      user: {
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        birth_date: '',
        sheba: '',
        national_code: '',
        job: '',
        is_legal: false,
        role_id: null,
        rules: {
          full_name: [val => (val || '').length > 0 || 'لطفا نام و نام خانوادگی کاربر را وارد کنید'],
          email: [val => (val || '').length > 0 || 'لطفا پست الکترونیک کاربر را وارد کنید'],
          phone_number: [val => (val || '').length > 0 || 'لطفا شماره تلفن همراه کاربر را وارد کنید'],
          password: [val => (val || '').length > 0 || 'لطفا پسورد کاربر را وارد کنید'],
        }
      },
      roles: [
        {
          id: 1,
          name: 'ادمین'
        },
        {
          id: 2,
          name: 'مشتری'
        }
      ]
    }
  },
  methods: {
    createUser() {
      if (this.validateUser()) {
        this.$store.dispatch('user/createUser', this.user)
          .then(res => {
            this.$toast.success('با موفقیت ثبت شد')
            this.$router.go(-1)
          })
          .catch(err => {
            console.log(err, "err")
            if(err.response) {
              console.log(err.response)
              const errors = err.response.data.errors
              for (const e in errors) {
                console.log(e, "e")
                this.$toast.error(errors[e][0])
              }
            }
          })
      }
    },
    validateUser() {
      let validated = true
      if (!this.user.full_name) {
        validated = false
      }
      if (!this.user.role_id) {
        validated = false
      }
      if (!this.user.phone_number) {
        validated = false
      }
      if (!this.user.password) {
        validated = false
      }
      return validated
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
  }
}
</script>

<style scoped>

</style>
