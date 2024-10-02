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
                <span class="account-form-title">لیست نمونه کارهای کاربران</span>
              </div>
              <div class="action-box">
<!--                <nuxt-link-->
<!--                  to="/panel/portfolios/create"-->
<!--                >-->
<!--                  <v-icon>mdi-plus</v-icon>-->
<!--                </nuxt-link>-->
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filter.page"
                :last-page="portfolios.meta.last_page"
                :total="portfolios.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in portfolios.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.user ? i.user.full_name ? i.user.full_name : i.user.email : '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.service ? i.service.title : '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.price ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.discount_price ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">
                      {{getStatus(i.status)}}
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/portfolios/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                        <v-btn
                          icon
                          @click="toggleShowDeletePortfolio(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectPortfolio(i, 'published')"
                          v-if="i.status === 'rejected'"
                        >
                          <v-icon color="green">mdi-check-circle-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectPortfolio(i, 'rejected')"
                          v-if="i.status === 'published'"
                        >
                          <v-icon color="red">mdi-close-box-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectPortfolio(i, 'published')"
                          v-if="i.status === 'created'"
                        >
                          <v-icon color="green">mdi-check-circle-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectPortfolio(i, 'rejected')"
                          v-if="i.status === 'created'"
                        >
                          <v-icon color="red">mdi-close-box-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="portfolios.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeletePortfolio"
      :title="`نمونه کار`"
      @remove="removePortfolio"
      @close="cancelDeletePortfolio"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
export default {
  name: "index.vue",
  components: {ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      headers: [
        '',
        'عنوان',
        'هنرمند',
        'دسته بندی',
        'قیمت',
        'قیمت با تخفیف',
        'وضعیت',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      portfolio: null,
      showDeletePortfolio: false,
      statuses: {
        'published': 'منتشر شده',
        'created': 'در انتظار تایید',
        'rejected': 'رد شده',
      }
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getPortfolios() {
      this.$store.dispatch('portfolio/getAllPortfolios', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getPortfolios()
    },
    toggleShowDeletePortfolio(portfolio) {
      this.portfolio = portfolio
      this.showDeletePortfolio = true
    },
    cancelDeletePortfolio() {
      this.portfolio = null
      this.showDeletePortfolio = false
    },
    removePortfolio() {
      this.$store.dispatch('portfolio/removePortfolio', {
        id: this.portfolio.id,
        user_id: this.filter.user_id,
      })
        .then(res => {
          this.getPortfolios()
          this.cancelDeletePortfolio()
          this.$toast.success('با موفقیت انجام شد')
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            const keys = Object.keys(err.response.data.errors)
            for (let i = 0; i < keys.length; i++) {
              this.$toast.error(errors[keys[i]][0])
            }
          }
        })
    },
    getStatus(status) {
      return this.statuses[status]
    },
    acceptOrRejectPortfolio(p, status) {
      this.$store.dispatch('portfolio/acceptOrRejectPortfolio', {
        user_id: p.user_id,
        id: p.id,
        status: status,
      })
        .finally(() => {
          this.paginate(this.filter.page)
        })
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    portfolios() {
      return this.$store.getters['portfolio/getPortfolios']
    }
  }
}
</script>

<style scoped>

</style>
