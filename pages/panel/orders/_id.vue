<template>
  <main class="account account-page" :class="{'mini': mini}">
    <div class="account-form">
      <div class="account-form-header">
        <div class="account-form-right-box">
          <img src="/main/account/account.svg" alt="">
          <span class="account-form-title">اطلاعات تماس و آدرس</span>
        </div>
        <div class="action-box" v-if="!editAddress">
          <v-btn
            icon
            @click="openEditAddress"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider/>
      <div class="account-form-content">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="order.recipient_full_name"
              :rules="editAddress ?  rules.recipient_full_name : []"
              label="نام و نام خانوادگی"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="order.recipient_phone_number"
              :rules="editAddress ?  rules.recipient_phone_number : []"
              label="شماره موبایل"
              type="tel"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="order.province"
              :label="'استان'"
              :items="provinces"
              :returnObject="true"
              :item-text="'name'"
              :item-value="'id'"
              :rules="editAddress ?  rules.province : []"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="order.city"
              :label="'شهر'"
              :items="cities"
              :returnObject="true"
              :item-text="'name'"
              :item-value="'id'"
              :rules="editAddress ?  rules.city : []"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <custom-text-field-component
              v-model="order.address"
              :rules="editAddress ?  rules.address : []"
              label="آدرس"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <custom-text-field-component
              v-model="order.plate"
              :rules="editAddress ?  rules.plate : []"
              label="پلاک"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
            sm="6"
            md="3"
          >
            <custom-text-field-component
              v-model="order.unit"
              :rules="editAddress ?  rules.unit : []"
              label="واحد"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="order.postal_code"
              :rules="editAddress ?  rules.postal_code : []"
              label="کدپستی"
              :disabled="!editAddress"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <div class="account-form-action-box" v-if="editAddress">
              <button class="account-form-action second-btn" @click="cancelEditAddress">لغو</button>
              <button class="account-form-action main-btn" @click="doEditAddress">ثبت اطلاعات</button>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="account-form">
      <div class="account-form-header">
        <div class="account-form-right-box">
          <img src="/main/account/account.svg" alt="">
          <span class="account-form-title">وضعیت سفارش</span>
        </div>
        <div class="action-box" v-if="!editStatus">
          <v-btn
            icon
            @click="openEditStatus"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </div>
      </div>
      <v-divider/>
      <div class="account-form-content">
        <v-row>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="order.order_id"
              label="شماره سفارش"
              disabled
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-text-field-component
              v-model="order.tracking_code"
              label="کد پیگیری"
              :disabled="!editStatus"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-date-picker
              :label="`تاریخ تحویل`"
              :disable-past="true"
              v-model="order.delivery_date"
              :initial-value="order.delivery_date"
              :disabled="!editStatus"
            />
          </v-col>
          <v-col
            cols="12"
            md="6"
          >
            <custom-auto-complete-component
              v-model="order.status"
              :label="'وضعیت پرداخت'"
              :items="statuses"
              :returnObject="false"
              :item-text="'name'"
              :item-value="'id'"
              :disabled="!editStatus"
            />
          </v-col>
          <v-col
            cols="12"
          >
            <div class="account-form-action-box" v-if="editStatus">
              <button class="account-form-action second-btn" @click="cancelEditStatus">لغو</button>
              <button class="account-form-action main-btn" @click="doEditStatus">ثبت وضعیت</button>
            </div>
          </v-col>
        </v-row>
      </div>
    </div>
    <div class="account-form">
      <div class="account-form-header">
        <div class="account-form-right-box">
          <img src="/main/account/account.svg" alt="">
          <span class="account-form-title">اطلاعات سفارش</span>
        </div>
      </div>
      <v-divider/>
      <div class="account-form-content">
        <v-row>
          <v-col
            cols="12"
          >
            <order-list-item-component
              v-for="(i,n) in order.items"
              :key="n"
              :product="i.product"
              :quantity="i.quantity"
              :attributes="i.attributes"
            />
          </v-col>
        </v-row>
      </div>
    </div>
  </main>
</template>

<script>
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomDatePicker from "~/components/form/CustomDatePicker";
import OrderListItemComponent from "~/components/order/OrderListItemComponent";

export default {
  name: "ShowOrderPage",
  components: {OrderListItemComponent, CustomDatePicker, CustomAutoCompleteComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      editAddress: false,
      editStatus: false,
      order: {
        id: '',
        full_name: '',
        phone_number: '',
        city: null,
        province: null,
        address: '',
        plate: '',
        unit: '',
        postal_code: '',
        order_id: '',
        tracking_code: '',
        delivery_date: '',
        status: 'created',
        items: [],
      },
      rules: {
        full_name: [val => (val || '').length > 0 || 'لطفا نام و نام خانوادگی گیرنده را وارد کنید'],
        phone_number: [val => (val || '').length > 0 || 'لطفا شماره تلفن همراه گیرنده را وارد کنید'],
        address: [val => (val || '').length > 0 || 'لطفا آدرس گیرنده را وارد کنید'],
        plate: [val => (val || '').length > 0 || 'لطفا شماره پلاک را وارد کنید'],
        unit: [val => (val || '').length > 0 || 'لطفا شماره واحد را وارد کنید'],
        postal_code: [val => (val || '').length > 0 || 'لطفا کد پستی را وارد کنید'],
        province: [val => val || 'لطفا استان را انتخاب کنید'],
        city: [val => val || 'لطفا شهر را انتخاب کنید کنید'],
      },
      statuses: [
        {
          id: 'created',
          name: 'ایجاد شده'
        },
        {
          id: 'in_progress',
          name: 'در حال بررسی'
        },
        {
          id: 'payed',
          name: 'پرداخت شده‌(در حال بررسی)'
        },
        {
          id: 'delivered',
          name: 'تحویل شده'
        },
        {
          id: 'returned',
          name: 'بازگشت به انبار'
        },
        {
          id: 'canceled',
          name: 'لغو شده (توسط کاربر)'
        },
      ],
      selectedAddress: {
        recipient_full_name: '',
        recipient_phone_number: '',
        city: null,
        province: null,
        address: '',
        plate: '',
        unit: '',
        postal_code: '',
      },
      selectedStatus: {
        order_id: '',
        tracking_code: '',
        delivery_date: '',
        status: '',
      }
    }
  },
  mounted() {
    this.getProvinces()
    this.getOrder()
  },
  methods: {
    getProvinces() {
      this.$store.dispatch('province/getProvinces', {})
    },
    getOrder() {
      const orderId = this.$route.params.id
      this.$store.dispatch('order/getOrder', orderId)
        .then(res => {
          const data = res.data.data;
          this.order = {
            ...data,
            items: [
              ...data.items
            ]
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    openEditAddress() {
      this.selectedAddress = {
        recipient_full_name: this.order.recipient_full_name,
        recipient_phone_number: this.order.recipient_phone_number,
        city: this.order.city,
        province: this.order.province,
        address: this.order.address,
        plate: this.order.plate,
        unit: this.order.unit,
        postal_code: this.order.postal_code,
      }
      this.toggleEditAddress()
    },
    toggleEditAddress() {
      this.editAddress = !this.editAddress
    },
    cancelEditAddress() {
      this.resetAddress()
      this.toggleEditAddress()
    },
    resetAddress() {
      this.order.recipient_full_name = this.selectedAddress.recipient_full_name
      this.order.recipient_phone_number = this.selectedAddress.recipient_phone_number
      this.order.city = this.selectedAddress.city
      this.order.province = this.selectedAddress.province
      this.order.address = this.selectedAddress.address
      this.order.plate = this.selectedAddress.plate
      this.order.unit = this.selectedAddress.unit
      this.order.postal_code = this.selectedAddress.postal_code
      this.selectedAddress = {
        recipient_full_name: '',
        recipient_phone_number: '',
        city: null,
        province: null,
        address: '',
        plate: '',
        unit: '',
        postal_code: '',
      }
    },
    doEditAddress() {
      const data = {
        ...this.order,
      }
      delete data.items
      delete data.city
      delete data.province
      this.$store.dispatch('order/updateOrder', data)
        .then(()=>{
          this.$toast.success('با موفقیت انچام شد')
        })
        .finally(res => {
          this.getOrder()
        })
      this.toggleEditAddress()
    },
    openEditStatus() {
      this.selectedStatus = {
        order_id: this.order.order_id,
        tracking_code: this.order.tracking_code,
        delivery_date: this.order.delivery_date,
        status: this.order.status,
      }
      this.toggleEditStatus()
    },
    toggleEditStatus() {
      this.editStatus = !this.editStatus
    },
    cancelEditStatus() {
      this.resetStatus()
      this.toggleEditStatus()
    },
    resetStatus() {
      this.order.order_id = this.selectedAddress.order_id
      this.order.tracking_code = this.selectedAddress.tracking_code
      this.order.delivery_date = this.selectedAddress.delivery_date
      this.order.status = this.selectedAddress.status
      this.selectedAddress = {
        order_id: '',
        tracking_code: '',
        delivery_date: '',
        status: '',
      }
    },
    doEditStatus() {
      const data = {
        ...this.order,
      }
      delete data.items
      delete data.city
      delete data.province
      this.$store.dispatch('order/updateOrder', data)
        .then(() => {
          this.$toast.success('با موفقیت انجام شد')
        })
        .finally(res => {
          this.getOrder()
        })
      this.toggleEditStatus()
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    provinces() {
      return this.$store.getters['province/getList']
    },
    cities() {
      if (this.order.province) {
        return this.order.province.cities
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>

</style>
