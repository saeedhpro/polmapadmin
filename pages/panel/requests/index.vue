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
                <span class="account-form-title">لیست درخواست های برداشت کاربران</span>
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
                :last-page="requests.meta.last_page"
                :total="requests.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in requests.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.user ? i.user.full_name ? i.user.full_name : i.user.email : '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.amount ? i.amount : '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.status_fa ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">
                      {{ i.created_at ? `${$moment(i.created_at).format("jYYYY/jMM/jDD")}` : '-' | toPersianNumber }}
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowDeleteRequest(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectRequest(i, 'accepted')"
                          v-if="i.status === 'rejected'"
                        >
                          <v-icon color="green">mdi-check-circle-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectRequest(i, 'rejected')"
                          v-if="i.status === 'created'"
                        >
                          <v-icon color="red">mdi-close-box-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectRequest(i, 'accepted')"
                          v-if="i.status === 'created'"
                        >
                          <v-icon color="green">mdi-check-circle-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="acceptOrRejectRequest(i, 'rejected')"
                          v-if="i.status === 'accepted'"
                        >
                          <v-icon color="red">mdi-close-box-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="requests.meta.total === 0">اطلاعاتی یافت نشد</div>
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
        'کاربر',
        'مبلغ',
        'وضعیت',
        'تاریخ ثبت',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      request: null,
      showDeleteRequest: false,
      statuses: {
        'accepted': 'تایید شده',
        'created': 'در انتظار تایید',
        'rejected': 'رد شده',
      }
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getRequests() {
      this.$store.dispatch('request/getAllRequests', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getRequests()
    },
    toggleShowDeleteRequest(request) {
      this.request = request
      this.showDeleteRequest = true
    },
    cancelDeleteRequest() {
      this.request = null
      this.showDeleteRequest = false
    },
    removeRequest() {
      this.$store.dispatch('request/removeRequest', {
        id: this.request.id,
        user_id: this.filter.user_id,
      })
        .then(res => {
          this.getRequests()
          this.cancelDeleteRequest()
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
    acceptOrRejectRequest(p, status) {
      this.$store.dispatch('request/acceptOrRejectRequest', {
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
    requests() {
      return this.$store.getters['request/getRequests']
    }
  }
}
</script>

<style scoped>

</style>
