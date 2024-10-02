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
                <span class="account-form-title">لیست برنامه ها</span>
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
                :last-page="applications.meta.last_page"
                :total="applications.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in applications.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.app_name ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.app_id ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.app_link ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/applications/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="applications.meta.total === 0">اطلاعاتی یافت نشد</div>
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
        'نام برنامه',
        'آی دی برنامه',
        'لینک برنامه',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      application: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getApplications() {
      this.$store.dispatch('application/getApplications', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getApplications()
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    applications() {
      return this.$store.getters['application/getApplications']
    }
  }
}
</script>

<style scoped>

</style>
