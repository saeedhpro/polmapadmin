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
                <span class="account-form-title">آدرس های انبار</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateAddress"
                >
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="addresses.meta.last_page"
                :total="addresses.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in addresses.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.recipient_full_name | toPersianNumber }}</td>
                    <td class="text-center">{{ i.recipient_phone_number | toPersianNumber }}</td>
                    <td class="text-center">{{ i.city ? i.city.province ? i.city.province.name : '-' : '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.city ? i.city.name : '-' | toPersianNumber }}</td>
                    <td class="text-center">{{ i.address | toPersianNumber }}</td>
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
                          @click="toggleShowDeleteAddress(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="addresses.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`آدرس`"
      @remove="removeAddress"
      @close="cancelDeleteAddress"
    />
    <show-address-component
      :open="show"
      :item="address"
      @close="closeShowItem"
      v-if="address"
    />
    <create-address-form
      type="storage"
      :open="showCreateAddress"
      @close="closeShowCreateAddress"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ShowAddressComponent from "~/components/address/ShowAddressForm";
import CreateAddressForm from "~/components/address/CreateAddressForm";

export default {
  name: "index.vue",
  components: {CreateAddressForm, ShowAddressComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        type: 'storage'
      },
      headers: [
        '',
        'نام تحویل گیرنده',
        'شماره تحویل گیرنده',
        'استان',
        'شهر',
        'آدرس',
        'عملیات',
      ],
      showDelete: false,
      showCreateAddress: false,
      show: false,
      address: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getAddresses() {
      this.$store.dispatch('address/getAddresses', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getAddresses()
    },
    closeShowCreateAddress() {
      this.toggleShowCreateAddress()
      this.getAddresses()
    },
    toggleShowCreateAddress() {
      this.showCreateAddress = !this.showCreateAddress
    },
    toggleShowDeleteAddress(address) {
      this.address = address
      this.showDelete = true
    },
    cancelDeleteAddress() {
      this.address = null
      this.showDelete = false
    },
    removeAddress() {
      this.$store.dispatch('address/removeAddress', this.address.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteAddress()
        })
    },
    openShowItem(item) {
      this.address = item
      this.show = true
    },
    closeShowItem() {
      this.show = false
      this.address = null
      this.getAddresses()
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    addresses() {
      return this.$store.getters['address/getAddresses']
    }
  }
}
</script>

<style scoped>

</style>
