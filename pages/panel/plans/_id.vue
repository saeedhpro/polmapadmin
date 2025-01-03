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
                <span class="account-form-title">{{ plan.title }}</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">اطلاعات پلن</span></v-tab>
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
                          v-model="plan.title"
                          :rules="plan.rules.title"
                          label="عنوان*"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="plan.coins"
                          :rules="plan.rules.coins"
                          label="تعداد سکه"
                          type="number"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="plan.portfolio_count"
                          :rules="plan.rules.portfolio_count"
                          label="تعداد نمونه کار"
                          type="number"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="plan.laddering_count"
                          :rules="plan.rules.laddering_count"
                          label="تعداد نردبان"
                          type="number"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="plan.star_count"
                          :rules="plan.rules.star_count"
                          label="تعداد ستاره"
                          type="number"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <custom-text-field-component
                          v-model="plan.image_upload_count"
                          :rules="plan.rules.image_upload_count"
                          label="محدودیت آپلود عکس"
                          type="number"
                        />
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <div class="d-flex flex-row justify-space-between mt-6">
                          <div class="placeholder">دارای تیک آبی</div>
                          <custom-toggle-component
                            v-model="plan.has_blue_tick"
                          />
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                      >
                        <div class="d-flex flex-row justify-space-between mt-6">
                          <div class="placeholder">دارای تخفیف</div>
                          <custom-toggle-component
                            v-model="plan.has_discount"
                          />
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        md="3"
                        v-if="plan.has_discount"
                      >
                        <custom-text-field-component
                          v-model="plan.discount_number"
                          label="درصد تخغیف"
                          type="number"
                        />
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                      >
                        <div class="account-form-action-box">
                          <button class="account-form-action main-btn" @click="updatePlan">
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
      plan: {
        id: 0,
        title: '',
        coins: 0,
        portfolio_count: 0,
        laddering_count: 0,
        star_count: 0,
        image_upload_count: 0,
        discount_number: 0,
        has_blue_tick: false,
        has_discount: false,
        rules: {
          title: [val => (val || '').length > 0 || 'لطفا عنوان را وارد کنید'],
        }
      },
    }
  },
  mounted() {
    this.getPlan()
  },
  methods: {
    getPlan() {
      this.$store.dispatch('plan/getPlan', this.$route.params.id)
        .then(res => {
          const plan = res.data.data
          this.setPlan(plan)
        })
    },
    setPlan(plan) {
      this.plan = {
        id: plan.id,
        title: plan.title,
        coins: plan.coins,
        portfolio_count: plan.portfolio_count,
        laddering_count: plan.laddering_count,
        star_count: plan.star_count,
        image_upload_count: plan.image_upload_count,
        has_discount: plan.has_discount,
        has_blue_tick: plan.has_blue_tick,
        discount_number: plan.discount_number,
        rules: {
          title: [val => (val || '').length > 0 || 'لطفا عنوان را وارد کنید'],
        }
      }
    },
    updatePlan() {
      this.loading = true
      const data = {
        ...this.plan,
      }
      this.$store.dispatch('plan/updatePlan', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/plans')
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
