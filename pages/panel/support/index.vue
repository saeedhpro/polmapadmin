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
                <span class="account-form-title">پشتیبانی</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateSubject"
                  v-if="tab===1"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <v-tabs
                color="#E85C2F"
                left
                v-model="tab"
              >
                <v-tab><span class="v-tab-title">لیست تیکت ها</span></v-tab>
                <v-tab><span class="v-tab-title">تنظیمات</span></v-tab>
              </v-tabs>
              <v-tabs-items
                v-model="tab"
                touchless
              >
                <v-tab-item>
                  <div class="account-form-content">
                    <data-table-component
                      :headers="headers"
                      :page="filter.page"
                      :last-page="tickets.meta.last_page"
                      :total="tickets.meta.total"
                      @paginate="paginate"
                    >
                      <template v-slot:body>
                        <tr v-for="(i, n) in tickets.data" :key="n">
                          <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                          <td class="text-center">{{ i.user ? i.user.full_name ? i.user.full_name : i.user.email : '-' | toPersianNumber }}</td>
                          <td class="text-center ">{{ i.title ? i.title : '-' | toPersianNumber }}</td>
                          <td class="text-center ">{{ i.subject ? i.subject.title : '-' | toPersianNumber }}</td>
                          <td class="text-center ">{{ i.status_fa ?? '-' | toPersianNumber }}</td>
                          <td class="text-center dir-ltr">
                            {{ i.created_at ? `${$moment(i.created_at).format("jYYYY/jMM/jDD")}` : '-' | toPersianNumber }}
                          </td>
                          <td class="text-center">
                            <div class="action-box">
                              <nuxt-link
                                :to="`/panel/support/tickets/${i.id}`"
                              >
                                <v-icon>mdi-eye</v-icon>
                              </nuxt-link>
                            </div>
                          </td>
                        </tr>
                      </template>
                      <template v-slot:notfound>
                        <div v-if="tickets.meta.total === 0">اطلاعاتی یافت نشد</div>
                      </template>
                    </data-table-component>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div class="account-form-content">
                    <data-table-component
                      :headers="subject_headers"
                      :page="subject_filter.page"
                      :last-page="subjects.meta.last_page"
                      :total="subjects.meta.total"
                      @paginate="paginate"
                    >
                      <template v-slot:body>
                        <tr v-for="(i, n) in subjects.data" :key="n">
                          <td class="text-center">{{ (filter.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                          <td class="text-center ">{{ i.title ? i.title : '-' | toPersianNumber }}</td>
                          <td class="text-center">
                            <div class="action-box">
                              <v-btn
                                icon
                                @click="toggleShowUpdateSubject(i)"
                              >
                                <v-icon>mdi-pencil-outline</v-icon>
                              </v-btn>
                              <v-btn
                                icon
                                @click="toggleShowDeleteSubject(i)"
                              >
                                <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                              </v-btn>
                            </div>
                          </td>
                        </tr>
                      </template>
                      <template v-slot:notfound>
                        <div v-if="subjects.meta.total === 0">اطلاعاتی یافت نشد</div>
                      </template>
                    </data-table-component>
                  </div>
                </v-tab-item>
              </v-tabs-items>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteSubject"
      :title="`موضوع پشتیبانی`"
      @remove="removeSubject"
      @close="cancelDeleteSubject"
    />
    <create-subject-component
      :open="showCreateSubject"
      @close="cancelCreateSubject"
    />
    <update-subject-component
      :open="showUpdateSubject"
      :item="subject"
      v-if="subject"
      @close="closeUpdateSubject"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import CreateSubjectComponent from "~/components/support/CreateSubjectComponent.vue";
import UpdateSubjectComponent from "~/components/support/UpdateSubjectComponent.vue";
import UpdateServiceComponent from "~/components/service/UpdateServiceComponent.vue";
import ShowDeleteModal from "~/components/global/ShowDeleteModal.vue";
export default {
  name: "index.vue",
  components: {
    ShowDeleteModal,
    UpdateServiceComponent, UpdateSubjectComponent, CreateSubjectComponent, DataTableComponent},
  layout: "panel",
  data() {
    return {
      tab: 0,
      headers: [
        '',
        'کاربر',
        'عنوان',
        'موضوع',
        'وضعیت',
        'تاریخ ثبت',
        'عملیات',
      ],
      subject_headers: [
        '',
        'عنوان',
        'عملیات',
      ],
      filter: {
        page: 1,
        q: '',
      },
      subject_filter: {
        page: 1,
        q: '',
      },
      ticket: null,
      showDeleteSubject: false,
      showCreateSubject: false,
      showUpdateSubject: false,
      subject: null,
      statuses: {
        'accepted': 'تایید شده',
        'created': 'در انتظار تایید',
        'rejected': 'رد شده',
      }
    }
  },
  mounted() {
    this.paginate()
    this.paginateSubjects()
  },
  methods: {
    getTickets() {
      this.$store.dispatch('support/getAllTickets', this.filter)
    },
    getSubjects() {
      this.$store.dispatch('support/getSubjects', this.subject_filter)
    },
    paginate(page = 1) {
      this.filter.page = page
      this.getTickets()
    },
    paginateSubjects(page = 1) {
      this.subject_filter.page = page
      this.getSubjects()
    },
    getStatus(status) {
      return this.statuses[status]
    },
    toggleShowCreateSubject() {
      this.showCreateSubject = true
    },
    toggleShowUpdateSubject(subject) {
      this.subject = subject
      this.showUpdateSubject = true
    },
    cancelCreateSubject() {
      this.showCreateSubject = false
      this.paginateSubjects(this.subject_filter.page)
    },
    closeUpdateSubject() {
      this.subject = null
      this.showCreateSubject = false
      this.paginateSubjects()
    },
    toggleShowDeleteSubject(subject) {
      this.subject = subject
      this.showDeleteSubject = true
    },
    cancelDeleteSubject() {
      this.subject = null
      this.showDeleteSubject = false
    },
    removeSubject() {
      this.$store.dispatch('support/removeSubject', this.subject.id)
        .then(res => {
          this.paginateSubjects()
          this.cancelDeleteSubject()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    tickets() {
      return this.$store.getters['support/getTickets']
    },
    subjects() {
      return this.$store.getters['support/getSubjects']
    }
  }
}
</script>

<style scoped>

</style>
