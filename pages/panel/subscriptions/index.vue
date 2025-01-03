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
                <span class="account-form-title">لیست اشتراک ها</span>
              </div>
<!--              <div class="action-box">-->
<!--                <nuxt-link-->
<!--                  to="/panel/subscriptions/create"-->
<!--                >-->
<!--                  <v-icon>mdi-plus</v-icon>-->
<!--                </nuxt-link>-->
<!--              </div>-->
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filter.page"
                :last-page="subscriptions.meta.last_page"
                :total="subscriptions.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in subscriptions.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.period ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ parseFloat(i.price) ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/subscriptions/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
<!--                        <v-btn-->
<!--                          icon-->
<!--                          @click="openShowDelete(i)"-->
<!--                        >-->
<!--                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>-->
<!--                        </v-btn>-->
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="subscriptions.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteSubscription"
      :title="`اشتراک`"
      @remove="removeSubscription"
      @close="cancelDeleteSubscription"
      v-if="subscription"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal.vue";
export default {
  name: "index.vue",
  components: {ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      headers: [
        '',
        'عنوان',
        'تعداد ماه',
        'قیمت',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      subscription: null,
      showDeleteSubscription: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getSubscriptions() {
      this.$store.dispatch('subscription/getAllSubscriptions', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getSubscriptions()
    },
    openShowDelete(item) {
      this.subscription = item
      this.toggleShowDelete()
    },
    toggleShowDelete() {
      this.showDeleteSubscription = !this.showDeleteSubscription
    },
    cancelDeleteSubscription() {
      this.subscription = null
      this.toggleShowDelete()
    },
    removeSubscription() {
      this.$store.dispatch('subscription/deleteSubscription', this.subscription.id)
        .then(res => {
          this.item = null
          this.toggleShowDelete()
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
        .finally(() => {
          this.paginate(1)
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    subscriptions() {
      return this.$store.getters['subscription/getSubscriptions']
    }
  }
}
</script>

<style scoped>

</style>
