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
                <span class="account-form-title">تنظیمات دشت</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-field-component
                    v-model="form.api_key"
                    :rules="form.rules.api_key"
                    label="GUID"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-area-component
                    v-model="form.enemad"
                    label="کد اینماد"
                    :rows="4"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-area-component
                    v-model="form.samandehi"
                    label="کد ساماندهی"
                    :rows="4"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-area-component
                    v-model="form.etehadie"
                    label="کد عضویت در اتحادیه"
                    :rows="4"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <div class="account-form-action-box">
                    <button class="account-form-action main-btn" @click="update">
                      <span v-if="loading" class="d-flex flex-row justify-center align-center">
                        <v-progress-circular color="#fff" indeterminate/>
                      </span>
                      <span v-else style="color: #fff">ثبت</span>
                    </button>
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
import CustomTextAreaComponent from "~/components/form/CustomTextAreaComponent.vue";

export default {
  name: "index.vue",
  components: {CustomTextAreaComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      loading: false,
      form: {
        api_key: '',
        enemad: '',
        samandehi: '',
        etehadie: '',
        refresh_token: '',
        rules: {
          api_key: [val => (val || '').length > 0 || 'لطفا کلید guid را وارد کنید'],
        }
      },
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      this.$store.dispatch('settings/getSettings')
          .then(res => {
            const data = res.data.data
            this.form.api_key = data.api_key
            this.form.enemad = data.enemad
            this.form.samandehi = data.samandehi
            this.form.etehadie = data.etehadie
            this.form.access_token = data.access_token
            this.form.refresh_token = data.refresh_token
          })
    },
    update() {
      this.loading = true
      this.$store.dispatch('settings/updateSettings', this.form)
        .then(() => {
          // this.$router.go(-1)
          this.getSettings()
          this.loading = false
          this.$toast.success('با موفقیت انجام شد')
        })
          .catch(err => {
              if(err.response) {
                  const errors = err.response.data.errors
                  for (const e in errors) {
                      this.$toast.error(errors[e][0])
                  }
              }
            this.loading = false
          })
    },
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
