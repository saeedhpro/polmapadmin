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
                <span class="account-form-title">ثبت اشتراک جدید</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">اطلاعات اشتراک</span></v-tab>
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
                          v-model="subscription.title"
                          :rules="subscription.rules.title"
                          label="عنوان*"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="subscription.period"
                          :rules="subscription.rules.period"
                          label="تعداد ماه"
                          type="number"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="subscription.price"
                          :rules="subscription.rules.price"
                          label="قیمت"
                          type="number"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <div class="account-form-action-box">
                          <button class="account-form-action main-btn" @click="createSubscription">
                            <loading v-if="loading"/>
                            <span v-else>ثبت</span>
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
      subscription: {
        id: 0,
        title: '',
        period: 0,
        price: 0,
        rules: {
          title: [val => (val || '').length > 0 || 'لطفا عنوان را وارد کنید'],
          period: [val => (val || 0) > 0 || 'لطفا تعداد ماه را وارد کنید'],
          price: [val => (val || 0) > 0 || 'لطفا قیمت را وارد کنید'],
        }
      },
    }
  },
  methods: {
    createSubscription() {
      this.loading = true
      const data = {
        ...this.subscription,
      }
      this.$store.dispatch('subscription/createSubscription', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/subscriptions')
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
