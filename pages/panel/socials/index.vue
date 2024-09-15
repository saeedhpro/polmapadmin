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
                <span class="account-form-title">شبکه های اجتماعی</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleCreateModal"
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
                :last-page="socials.meta.last_page"
                :total="socials.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in socials.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">
                      <v-img :src="i.image" width="60px" height="60px" class="rounded" alt="" />
                    </td>
                    <td class="text-center">
                      {{ i.name }}
                    </td>
                    <td class="text-center">
                      <a :href="i.link" target="_blank">لینک</a>
                    </td>
                    <td class="text-center">{{ i.is_active ? 'فعال' : 'غیرفعال' }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateSocial(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                          </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteSocial(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="socials.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDeleteSocial"
      :title="`شبکه اجتماعی`"
      @remove="removeSocial"
      @close="cancelDeleteSocial"
    />
    <create-social-component
      :open="showCreate"
      @close="closeCreateModal"
    />
    <update-social-component
      :open="showUpdate"
      @close="closeUpdateModal"
      :item="social"
      v-if="social"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateSocialComponent from "~/components/social/CreateSocialComponent";
import UpdateSocialComponent from "~/components/social/UpdateSocialComponent";

export default {
  name: "index.vue",
  components: {UpdateSocialComponent, CreateSocialComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
        category: '',
        type: '',
      },
      headers: [
        '',
        'تصویر',
        'عنوان',
        'لینک',
        'وضعیت',
        'عملیات',
      ],
      social: null,
      showDeleteSocial: false,
      showCreate: false,
      showUpdate: false,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getSocials() {
      this.$store.dispatch('social/getSocials', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getSocials()
    },
    toggleShowUpdateSocial(social) {
      this.social = social
      this.showUpdate = true
    },
    closeUpdateModal() {
      this.showUpdate = false
      this.social = null
      this.paginate()
    },
    toggleShowDeleteSocial(social) {
      this.social = social
      this.showDeleteSocial = true
    },
    cancelDeleteSocial() {
      this.social = null
      this.showDeleteSocial = false
    },
    toggleCreateModal() {
      this.showCreate = !this.showCreate
    },
    closeCreateModal() {
      this.toggleCreateModal()
      this.paginate()
    },
    removeSocial() {
      this.$store.dispatch('social/removeSocial', this.social.id)
        .then(res => {
          this.getSocials()
          this.cancelDeleteSocial()
        })
    },
    getCategory(category) {
      switch (category) {
        case 'string':
          return 'رشته'
        case 'integer':
          return 'عدد'
        case 'color':
          return 'رنگ'
      }
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    socials() {
      return this.$store.getters['social/getSocials']
    }
  }
}
</script>

<style scoped>

</style>
