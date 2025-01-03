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
                <span class="account-form-title">لیست خرید سکه</span>
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
                :last-page="options.meta.last_page"
                :total="options.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in options.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.coins ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.gift ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.price ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/coins/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="options.meta.total === 0">اطلاعاتی یافت نشد</div>
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
        'تعداد سکه',
        'تعداد سکه هدیه',
        'قیمت',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      option: null,
      showDeleteOption: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getOptions() {
      this.$store.dispatch('options/getAllOptions', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getOptions()
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    options() {
      return this.$store.getters['options/getOptions']
    }
  }
}
</script>

<style scoped>

</style>
