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
          <span>ویرایش سوال</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
          >
            <custom-auto-complete-component
              v-model="faq.category_id"
              :label="'دسته بندی'"
              :items="allCategories"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-text-field-component
              v-model="faq.question"
              :label="'سوال'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-text-field-component
              v-model="faq.answer"
              :label="'پاسخ'"
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

export default {
  name: "UpdateFaqComponent",
  components: {CustomTextFieldComponent, CustomAutoCompleteComponent},
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
      faq: {
        id: '',
        category_id: '',
        question: '',
        answer: '',
      }
    }
  },
  mounted() {
    this.setItem()
    this.getAllCategories()
  },
  methods: {
    setItem() {
      this.faq = {
        id: this.item.id,
        category_id: this.item.category ? this.item.category.id : null,
        question: this.item.question,
        answer: this.item.answer,
      }
    },
    getAllCategories() {
      this.$store.dispatch('category/getCategories', {
        type: 'faq',
        all: true
      })
    },
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.setItem()
    },
    update() {
      this.$store.dispatch('faq/updateFaq', this.faq)
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
    }
  },
  computed: {
    show() {
      return this.open;
    },
    allCategories() {
      return this.$store.getters['category/getList']
    }
  },
}
</script>

<style scoped>

</style>
