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
                <span class="account-form-title">تنظیمات</span>
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
                    v-model="form.own"
                    label="درصد به خود شخص"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-field-component
                    v-model="form.first"
                    label="درصد به سطح اول"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-field-component
                    v-model="form.second"
                    label="درصد به سطح دوم"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-field-component
                    v-model="form.third"
                    label="درصد به سطح سوم"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <custom-text-field-component
                    v-model="form.forth"
                    label="درصد به سطح چهارم"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div class="d-flex flex-row justify-space-between mt-6">
                    <div class="placeholder">فعال سازی قفل پنل</div>
                    <custom-toggle-component
                      v-model="form.lock_all"
                    />
                  </div>
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
import CustomToggleComponent from "~/components/form/CustomToggleComponent.vue";

export default {
  name: "index.vue",
  components: {CustomToggleComponent, CustomTextAreaComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      loading: false,
      form: {
        own: 0,
        first: 0,
        second: 0,
        third: 0,
        forth: 0,
        lock_all: false,
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
            const data = res.data
            this.form.own = data.own
            this.form.first = data.first
            this.form.second = data.second
            this.form.third = data.third
            this.form.forth = data.forth
            this.form.lock_all = data.lock_all
          })
    },
    update() {
      this.loading = true
      if (this.all > 100) {
        this.$toast.error("مجموع درصد ها نمی تواند بیشتر از 100 باشد")
        this.loading = false
        return
      }
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
    all() {
      return parseFloat(this.form.own) +
        parseFloat(this.form.first) +
        parseFloat(this.form.second) +
        parseFloat(this.form.third) +
        parseFloat(this.form.forth);
    },
  }
}
</script>

<style scoped>

</style>
