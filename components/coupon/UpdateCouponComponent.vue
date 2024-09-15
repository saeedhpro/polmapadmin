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
          <span>ویرایش کد تخفیف</span>
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
              v-model="coupon.title"
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
                v-model="coupon.status"
              />
            </div>
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="coupon.is_single"
              :label="'دسته‌'"
              :items="singles"
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
              :label="coupon.is_single ? 'محصول' : 'محصولات'"
              :returnObject="true"
              :item-text="'title'"
              :item-value="'id'"
              :multiple="true"
              :rules="maxProductRules"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="coupon.type"
              :label="'نوع'"
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
            <custom-text-field-component
              v-if="coupon.type === 'percentage'"
              v-model="coupon.value"
              :label="'مقدار'"
              type="number"
            />
            <custom-price-field-component
              v-else
              v-model="coupon.value"
              :label="'مقدار'"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="coupon.limit"
              :label="'تعداد استفاده'"
              type="number"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-date-picker
              :label="`تاریخ انقضا`"
              :disable-past="true"
              v-model="coupon.expired_at"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <editor-component
              placeholder="توضیحات"
              class="small"
              v-model="coupon.description"
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
import CustomDatePicker from "~/components/form/CustomDatePicker";
import CustomPriceFieldComponent from "~/components/form/CustomPriceFieldComponent";

export default {
  name: "UpdateCouponComponent",
  components: {
    CustomPriceFieldComponent,
    CustomDatePicker,
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
      types: [
        {
          id: 'fixed',
          name: 'ثابت',
        },
        {
          id: 'percentage',
          name: 'درصدی',
        },
      ],
      singles: [
        {
          id: true,
          name: 'تک محصولی',
        },
        {
          id: false,
          name: 'چند محصولی',
        },
      ],
      coupon: {
        title: '',
        type: 'fixed',
        description: '',
        status: false,
        is_single: false,
        value: '',
        limit: 0,
        expired_at: '',
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
        special: 0,
      })
    },
    setItem() {
      this.coupon = {
        id: this.item.id,
        title: this.item.title,
        type: this.item.type,
        description: this.item.description,
        status: this.item.status,
        is_single: this.item.is_single,
        value: this.item.value,
        limit: this.item.limit,
        expired_at: this.item.expired_at,
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
      const data = {
        ...this.coupon,
        value: this.coupon.value.split(' ')[0].split(',').join(''),
        products: this.related_products.map(i => i.id),
      }
      this.$store.dispatch('coupon/updateCoupon', data)
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
    maxProductRules() {
      if (this.coupon.is_single) {
        return this.related_products.length > 1 ? ['تنها یک محصول می توانید انتخاب کنید'] : []
      } else {
        return []
      }
    }
  },
}
</script>

<style scoped>

</style>
