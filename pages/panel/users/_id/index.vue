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
                          label="نام و نام خانوادگی"
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
                          :disabled="true"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="4"
                      >
                        <custom-auto-complete-component
                          v-model="user.roles"
                          :label="'نقش کاربری*'"
                          :items="roles"
                          name="role"
                          :returnObject="true"
                          :item-text="'name'"
                          :item-value="'name'"
                          :multiple="true"
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
                          v-model="user.coins"
                          label="سکه"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <div class="account-form-action-box">
                          <button class="account-form-action main-btn" @click="updateUser">
                            <loading v-if="loading"/>
                            <span v-else>ویرایش</span>
                          </button>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
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
      loading: false,
      tab: 0,
      user: {
        id: 0,
        coins: 0,
        full_name: '',
        email: '',
        phone_number: '',
        password: '',
        birth_date: '',
        sheba: '',
        national_code: '',
        roles: null,
        rules: {
          email: [val => (val || '').length > 0 || 'لطفا پست الکترونیک کاربر را وارد کنید'],
        }
      },
      roles: [
        {
          id: 'admin',
          name: 'ادمین',
        },
        {
          id: 'marketer',
          name: 'بازاریاب'
        }
      ]
    }
  },
  mounted() {
    this.getUser()
    this.getRoles()
  },
  methods: {
    getUser() {
      this.$store.dispatch('user/getUser', this.$route.params.id)
        .then(res => {
          const user = res.data.data
          this.setUser(user)
        })
    },
    getRoles() {
      this.$store.dispatch('user/getRoles')
        .then(res => {
          this.roles = res.data
        })
    },
    setUser(user) {
      const roles = user.roles.map(function (i) {
        return {
          id: i,
          name: i,
        }
      })
      this.user = {
        id: user.id,
        coins: user.coins,
        full_name: user.full_name,
        email: user.email,
        phone_number: user.phone_number,
        password: '',
        birth_date: user.birth_date,
        national_code: user.national_code,
        roles: roles,
        rules: {
          email: [val => (val || '').length > 0 || 'لطفا پست الکترونیک کاربر را وارد کنید'],
        }
      }
    },
    updateUser() {
      this.loading = true
      const data = {
        ...this.user,
        roles: this.user.roles.map(i => i.name)
      }
      this.$store.dispatch('user/updateUser', data)
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
        .finally(() => {
          this.loading = false
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
