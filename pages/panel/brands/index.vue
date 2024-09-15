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
                <span class="account-form-title">لیست برند ها</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateBrand"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="brands.meta.last_page"
                :total="brands.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in brands.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center d-flex flex-row align-center justify-center py-1">
                      <img v-if="i.image" :src="i.image" alt="" class="list-item-avatar">
                      <span v-else>-</span>
                    </td>
                    <td class="text-center">{{ i.name | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateBrand(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteBrand(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="brands.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`برند`"
      @remove="removeBrand"
      @close="cancelDeleteBrand"
    />
    <create-brand-component
      :open="showCreate"
      @close="cancelCreateBrand"
    />
    <update-brand-component
      :open="showUpdate"
      :item="brand"
      @close="closeShowUpdate"
      v-if="brand"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateBrandComponent from "~/components/brand/CreateBrandComponent";
import UpdateBrandComponent from "~/components/brand/UpdateBrandComponent";

export default {
  name: "index.vue",
  components: {CreateBrandComponent, UpdateBrandComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'لوگو',
        'عنوان',
        'عملیات',
      ],
      showDelete: false,
      showUpdate: false,
      showCreate: false,
      brand: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getBrands() {
      this.$store.dispatch('brand/getBrands', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getBrands()
    },
    toggleShowDeleteBrand(brand) {
      this.brand = brand
      this.showDelete = true
    },
    toggleShowUpdateBrand(brand) {
      this.brand = brand
      this.showUpdate = true
    },
    toggleShowCreateBrand() {
      this.showCreate = true
    },
    cancelDeleteBrand() {
      this.brand = null
      this.showDelete = false
    },
    closeShowUpdate() {
      this.showUpdate = false
      this.brand = null
      this.paginate(this.filters.page)
    },
    cancelUpdateBrand() {
      this.showUpdate = false
      this.brand = null
    },
    cancelCreateBrand() {
      this.showCreate = false
      this.paginate(this.filters.page)
    },
    removeBrand() {
      this.$store.dispatch('brand/removeBrand', this.brand.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteBrand()
        })
    },
    updateBrand() {
      this.$store.dispatch('brand/updateBrand', this.brand)
        .then(res => {
          this.paginate()
          this.cancelUpdateBrand()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    brands() {
      return this.$store.getters['brand/getBrands']
    }
  }
}
</script>

<style scoped>

</style>
