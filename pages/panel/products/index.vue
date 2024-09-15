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
                <span class="account-form-title">لیست محصولات</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="openFilterBox"
                >
                  <v-icon>mdi-filter-variant</v-icon>
                </v-btn>
                <nuxt-link
                  to="/panel/products/create"
                >
                  <v-icon>mdi-plus</v-icon>
                </nuxt-link>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="products.meta.last_page"
                :total="products.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in products.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title | toPersianNumber }}</td>
                    <td class="text-center">{{ i.quantity | toPersianNumber }}</td>
                    <td class="text-center">{{ i.sell_count | toPersianNumber }}</td>
                    <td class="text-center">{{ i.category ? i.category.name : '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      {{ i.created_at ? $moment(i.created_at) : '-' | toRelativeDate }}
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          link
                          :href="`/panel/products/${i.slug}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteProduct(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="products.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteProduct"
      :title="`محصول`"
      @remove="removeProduct"
      @close="cancelDeleteProduct"
    />
    <product-filter-component
      :open="showFilter"
      :filters="filters"
      @search="search"
      @close="closeFilterBox"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ProductFilterComponent from "~/components/product/ProductFilterComponent";
export default {
  name: "index.vue",
  components: {ProductFilterComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        category: '',
        from: '',
        to: '',
        status: '',
      },
      headers: [
        '',
        'نام',
        'موجودی',
        'میزان فروش',
        'دسته بندی',
        'تاریخ انتشار',
        'عملیات',
      ],
      product: null,
      showDeleteProduct: false,
      showFilter: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    openFilterBox() {
      this.showFilter = true
    },
    search(filters) {
      this.filters = {
        ...this.filters,
        ...filters
      }
      this.showFilter = false
      this.paginate()
    },
    closeFilterBox() {
      this.showFilter = false
    },
    getProducts() {
      this.$store.dispatch('product/getProducts', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getProducts()
    },
    toggleShowDeleteProduct(product) {
      this.product = product
      this.showDeleteProduct = true
    },
    cancelDeleteProduct() {
      this.product = null
      this.showDeleteProduct = false
    },
    removeProduct() {
      this.$store.dispatch('product/removeProduct', this.product.id)
        .then(res => {
          this.getProducts()
          this.cancelDeleteProduct()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    products() {
      return this.$store.getters['product/getProducts']
    }
  }
}
</script>

<style scoped>

</style>
