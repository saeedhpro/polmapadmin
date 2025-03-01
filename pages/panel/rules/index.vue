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
                <span class="account-form-title">قوانین و مقررات</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-row>
                <v-col
                  cols="12"
                >
                  <editor-component
                    placeholder="قوانین"
                    v-model="form.rule"
                    v-if="!loading"
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
        rule: ''
      },
    }
  },
  mounted() {
    this.getSettings()
  },
  methods: {
    getSettings() {
      this.loading = true
      this.$store.dispatch('settings/getSettings')
          .then(res => {
            const data = res.data
            this.form.rule = data.rule
          })
          .finally(() => {
            setTimeout(() => {
              this.loading = false
            }, 100)
          })
    },
    update() {
      this.loading = true
      this.$store.dispatch('settings/updateRules', this.form)
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
