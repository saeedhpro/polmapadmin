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
                <span class="account-form-title">آموزش های پول مپ</span>
              </div>
              <div class="action-box">
                <nuxt-link
                  to="/panel/courses/create"
                >
                  <v-icon>mdi-plus</v-icon>
                </nuxt-link>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <div class="">
                <v-form>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="4"
                        md="2"
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
                        cols="4"
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
                :last-page="courses.meta.last_page"
                :total="courses.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in courses.data" :key="n">
                    <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.user.full_name ?? '-' | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <nuxt-link
                          :to="`/panel/courses/${i.id}`"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </nuxt-link>
                        <v-btn
                          icon
                          @click="openShowDelete(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="courses.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteCourse"
      :title="`آموزش`"
      @remove="removeCourse"
      @close="cancelDeleteCourse"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal.vue";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent.vue";
export default {
  name: "index.vue",
  components: {CustomAutoCompleteComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      headers: [
        '',
        'عنوان',
        'کاربر ثبت کننده',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
        order: 'created_at',
        sort: 'desc'
      },
      allOrders: [
        {
          id: 'created_at',
          name: 'تاریخ ثبت'
        },
        {
          id: 'title',
          name: 'عنوان'
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
      course: null,
      showDeleteCourse: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getCourses() {
      this.$store.dispatch('course/getCourses', this.filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getCourses()
    },
    openShowDelete(course) {
      this.course = course
      this.toggleShowDelete()
    },
    toggleShowDelete() {
      this.showDeleteCourse = !this.showDeleteCourse
    },
    removeCourse() {
      this.$store.dispatch('course/removeCourse', this.course.id)
        .then(res => {
          this.cancelDeleteCourse()
        })
        .finally(() => {
          this.paginate(1)
        })
    },
    cancelDeleteCourse() {
      this.course = null
      this.toggleShowDelete()
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    courses() {
      return this.$store.getters['course/getCourses']
    }
  },
}
</script>

<style scoped>

</style>
