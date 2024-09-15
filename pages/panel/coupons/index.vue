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
                <span class="account-form-title">تخفیفات</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleCreateModal"
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
                :last-page="coupons.meta.last_page"
                :total="coupons.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in coupons.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title }}</td>
                    <td class="text-center">{{ i.type == 'fixed' ? 'ثابت' : 'درصدی' }}</td>
                    <td class="text-center">{{ i.is_single ? 'تک محصولی' : 'چند محصولی' }}</td>
                    <td class="text-center">{{ i.code }}</td>
                    <td class="text-center">{{ i.status ? 'فعال' : 'غیرفعال' }}</td>
                    <td class="text-center">{{ i.expired_at ? $moment(i.expired_at).format("jYYYY/jMM/jDD") : '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateCoupon(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteCoupon(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="coupons.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteCoupon"
      :title="`تخفیف`"
      @remove="removeCoupon"
      @close="cancelDeleteCoupon"
    />
    <create-coupon-component
      :open="showCreate"
      @close="closeCreateModal"
    />
    <update-coupon-component
      :open="showUpdate"
      @close="closeUpdateModal"
      :item="coupon"
      v-if="coupon"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateCouponComponent from "~/components/coupon/CreateCouponComponent";
import UpdateCouponComponent from "~/components/coupon/UpdateCouponComponent";

export default {
  name: "index.vue",
  components: {UpdateCouponComponent, CreateCouponComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        category: '',
        type: '',
      },
      headers: [
        '',
        'عنوان',
        'نوع',
        'دسته',
        'کد',
        'وضعیت',
        'تاریخ انقضا',
        'عملیات',
      ],
      coupon: null,
      showDeleteCoupon: false,
      showCreate: false,
      showUpdate: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getCoupons() {
      this.$store.dispatch('coupon/getCoupons', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getCoupons()
    },
    toggleShowUpdateCoupon(coupon) {
      this.coupon = coupon
      this.showUpdate = true
    },
    closeUpdateModal() {
      this.showUpdate = false
      this.coupon = null
      this.paginate()
    },
    toggleShowDeleteCoupon(coupon) {
      this.coupon = coupon
      this.showDeleteCoupon = true
    },
    cancelDeleteCoupon() {
      this.coupon = null
      this.showDeleteCoupon = false
    },
    toggleCreateModal() {
      this.showCreate = !this.showCreate
    },
    closeCreateModal() {
      this.toggleCreateModal()
      this.paginate()
    },
    removeCoupon() {
      this.$store.dispatch('coupon/removeCoupon', this.coupon.id)
        .then(res => {
          this.getCoupons()
          this.cancelDeleteCoupon()
        })
    },
    getCategory(category) {
      switch (category) {
        case 'string':
          return 'رشته'
        case 'integer':
          return 'عدد'
        case 'color':
          return 'رنگ'
      }
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    coupons() {
      return this.$store.getters['coupon/getCoupons']
    }
  }
}
</script>

<style scoped>

</style>
