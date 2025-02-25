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
<!--                <nuxt-link-->
<!--                  to="/panel/users/create"-->
<!--                >-->
<!--                  <v-icon>mdi-plus</v-icon>-->
<!--                </nuxt-link>-->
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <div class="">
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        md="7"
                      >
                        <custom-text-field-component
                          v-model="filter.q"
                          :label="'جستجو'"
                          @input="doFilter"
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="3"
                      >
                        <custom-auto-complete-component
                          v-model="filter.order"
                          :label="'ترتیب براساس'"
                          :items="allOrders"
                          :returnObject="false"
                          :item-text="'name'"
                          :item-value="'id'"
                          @change="() => paginate(1)"
                        />
                      </v-col>
                      <v-col
                        cols="6"
                        md="2"
                      >
                        <custom-auto-complete-component
                          v-model="filter.sort"
                          :label="'ترتیب نمایش'"
                          :items="allSorts"
                          :returnObject="false"
                          :item-text="'name'"
                          :item-value="'id'"
                          @change="() => paginate(1)"
                        />
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </div>

              <data-table-component
                :headers="headers"
                :page="filter.page"
                :last-page="users.meta.last_page"
                :total="users.meta.total"
                @paginate="() => paginate(1)"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in users.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.full_name ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.email ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.phone_number ?? '-' | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">
                      {{ i.birth_date ? $moment(i.birth_date).format("jYYYY/jMM/jDD") : '-' | toPersianNumber }}
                    </td>
                    <td class="text-center">{{ i.portfolios_count ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/users/${i.id}/portfolios`"
                        >
                          <v-icon>mdi-briefcase</v-icon>
                        </nuxt-link>
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
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent.vue";
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent.vue";
import { debounce } from 'lodash';

export default {
  name: "index.vue",
  components: {CustomTextFieldComponent, CustomAutoCompleteComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      headers: [
        '',
        'نام و نام خانوادگی',
        'ایمیل',
        'شماره تماس',
        'تاریخ تولد',
        'تعداد نمونه کار',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
        role_id: '',
        order: 'created_at',
        sort: 'desc'
      },
      user: null,
      showDeleteUser: false,

      allOrders: [
        {
          id: 'created_at',
          name: 'تاریخ ثبت نام'
        },
        {
          id: 'full_name',
          name: 'نام و نام خانواگی'
        }
      ],
      allSorts: [
        {
          id: 'desc',
          name: 'نزولی'
        },
        {
          id: 'asc',
          name: 'صعودی'
        }
      ],
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
    doFilter: debounce(function() {
      this.paginate(1)
    }, 1000)
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
