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
          <span>ایجاد دسته بندی</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
          >
            <custom-text-field-component
              v-model="category.name"
              :label="'عنوان'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-auto-complete-component
              v-model="category.type"
              :label="'نوع'"
              :items="types"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-auto-complete-component
              v-model="category.parent_id"
              :label="'دسته بندی والد'"
              :items="allCategories"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
            md="4"
          >
            <div class="placeholder">تصویر شاخص</div>
            <custom-image-select-component
              @uploaded="uploaded"
              v-if="showImage"
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
import CustomImageSelectComponent from "~/components/form/CustomImageSelectComponent";

export default {
  name: "CreateCategoryComponent",
  components: {CustomImageSelectComponent, CustomTextFieldComponent, CustomAutoCompleteComponent},
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showImage: true,
      types: [
        {
          id: 'product',
          name: 'محصول',
        },
        {
          id: 'article',
          name: 'مقاله',
        },
        {
          id: 'faq',
          name: 'سوالات متداول',
        },
      ],
      category: {
        name: '',
        thumbnail: '',
        type: 'product',
        parent_id: null,
      }
    }
  },
  mounted() {
    this.getAllCategories()
  },
  methods: {
    getAllCategories() {
      this.$store.dispatch('category/getCategories', {
        type: this.category.type,
        all: true
      })
    },
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.category = {
        name: '',
        thumbnail: '',
        type: 'product',
        parent_id: null,
      }
      this.showImage = false
      setTimeout(() => {
        this.showImage = true
      }, 200)
    },
    create() {
      this.$store.dispatch('category/createCategory', this.category)
        .then(res => {
          this.closeForm()
          this.reset()
        })
    },
    uploaded(res) {
      this.category.thumbnail = res.url
    },
  },
  computed: {
    show() {
      return this.open;
    },
    allCategories() {
      return [
        {
          id: null,
          name: 'بدون والد',
        },
        ...this.$store.getters['category/getList']
      ]
    }
  },
  watch: {
    'category.type'() {
      this.getAllCategories()
    }
  }
}
</script>

<style scoped>

</style>
