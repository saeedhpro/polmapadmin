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
                <span class="account-form-title">{{ user.full_name }}</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">اطلاعات کاربری</span></v-tab>
                <v-tab><span class="v-tab-title">سفارشات</span></v-tab>
              </v-tabs>
              <v-tabs-items
                v-model="tab"
                touchless
              >
                <v-tab-item>
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
                          name="role"
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
                          label="رمز عبور"
                          type="password"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                      >
                        <custom-date-picker
                          :label="`تاریخ تولد`"
                          :initial-value="user.birth_date"
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
                          <button class="account-form-action main-btn" @click="updateUser">ویرایش</button>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <user-orders-list-component
                    :user-id="user.id"
                  />
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomDatePicker from "~/components/form/CustomDatePicker";
import UserOrdersListComponent from "~/components/user/UserOrdersListComponent";

export default {
  name: "index",
  components: {UserOrdersListComponent, CustomDatePicker, CustomAutoCompleteComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      tab: 0,
      user: {
        id: 0,
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
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$store.dispatch('user/getUser', this.$route.params.id)
        .then(res => {
          const user = res.data.data
          this.setUser(user)
        })
    },
    setUser(user) {
      this.user = {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        password: '',
        birth_date: user.birth_date,
        sheba: user.sheba,
        national_code: user.national_code,
        job: user.job,
        is_legal: user.is_legal,
        role_id: user.role ? user.role.id : null,
        rules: {
          full_name: [val => (val || '').length > 0 || 'لطفا نام و نام خانوادگی کاربر را وارد کنید'],
          email: [val => (val || '').length > 0 || 'لطفا پست الکترونیک کاربر را وارد کنید'],
          phone_number: [val => (val || '').length > 0 || 'لطفا شماره تلفن همراه کاربر را وارد کنید'],
        }
      }
    },
    updateUser() {
      this.$store.dispatch('user/updateUser', this.user)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/users')
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            for (const e in errors) {
              this.$toast.error(errors[e][0])
            }
          }
        })
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
