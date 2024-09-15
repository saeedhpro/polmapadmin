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
                <span class="account-form-title">لیست کاربران</span>
              </div>
              <div class="action-box">
                <nuxt-link
                  to="/panel/users/create"
                >
                  <v-icon>mdi-plus</v-icon>
                </nuxt-link>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filter.page"
                :last-page="users.meta.last_page"
                :total="users.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in users.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.full_name | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.phone_number | toPersianNumber }}</td>
                    <td class="text-center">{{ i.role ? i.role.name : '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.sheba ? i.sheba : '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">
                      {{ i.birth_date ? $moment(i.birth_date).format("jYYYY/jMM/jDD") : '-' | toPersianNumber }}
                    </td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/users/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                        <v-btn
                          icon
                          @click="toggleShowDeleteUser(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="users.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteUser"
      :title="`کاربر`"
      @remove="removeUser"
      @close="cancelDeleteUser"
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
        'نام و نام خانوادگی',
        'شماره تماس',
        'نقش',
        'شبا',
        'تاریخ تولد',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
        role_id: '',
      },
      user: null,
      showDeleteUser: false,
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      this.$store.dispatch('user/getUsers', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getUsers()
    },
    toggleShowDeleteUser(user) {
      this.user = user
      this.showDeleteUser = true
    },
    cancelDeleteUser() {
      this.user = null
      this.showDeleteUser = false
    },
    removeUser() {
      this.$store.dispatch('user/removeUser', this.user.id)
        .then(res => {
          this.getUsers()
          this.cancelDeleteUser()
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
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    users() {
      return this.$store.getters['user/getUsers']
    }
  }
}
</script>

<style scoped>

</style>
