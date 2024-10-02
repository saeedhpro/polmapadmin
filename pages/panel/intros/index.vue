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
                <span class="account-form-title">لیست intro ها</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <data-table-component
                :headers="headers"
                :page="filters.page"
                :last-page="intros.meta.last_page"
                :total="intros.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in intros.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.title | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateIntro(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="intros.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <update-intro-component
      :open="showUpdate"
      :item="intro"
      v-if="intro"
      @close="closeUpdateIntro"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import UpdateIntroComponent from "~/components/intro/UpdateIntroComponent.vue";

export default {
  name: "index.vue",
  components: {UpdateIntroComponent, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'متن',
        'وضعیت',
        'عملیات',
      ],
      showDelete: false,
      showUpdate: false,
      showCreate: false,
      intro: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getIntros() {
      this.$store.dispatch('intro/getIntros', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getIntros()
    },
    toggleShowDeleteIntro(intro) {
      this.intro = intro
      this.showDelete = true
    },
    toggleShowUpdateIntro(intro) {
      this.intro = intro
      this.showUpdate = true
    },
    toggleShowCreateIntro() {
      this.showCreate = true
    },
    cancelDeleteIntro() {
      this.intro = null
      this.showDelete = false
    },
    cancelUpdateIntro() {
      this.intro = null
      this.showUpdate = false
    },
    closeUpdateIntro() {
      this.intro = null
      this.showUpdate = false
      this.paginate()
    },
    cancelCreateIntro() {
      this.showCreate = false
      this.paginate(this.filters.page)
    },
    removeIntro() {
      this.$store.dispatch('intro/removeIntro', this.intro.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteIntro()
        })
    },
    updateIntro() {
      this.$store.dispatch('intro/updateIntro', this.intro)
        .then(res => {
          this.paginate()
          this.cancelUpdateIntro()
        })
    },
    showIntroChildren(i) {
      this.$router.push(`/panel/intros/${i.id}`)
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    intros() {
      return this.$store.getters['intro/getIntros']
    }
  }
}
</script>

<style scoped>

</style>
