<template>
  <main class="account account-page" :class="{'mini': mini}">
    <v-container>
      <v-row>
        <v-col
          cols="12"
        >
          <div class="account-form">
            <div class="account-form-header">
              <div class="account-form-right-box">
                <img src="/main/account/account.svg" alt="">
                <span class="account-form-title">لیست پلن ها</span>
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
                :last-page="plans.meta.last_page"
                :total="plans.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in plans.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.coins ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.portfolio_count ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.laddering_count ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.star_count ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.image_upload_count ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">
                      <v-icon color="success" v-if="i.has_blue_tick">
                        mdi-check-circle
                      </v-icon>
                      <v-icon color="error" v-else>
                        mdi-close-circle
                      </v-icon>
                    </td>
                    <td class="text-center dir-ltr">
                      <v-icon color="success" v-if="i.has_discount">
                        mdi-check-circle
                      </v-icon>
                      <v-icon color="error" v-else>
                        mdi-close-circle
                      </v-icon>
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/plans/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="plans.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
export default {
  name: "index.vue",
  components: {DataTableComponent},
  layout: "panel",
  data() {
    return {
      headers: [
        '',
        'عنوان',
        'تعداد سکه',
        'تعداد نمونه کار',
        'تعداد نردبان',
        'تعداد ستاره',
        'محدودیت آپلود عکس',
        'دارای تیک آبی',
        'دارای تخفیف',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      plan: null,
      showDeletePlan: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getPlans() {
      this.$store.dispatch('plan/getAllPlans', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getPlans()
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    plans() {
      return this.$store.getters['plan/getPlans']
    }
  }
}
</script>

<style scoped>

</style>
