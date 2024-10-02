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
                <span class="account-form-title">{{ application.app_name }}</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">اطلاعات برنامه</span></v-tab>
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
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="application.app_name"
                          label="نام برنامه*"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="application.app_id"
                          label="آی دی برنامه*"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="6"
                      >
                        <custom-text-field-component
                          v-model="application.app_link"
                          label="لینک برنامه*"
                          type="url"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <div class="account-form-action-box">
                          <button class="account-form-action main-btn" @click="updateApplication">
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
import CustomToggleComponent from "~/components/form/CustomToggleComponent.vue";

export default {
  name: "index",
  components: {CustomToggleComponent, CustomDatePicker, CustomAutoCompleteComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      loading: false,
      tab: 0,
      application: {
        id: 0,
        app_name: '',
        app_id: '',
        app_link: '',
      },
    }
  },
  mounted() {
    this.getApplication()
  },
  methods: {
    getApplication() {
      this.$store.dispatch('application/getApplication', this.$route.params.id)
        .then(res => {
          const application = res.data.data
          this.setApplication(application)
        })
    },
    setApplication(application) {
      this.application = {
        id: application.id,
        app_name: application.app_name,
        app_id: application.app_id,
        app_link: application.app_link,
      }
    },
    updateApplication() {
      this.loading = true
      const data = {
        ...this.application,
      }
      this.$store.dispatch('application/updateApplication', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/applications')
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
