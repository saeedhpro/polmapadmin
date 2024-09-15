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
                <span class="account-form-title">کارت های بانکی</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateCard"
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
                :last-page="cards.meta.last_page"
                :total="cards.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in cards.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.full_name | toPersianNumber }}</td>
                    <td class="text-center">{{ i.bank_name | toPersianNumber }}</td>
                    <td class="text-center dir-ltr">{{ i.number | toPersianNumber }}</td>
                    <td class="text-center">{{ i.sheba }}</td>
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
                          @click="toggleShowDeleteCard(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="cards.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`کارت بانکی`"
      @remove="removeCard"
      @close="cancelDeleteCard"
    />
    <show-card-component
      :open="show"
      :item="card"
      @close="closeShowItem"
      v-if="card"
    />
    <create-card-form
      :open="showCreateCard"
      @close="closeShowCreateCard"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import ShowCardComponent from "~/components/card/ShowCardForm";
import CreateCardForm from "~/components/card/CreateCardForm";

export default {
  name: "index.vue",
  components: {CreateCardForm, ShowCardComponent, ShowDeleteModal, DataTableComponent},
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
        'نام بانک',
        'شماره کارت',
        'شماره شبا',
        'عملیات',
      ],
      showDelete: false,
      showCreateCard: false,
      show: false,
      card: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getCards() {
      this.$store.dispatch('card/getCards', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getCards()
    },
    closeShowCreateCard() {
      this.toggleShowCreateCard()
      this.getCards()
    },
    toggleShowCreateCard() {
      this.showCreateCard = !this.showCreateCard
    },
    toggleShowDeleteCard(card) {
      this.card = card
      this.showDelete = true
    },
    cancelDeleteCard() {
      this.card = null
      this.showDelete = false
    },
    removeCard() {
      this.$store.dispatch('card/removeCard', this.card.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteCard()
        })
    },
    openShowItem(item) {
      this.card = item
      this.show = true
    },
    closeShowItem() {
      this.show = false
      this.card = null
      this.getCards()
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    cards() {
      return this.$store.getters['card/getCards']
    }
  }
}
</script>

<style scoped>

</style>
