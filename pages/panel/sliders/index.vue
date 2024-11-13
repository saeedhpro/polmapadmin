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
                <span class="account-form-title">{{ slider.main_title }}</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-row>
                <v-col
                  cols="12"
                  md="3"
                >
                  <custom-text-field-component
                    v-model="slider.main_title"
                    label="عنوان*"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <custom-text-field-component
                    v-model="slider.sub_title"
                    label="زیر عنوان*"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <custom-text-field-component
                    v-model="slider.link_title"
                    label="عنوان دکمه*"
                  />
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <custom-text-field-component
                    v-model="slider.link_url"
                    label="لینک دکمه*"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <custom-text-area-component
                    v-model="slider.description"
                    label="توضیحات*"
                  />
                </v-col>
                <v-col
                  cols="12"
                >
                  <div class="placeholder">تصویر اسلاید</div>
                  <custom-image-select-component
                    @uploaded="uploaded"
                    :width="'100%'"
                    :height="'50%'"
                    :thumbnail="slider.image"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col
                  cols="12"
                >
                  <div class="account-form-action-box">
                    <button class="account-form-action main-btn" @click="updateSlider">
                      <loading v-if="loading"/>
                      <span v-else>ویرایش</span>
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
import CustomTextAreaComponent from "~/components/form/CustomTextAreaComponent.vue";
import CustomImageSelectComponent from "~/components/form/CustomImageSelectComponent.vue";

export default {
  name: "index",
  components: {
    CustomImageSelectComponent,
    CustomTextAreaComponent,
    CustomToggleComponent, CustomDatePicker, CustomAutoCompleteComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      loading: false,
      tab: 0,
      slider: {
        id: 0,
        image: '',
        main_title: '',
        sub_title: '',
        description: '',
        link_url: '',
        link_title: '',
      },
    }
  },
  mounted() {
    this.getSlider()
  },
  methods: {
    getSlider() {
      this.$store.dispatch('slider/getSliders', {})
        .then(res => {
          const slider = res.data.data
          this.setSlider(slider)
        })
    },
    setSlider(slider) {
      this.slider = {
        id: slider.id,
        image: slider.image,
        main_title: slider.main_title,
        sub_title: slider.sub_title,
        description: slider.description,
        link_url: slider.link_url,
        link_title: slider.link_title,
      }
    },
    updateSlider() {
      this.loading = true
      const data = {
        ...this.slider,
      }
      this.$store.dispatch('slider/updateSlider', data)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.$router.push('/panel/sliders')
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
          setTimeout(() => {
            this.loading = false
          }, 500)
        })
    },
    uploaded(res) {
      this.slider.image = res.url
    },
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
