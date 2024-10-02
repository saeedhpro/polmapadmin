<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="768px"
  >
    <v-card
      class="create-update-modal"
    >
      <v-card-title
        class="create-update-modal-title-box"
      >
        <div class="create-update-modal-title">
          <button
            @click="closeForm"
            class="create-update-modal-close"
          >
            <v-icon>mdi-close</v-icon>
          </button>
          <span>ایجاد اسلایدر</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="slider.title"
              :label="'عنوان'"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <div class="d-flex flex-row justify-space-between mt-6">
              <div class="placeholder">وضعیت</div>
              <custom-toggle-component
                v-model="slider.is_active"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="slider.link"
              :label="'لینک'"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="slider.link_title"
              :label="'عنوان لینک'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <div class="placeholder">تصویر</div>
            <custom-image-select-component
              height="240px"
              @uploaded="uploaded"
              v-if="open"
            />
          </v-col>
          <v-col
            cols="12"
          >
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-spacer/>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click="reset"
                  class="account-form-action second-btn"
                >
                  پاک کردن
                </button>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click="create"
                  class="account-form-action main-btn"
                >
                  ایجاد
                </button>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomToggleComponent from "~/components/form/CustomToggleComponent";
import CustomImageSelectComponent from "~/components/form/CustomImageSelectComponent.vue";

export default {
  name: "CreateSliderComponent.vue",
  components: {
    CustomImageSelectComponent,
    CustomToggleComponent,  CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: true,
      slider: {
        title: '',
        image: '',
        link: '',
        link_title: '',
        description: '',
        is_active: true,
      },
    }
  },
  mounted() {
    setTimeout(() => {
      this.loading = false
    }, 100)
  },
  methods: {
    closeForm() {
      this.reset()
      this.$emit('close')
    },
    reset() {
      this.slider = {
        title: '',
        image: '',
        link: '',
        link_title: '',
        description: '',
        is_active: true,
      }
    },
    create() {
      this.$store.dispatch('slider/createSlider', this.slider)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.closeForm()
          this.reset()
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            for (const e in errors) {
              this.$toast.error(errors[e][0])
            }
          }
        })
    },
    uploaded(res) {
      this.slider.image = res.url
    },
  },
  computed: {
    show() {
      return this.open;
    },
  },
}
</script>

<style scoped>

</style>
