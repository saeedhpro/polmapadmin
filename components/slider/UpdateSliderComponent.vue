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
          <span>ویرایش اسلایدر</span>
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
              :thumbnail="slider.image"
              v-if="!loading && open"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <editor-component
              placeholder="توضیحات"
              class="small"
              v-model="slider.description"
              v-if="!loading"
            />
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
                  @click="update"
                  class="account-form-action main-btn"
                >
                  ویرایش
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
import EditorComponent from "~/components/editor/EditorComponent";
import CustomToggleComponent from "~/components/form/CustomToggleComponent";
import CustomImageSelectComponent from "~/components/form/CustomImageSelectComponent.vue";

export default {
  name: "UpdateSliderComponent",
  components: {
    CustomImageSelectComponent,
    CustomToggleComponent, EditorComponent, CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
    item: {
      type: Object,
      required: true,
    }
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
    this.setItem()
  },
  methods: {
    setItem() {
      this.slider = {
        id: this.item.id,
        title: this.item.title,
        image: this.item.image,
        link: this.item.link,
        link_title: this.item.link_title,
        description: this.item.description,
        is_active: this.item.is_active,
      }
      setTimeout(() => {
        this.loading = false
      }, 100)
    },
    closeForm() {
      this.$emit('close')
    },
    reset() {
      this.setItem()
    },
    update() {
      this.$store.dispatch('slider/updateSlider', this.slider)
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
