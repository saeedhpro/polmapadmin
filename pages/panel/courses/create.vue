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
                <span class="account-form-title">آموزش جدید</span>
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
                    v-model="course.title"
                    :rules="course.rules.title"
                    label="عنوان*"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <editor-component
                    placeholder="متن آموزش"
                    v-model="course.body"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <div class="account-form-action-box">
                    <button class="account-form-action main-btn" @click="createCourse">
                      <loading v-if="loading"/>
                      <span v-else>ثبت</span>
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
      course: {
        id: 0,
        title: '',
        coins: 0,
        portfolio_count: 0,
        laddering_count: 0,
        star_count: 0,
        image_upload_count: 0,
        has_discount: false,
        rules: {
          title: [val => (val || '').length > 0 || 'لطفا عنوان را وارد کنید'],
        }
      },
    }
  },
  methods: {
    createCourse() {
      this.loading = true
      const data = {
        ...this.course,
      }
      this.$store.dispatch('course/createCourse', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/courses')
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
