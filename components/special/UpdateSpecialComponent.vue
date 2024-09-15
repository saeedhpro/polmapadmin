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
          <span>ویرایش فروش ویژه</span>
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
              v-model="special.title"
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
                v-model="special.status"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="special.type"
              :label="'نمایش در '"
              :items="types"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="related_products"
              :items="products"
              :label="'محصولات مرتبط'"
              :returnObject="true"
              :item-text="'title'"
              :item-value="'id'"
              :multiple="true"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <editor-component
              placeholder="توضیحات"
              class="small"
              v-model="special.description"
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

export default {
  name: "UpdateSpecialComponent",
  components: {CustomToggleComponent, EditorComponent, CustomTextFieldComponent, CustomAutoCompleteComponent},
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
      types: [
        {
          id: 'main',
          name: 'اسلایدر اصلی',
        },
        {
          id: 'normal',
          name: 'فروش ویژه',
        },
      ],
      special: {
        id: '',
        title: '',
        type: 'main',
        description: '',
        status: false,
      },
      related_products: [],
    }
  },
  mounted() {
    this.setItem()
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.$store.dispatch('product/getProducts', {
        special: 1,
      })
    },
    setItem() {
      this.special = {
        id: this.item.id,
        title: this.item.title,
        type: this.item.type,
        description: this.item.description,
        status: this.item.status,
      }
      this.related_products = this.item.products
      setTimeout(() => {
        this.loading = false
      }, 100)
    },
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.setItem()
    },
    update() {
      this.$store.dispatch('special/updateSpecial', {
        ...this.special,
        products: this.related_products.map(i => i.id),
      })
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
    products() {
      return this.$store.getters['product/getList']
    },
  },
}
</script>

<style scoped>

</style>
