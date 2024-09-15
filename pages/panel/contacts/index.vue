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
                <span class="account-form-title">پیام های ارتباط با ما</span>
              </div>
              <div class="action-box">
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="contacts.meta.last_page"
                :total="contacts.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in contacts.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.full_name | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.phone_number | toPersianNumber }}</td>
                    <td class="text-center">{{ i.body | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="openShowItem(i)"
                        >
                          <v-icon>mdi-eye-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteContact(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="contacts.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`پیام`"
      @remove="removeContact"
      @close="cancelDeleteContact"
    />
    <show-contact-component
      :open="show"
      :item="contact"
      @close="closeShowItem"
      v-if="contact"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ShowContactComponent from "~/components/contact/ShowContactComponent";

export default {
  name: "index.vue",
  components: {ShowContactComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'نام و نام خانوادگی',
        'شماره تماس',
        'پیام',
        'عملیات',
      ],
      showDelete: false,
      show: false,
      contact: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getContacts() {
      this.$store.dispatch('contact/getContacts', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getContacts()
    },
    toggleShowDeleteContact(contact) {
      this.contact = contact
      this.showDelete = true
    },
    cancelDeleteContact() {
      this.contact = null
      this.showDelete = false
    },
    removeContact() {
      this.$store.dispatch('contact/removeContact', this.contact.id)
        .then(res => {
          this.paginate()
        })
      .finally(() => {
        this.cancelDeleteContact()
      })
    },
    openShowItem(item) {
      this.contact = item
      this.show = true
    },
    closeShowItem() {
      this.show = false
      this.contact = null
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    contacts() {
      return this.$store.getters['contact/getContacts']
    }
  }
}
</script>

<style scoped>

</style>
