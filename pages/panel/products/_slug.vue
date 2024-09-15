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
                <span class="account-form-title">ویرایش محصول</span>
              </div>
              <div class="account-form-action-box">
                <button class="account-form-action main-btn" @click="updateProduct">ویرایش</button>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content" v-if="product">
              <v-row>
                <v-col
                  cols="12"
                  md="9"
                >
                  <v-row>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <custom-text-field-component
                        v-model="product.title"
                        :rules="product.rules.title"
                        label="عنوان محصول"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      md="12"
                    >
                      <custom-text-field-component
                        v-model="product.sub_title"
                        label="زیرعنوان محصول"
                      />
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <editor-component
                        v-if="!loading"
                        placeholder="توضیحات تکمیلی"
                        v-model="product.description"
                      />
                    </v-col>
                  </v-row>
                </v-col>
                <v-col
                  cols="12"
                  md="3"
                >
                  <v-row>
                    <v-col
                      cols="12"
                    >
                      <custom-auto-complete-component
                        v-model="product.category_id"
                        :label="'دسته بندی محصول'"
                        :items="categories"
                        :returnObject="false"
                        :item-text="'name'"
                        :item-value="'id'"
                      />
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="account-form" v-if="product">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">اطلاعات محصول</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                vertical
              >
                <v-tab>
                  انبار
                </v-tab>
                <v-tab>
                  محصولات مرتبط
                </v-tab>
                <v-tab>
                  ویژگی های ساده
                </v-tab>
                <v-tab>
                  ویژگی های متغیر
                </v-tab>
                <v-tab>
                  تصاویر محصول
                </v-tab>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-row>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <div class="placeholder"></div>
                          <custom-price-field-component
                            v-model="product.price"
                            :rules="[]"
                            label="قیمت محصول"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <div class="placeholder"></div>
                          <custom-text-field-component
                            v-model="product.quantity"
                            :rules="product.rules.quantity"
                            type="number"
                            label="موجودی محصول"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                        >
                          <div class="d-flex flex-row justify-space-between mt-6">
                            <div class="placeholder">فروش ویژه</div>
                            <custom-toggle-component
                              v-model="product.is_special"
                            />
                          </div>
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          v-if="product.is_special"
                        >
                          <div class="placeholder"></div>
                          <custom-price-field-component
                            v-model="product.special_price"
                            :rules="[]"
                            label="قیمت فروش ویژه"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          v-if="product.is_special"
                        >
                          <div class="placeholder"></div>
                          <custom-date-picker
                            :label="`تاریخ شروع`"
                            :initial-value="product.special_start_date"
                            :disable-past="false"
                            @select="date => product.special_start_date = `${date} 00:00:00`"
                          />
                        </v-col>
                        <v-col
                          cols="12"
                          md="6"
                          v-if="product.is_special"
                        >
                          <div class="placeholder"></div>
                          <custom-date-picker
                            :label="`تاریخ پایان`"
                            :initial-value="product.special_end_date"
                            :disable-past="false"
                            @select="date => product.special_end_date = `${date} 23:59:59`"
                          />
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <custom-auto-complete-component
                        v-model="product.related_products"
                        :items="products"
                        :label="'محصولات مرتبط'"
                        :returnObject="true"
                        :item-text="'title'"
                        :item-value="'id'"
                        :multiple="true"
                      />
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-row>
                        <v-col
                          cols="7"
                        >
                          <v-row>
                            <v-col
                              cols="12"
                            >
                              <div class="d-flex flex-row align-start justify-start">
                                <custom-auto-complete-component
                                  v-model="simple_attribute"
                                  @input="onSimpleAttributeChanged"
                                  :label="'ویژگی'"
                                  :items="simpleAttributes"
                                  :returnObject="true"
                                  :item-text="'name'"
                                  :item-value="'value'"
                                />
                                <div class="account-form-action-box mt-0 mr-2">
                                  <button class="account-form-action main-btn"
                                          :style="{height: '54px', minWidth: 'auto', fontSize: '10px'}"
                                          @click="addItems">
                                    افزودن مقادیر
                                  </button>
                                </div>
                              </div>
                            </v-col>
                            <v-col
                              v-if="showItemsBox"
                              cols="12"
                            >
                              <div
                                v-for="(item, n) in simple_attribute.items"
                                :key="n"
                              >
                                <div class="d-flex flex-row align-start justify-start">
                                  <custom-text-field-component
                                    label="اسم آیتم"
                                    v-model="item.name"
                                    :rules="item.rules.name"
                                  />
                                  <custom-text-field-component
                                    label="مقدار آیتم"
                                    class="mr-2"
                                    v-model="item.value"
                                    :rules="item.rules.value"
                                    :type="simple_attribute.category"
                                  />
                                </div>
                              </div>
                              <v-row class="justify-end">
                                <div class="account-form-action-box mt-0 mr-2">
                                  <button class="account-form-action main-btn"
                                          :style="{height: '54px', minWidth: 'auto'}"
                                          @click="addSimpleAttributeItem">
                                    مقدار جدید
                                  </button>
                                </div>
                                <div class="account-form-action-box mt-0 mr-2">
                                  <button class="account-form-action main-btn"
                                          :style="{height: '54px', minWidth: 'auto'}"
                                          @click="addSimpleAttribute">
                                    ذخیره ویژگی
                                  </button>
                                </div>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col
                          cols="12"
                          md="5"
                        >
                          <div class="attribute-header">ویژگی ها</div>
                          <div
                            v-for="(a, n) in simple_attributes"
                            :key="n"
                            class="attribute-item">
                            <div class="attribute-name">{{ a.name }}</div>
                            <div class="attribute-actions">
                              <v-icon @click="editAttribute(n)" small>mdi-pencil</v-icon>
                              <v-icon @click="removeAttribute(n)" small>mdi-delete</v-icon>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-row>
                        <v-col
                          cols="7"
                        >
                          <v-row>
                            <v-col
                              cols="12"
                            >
                              <div class="d-flex flex-row align-start justify-start">
                                <custom-auto-complete-component
                                  v-model="variable_attribute"
                                  @input="onVariableAttributeChanged"
                                  :label="'ویژگی'"
                                  :items="variableAttributes"
                                  :returnObject="true"
                                  :item-text="'name'"
                                  :item-value="'value'"
                                />
                                <div class="account-form-action-box mt-0 mr-2">
                                  <button class="account-form-action main-btn"
                                          :style="{height: '54px', minWidth: 'auto', fontSize: '10px'}"
                                          @click="addVariableItems">
                                    افزودن مقادیر
                                  </button>
                                </div>
                              </div>
                            </v-col>
                            <v-col
                              v-if="showVItemsBox"
                              cols="12"
                            >
                              <div
                                v-for="(item, n) in variable_attribute.items"
                                :key="n"
                              >
                                <div class="d-flex flex-row align-start justify-start flex-wrap">
                                  <custom-text-field-component
                                    label="اسم آیتم"
                                    v-model="item.name"
                                    :rules="item.rules.name"
                                    class="property-input"
                                  />
                                  <custom-text-field-component
                                    label="مقدار آیتم"
                                    v-model="item.value"
                                    :rules="item.rules.value"
                                    :type="variable_attribute.category"
                                    class="mr-2 property-input"
                                  />
                                  <custom-price-field-component
                                    label="مبلغ آیتم"
                                    v-model="item.price"
                                    :type="variable_attribute.category"
                                    class="mr-2 property-input"
                                  />
                                </div>
                              </div>
                              <v-row class="justify-end">
                                <div class="account-form-action-box mt-0 mr-2">
                                  <button class="account-form-action main-btn"
                                          :style="{height: '54px', minWidth: 'auto'}"
                                          @click="addVariableAttributeItem">
                                    مقدار جدید
                                  </button>
                                </div>
                                <div class="account-form-action-box mt-0 mr-2">
                                  <button class="account-form-action main-btn"
                                          :style="{height: '54px', minWidth: 'auto'}"
                                          @click="addVariableAttribute">
                                    ذخیره ویژگی
                                  </button>
                                </div>
                              </v-row>
                            </v-col>
                          </v-row>
                        </v-col>
                        <v-col
                          cols="12"
                          md="5"
                        >
                          <div class="attribute-header">ویژگی ها</div>
                          <div
                            v-for="(a, n) in variable_attributes"
                            :key="n"
                            class="attribute-item">
                            <div class="attribute-name">{{ a.name }}</div>
                            <div class="attribute-actions">
                              <v-icon @click="editVariableAttribute(n)" small>mdi-pencil</v-icon>
                              <v-icon @click="removeVariableAttribute(n)" small>mdi-delete</v-icon>
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-row>
                        <v-col
                          cols="12"
                        >
                          <div class="product-slider-box">
                            <div class="product-slider-image" v-for="(i, n) in product.images" :key="n">
                              <v-icon @click="removeImage(n)" class="close-icon" color="red">mdi-delete</v-icon>
                              <img :src="i" alt="">
                            </div>
                            <custom-image-select-component
                              :width="'200px'"
                              :height="'200px'"
                              :slider="true"
                              @uploaded="uploaded"
                            />
                          </div>
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import EditorComponent from "~/components/editor/EditorComponent";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomImageSelectComponent from "~/components/form/CustomImageSelectComponent";
import CustomToggleComponent from "~/components/form/CustomToggleComponent";
import CustomDatePicker from "~/components/form/CustomDatePicker";
import CustomPriceFieldComponent from "~/components/form/CustomPriceFieldComponent";

export default {
  name: "index.vue",
  components: {
    CustomPriceFieldComponent,
    CustomDatePicker,
    CustomToggleComponent,
    CustomImageSelectComponent,
    CustomAutoCompleteComponent, EditorComponent, DataTableComponent, CustomTextFieldComponent
  },
  layout: "panel",
  data() {
    return {
      product: null,
      types: [
        {
          id: 1,
          name: 'رنگ',
          value: 'color',
        },
        {
          id: 2,
          name: 'متن',
          value: 'string',
        },
        {
          id: 3,
          name: 'عدد',
          value: 'integer',
        },
      ],
      index: 0,
      loading: false,
      showItemsBox: false,
      showVItemsBox: false,
      updating: false,
      v_updating: false,
      simple_attribute: null,
      variable_attribute: null,
      simple_attributes: [],
      variable_attributes: [],
      deleted_attributes: [],
    }
  },
  mounted() {
    this.getProduct()
    this.getCategories()
    this.getProducts()
    this.getAttributes()
  },
  methods: {
    getAttributes() {
      this.$store.dispatch('attribute/getAttributes', {})
    },
    getCategories() {
      this.$store.dispatch('category/getCategories', {
        type: 'product',
        all: true
      })
    },
    getProduct() {
      this.$store.dispatch('product/getProduct', this.$route.params.slug)
        .then(res => {
          const product = res.data.data
          this.product = {
            id: product.id,
            title: product.title,
            sub_title: product.sub_title,
            quantity: product.quantity,
            price: product.price.price,
            special_price: product.special_price,
            is_special: product.is_special,
            special_start_date: product.special_start_date,
            special_end_date: product.special_end_date,
            description: product.description,
            category_id: product.category ? product.category.id : null,
            related_products: [
              ...product.related_products,
            ],
            images: [
              ...product.images,
            ],
            rules: {
              title: [val => (val || '').length > 0 || 'لطفا عنوان محصول را وارد کنید'],
              quantity: [val => {
                if (val < 1) {
                  return 'موجودی محصول نمی تواند کمتر از ۱ باشد'
                } else {
                  return true
                }
              }],
              description: [val => (val || '').length > 0 || 'لطفا متن محصول را وارد کنید'],
              category_id: [val => val !== null || 'لطفا دسته بندی محصول را وارد کنید'],
            }
          }
          for (let i = 0; i < product.attributes.length; i++) {
            const attribute = {
              ...product.attributes[i],
              items: [
                ...product.attributes[i].items.map(i => ({
                  ...i,
                  rules: {
                    name: [val => (val || '').length > 0 || 'لطفا اسم را وارد کنید'],
                    value: [val => (val || '').length > 0 || 'لطفا مقدار را وارد کنید'],
                  },
                })),
              ]
            };
            if (attribute.type == 0) {
              this.simple_attributes.push(attribute)
            } else {
              this.variable_attributes.push(attribute)
            }
          }
        })
    },
    getProducts() {
      this.$store.dispatch('product/getProducts', {})
    },
    updateProduct() {
      if (this.validateProduct()) {
        const attrs = [];
        const new_attrs = [];
        let list = []
        let list2 = []
        for (let i = 0; i < this.simple_attributes.length; i++) {
          for (let j = 0; j < this.simple_attributes[i].items.length; j++) {
            if (this.simple_attributes[i].items[j].id === "") {
              list.push(this.simple_attributes[i].items[j])
            } else {
              list2.push(this.simple_attributes[i].items[j])
            }
          }
          if (list.length > 0) {
            new_attrs.push({
              ...this.simple_attributes[i],
              items: list
            })
            list = []
          }
          if (list2.length > 0) {
            attrs.push({
              ...this.simple_attributes[i],
              items: list2
            })
            list2 = []
          }
        }
        for (let i = 0; i < this.variable_attributes.length; i++) {
          for (let j = 0; j < this.variable_attributes[i].items.length; j++) {
            if (this.variable_attributes[i].items[j].id === "") {
              const item = this.variable_attributes[i].items[j]
              list.push({
                ...item,
                price: parseFloat(item.price.toString().split(' ')[0].split(',').join('')),
              })
            } else {
              const item = this.variable_attributes[i].items[j]
              list2.push({
                ...item,
                price: parseFloat(item.price.toString().split(' ')[0].split(',').join('')),
              })
            }
          }
          if (list.length > 0) {
            new_attrs.push({
              ...this.variable_attributes[i],
              items: list
            })
            list = []
          }
          if (list2.length > 0) {
            attrs.push({
              ...this.variable_attributes[i],
              items: list2
            })
            list2 = []
          }
        }
        this.$store.dispatch('product/updateProduct', {
          ...this.product,
          price: parseFloat(this.product.price.toString().split(' ')[0].split(',').join('')),
          special_price: parseFloat(this.product.special_price.toString().split(' ')[0].split(',').join('')),
          related_products: this.product.related_products.map(i => i.id),
          deleted_attributes: this.deleted_attributes,
          attributes: attrs,
          new_attributes: new_attrs
        })
          .then(()=> {
            this.$toast.success('محصول با موفقیت آپدیت شد')
            this.$router.push('/panel/products')
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
      // ...this.simple_attributes.filter(i => i.items[0] && i.items[0] !== ''),
      // ...this.variable_attributes.filter(i => i.items[0] && i.items[0] !== '').map(i => ({
      //     ...i,
      //     items: [
      //       ...i.items.map(j => {
      //         return {
      //           ...j,
      //           price: parseFloat(j.price.split(' ')[0].split(',').join('')),
      //         }
      //       })
      //     ]
      //   })),
      // new_attributes: [
      //   ...this.simple_attributes.filter(i => i.items[0] && !i.items[0].id),
      //   ...this.variable_attributes.filter(i => i.items[0] && !i.items[0]).map(i => ({
      //     ...i,
      //     items: [
      //       ...i.items.map(j => {
      //         return {
      //           ...j,
      //           price: parseFloat(j.price.split(' ')[0].split(',').join('')),
      //         }
      //       })
      //     ]
      //   })),
      // ],
    },
    uploaded(res) {
      this.product.images.push(res.url)
    },
    removeImage(index) {
      this.product.images.splice(index, 1)
    },
    validateProduct() {
      let validated = true
      if (!this.product.title) {
        validated = false
      }
      if (!this.product.description) {
        validated = false
      }
      // if (!this.product.category_id) {
      //   validated = false
      // }
      return validated
    },
    addSimpleAttribute() {
      if (this.updating) {
        this.simple_attributes[this.index] = this.simple_attribute
        this.updating = false
      } else {
        if (!this.canAddSimple(this.simple_attribute)) {
          return
        }
        this.simple_attributes.push(this.simple_attribute)
      }
      this.showItemsBox = false
      this.simple_attribute = null
    },
    canAddSimple(attribute) {
      if (!attribute.items[attribute.items.length - 1].name ||
        !attribute.items[attribute.items.length - 1].value ||
        this.simple_attributes.findIndex(i => i.id === attribute.id) !== -1) {
        return false
      }
      return true;
    },
    canAddVariable(attribute) {
      if (!attribute.items[attribute.items.length - 1].name ||
        !attribute.items[attribute.items.length - 1].value ||
        this.variable_attributes.findIndex(i => i.id === attribute.id) !== -1) {
        return false
      }
      return true;
    },
    addVariableAttribute() {
      if (this.v_updating) {
        this.variable_attributes[this.v_index] = this.variable_attribute
        this.v_updating = false
      } else {
        if (!this.canAddVariable(this.variable_attribute)) {
          return
        }
        this.variable_attributes.push(this.variable_attribute)
      }

      this.showVItemsBox = false
      this.variable_attribute = null
    },
    addVariableAttributeItem() {
      if (this.variable_attribute) {
        this.variable_attribute.items.push({
          id: '',
          name: '',
          value: '',
          price: 0,
          rules: {
            name: [val => (val || '').length > 0 || 'لطفا اسم را وارد کنید'],
            value: [val => (val || '').length > 0 || 'لطفا مقدار را وارد کنید'],
          },
        })
      }
    },
    addSimpleAttributeItem() {
      if (this.simple_attribute) {
        this.simple_attribute.items.push({
          id: '',
          name: '',
          value: '',
          price: 0,
          rules: {
            name: [val => (val || '').length > 0 || 'لطفا اسم را وارد کنید'],
            value: [val => (val || '').length > 0 || 'لطفا مقدار را وارد کنید'],
          },
        })
      }
    },
    addVariableItems() {
      if (this.variable_attribute) {
        this.variable_attribute.items.push({
          id: '',
          name: '',
          value: '',
          price: 0,
          rules: {
            name: [val => (val || '').length > 0 || 'لطفا اسم را وارد کنید'],
            value: [val => (val || '').length > 0 || 'لطفا مقدار را وارد کنید'],
          },
        })
        this.showVItemsBox = true
      }
    },
    addItems() {
      if (this.simple_attribute) {
        this.simple_attribute.items.push({
          id: '',
          name: '',
          value: '',
          price: 0,
          rules: {
            name: [val => (val || '').length > 0 || 'لطفا اسم را وارد کنید'],
            value: [val => (val || '').length > 0 || 'لطفا مقدار را وارد کنید'],
          },
        })
        this.showItemsBox = true
      }
    },
    removeVariableAttribute(index) {
      if (this.variable_attributes[index].id) {
        this.deleted_attributes.push(this.variable_attributes[index].id)
      }
      this.variable_attributes.splice(index, 1)
    },
    removeAttribute(index) {
      if (this.simple_attributes[index].id) {
        this.deleted_attributes.push(this.simple_attributes[index].id)
      }
      this.simple_attributes.splice(index, 1)
    },
    editVariableAttribute(index) {
      this.v_updating = true
      this.v_index = index
      if (this.variable_attributes[index].items.length > 0) {
        this.showVItemsBox = true
      }
      this.variable_attribute = this.variable_attributes[index]
    },
    editAttribute(index) {
      this.updating = true
      this.index = index
      if (this.simple_attributes[index].items.length > 0) {
        this.showItemsBox = true
      }
      this.simple_attribute = this.simple_attributes[index]
    },
    onSimpleAttributeChanged(e) {
      this.simple_attribute = {
        id: e.id,
        name: e.name,
        type: e.type,
        category: e.category,
        items: [],
      }
    },
    onVariableAttributeChanged(e) {
      this.variable_attribute = {
        id: e.id,
        name: e.name,
        type: e.type,
        category: e.category,
        items: [],
      }
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    categories() {
      return this.$store.getters['category/getList']
    },
    products() {
      return this.$store.getters['product/getList']
    },
    attributes() {
      return this.$store.getters['attribute/getList']
    },
    simpleAttributes() {
      return this.attributes.filter(i => i.type == 0)
    },
    variableAttributes() {
      return this.attributes.filter(i => i.type == 1)
    }
  },
}
</script>

<style scoped lang="scss">
.placeholder {
  margin-bottom: 10px;
  font-weight: 700 !important;
}

.attribute-value-list {
  max-height: 400px;
  overflow-y: scroll;
}
@media only screen and (max-width: 500px) {
  .account-form-action-box .account-form-action {
    min-width: 80px !important;
  }
}
.property-input {
  width: 126px !important;
}
</style>
