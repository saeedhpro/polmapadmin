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
                <span class="account-form-title">لیست تخصص ها</span>
              </div>
              <div class="action-box">
                <v-btn
                  icon
                  @click="toggleShowCreateSkill"
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
                :last-page="skills.meta.last_page"
                :total="skills.meta.total"
                @paginate="paginate"
              >
                <template v-slot:body>
                  <tr v-for="(i, n) in skills.data" :key="n">
                    <td class="text-center">{{ (filters.page - 1) * 10 + n + 1 | toPersianNumber }}</td>
                    <td class="text-center">{{ i.name | toPersianNumber }}</td>
                    <td class="text-center">
                      <div class="action-box">
                        <v-btn
                          icon
                          @click="toggleShowUpdateSkill(i)"
                        >
                          <v-icon>mdi-pencil-outline</v-icon>
                        </v-btn>
                        <v-btn
                          icon
                          @click="toggleShowDeleteSkill(i)"
                        >
                          <v-icon color="#E85C2F">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-slot:notfound>
                  <div v-if="skills.meta.total === 0">اطلاعاتی یافت نشد</div>
                </template>
              </data-table-component>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <show-delete-modal
      :open="showDelete"
      :title="`تخصص`"
      @remove="removeSkill"
      @close="cancelDeleteSkill"
    />
    <create-skill-component
      :open="showCreate"
      @close="cancelCreateSkill"
    />
    <update-skill-component
      :open="showUpdate"
      :item="skill"
      v-if="skill"
      @close="closeUpdateSkill"
    />
  </main>
</template>

<script>
import DataTableComponent from "~/components/global/DataTableComponent";
import ShowDeleteModal from "~/components/global/ShowDeleteModal";
import CreateSkillComponent from "~/components/skill/CreateSkillComponent";
import UpdateSkillComponent from "~/components/skill/UpdateSkillComponent";

export default {
  name: "index.vue",
  components: {CreateSkillComponent, UpdateSkillComponent, ShowDeleteModal, DataTableComponent},
  layout: "panel",
  data() {
    return {
      filters: {
        page: 1,
        q: '',
      },
      headers: [
        '',
        'عنوان',
        'عملیات',
      ],
      showDelete: false,
      showUpdate: false,
      showCreate: false,
      skill: null,
    }
  },
  mounted() {
    this.paginate()
  },
  methods: {
    getSkills() {
      this.$store.dispatch('skill/getSkills', this.filters)
    },
    paginate(page = 1) {
      this.filters.page = page
      this.getSkills()
    },
    toggleShowDeleteSkill(skill) {
      this.skill = skill
      this.showDelete = true
    },
    toggleShowUpdateSkill(skill) {
      this.skill = skill
      this.showUpdate = true
    },
    toggleShowCreateSkill() {
      this.showCreate = true
    },
    cancelDeleteSkill() {
      this.skill = null
      this.showDelete = false
    },
    cancelUpdateSkill() {
      this.skill = null
      this.showUpdate = false
    },
    closeUpdateSkill() {
      this.skill = null
      this.showUpdate = false
      this.paginate()
    },
    cancelCreateSkill() {
      this.showCreate = false
      this.paginate(this.filters.page)
    },
    removeSkill() {
      this.$store.dispatch('skill/removeSkill', this.skill.id)
        .then(res => {
          this.paginate()
          this.cancelDeleteSkill()
        })
    },
    updateSkill() {
      this.$store.dispatch('skill/updateSkill', this.skill)
        .then(res => {
          this.paginate()
          this.cancelUpdateSkill()
        })
    },
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    skills() {
      return this.$store.getters['skill/getSkills']
    }
  }
}
</script>

<style scoped>

</style>
