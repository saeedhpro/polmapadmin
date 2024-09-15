<template>
  <v-dialog
    v-model="show"
    persistent
    max-width="768px"
  >
    <v-card
      class="create-update-modal"
    >
      <v-card-title
        class="create-update-modal-title-box"
      >
        <div class="create-update-modal-title">
          <button
            @click="closeForm"
            class="create-update-modal-close"
          >
            <v-icon>mdi-close</v-icon>
          </button>
          <span>ایجاد تخصص</span>
        </div>
        <v-spacer/>
      </v-card-title>
      <v-divider/>
      <v-card-text class="filter-content">
        <v-row>
          <v-col
            cols="12"
          >
            <custom-text-field-component
              v-model="skill.name"
              :label="'عنوان'"
            />
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-container>
          <v-row>
            <v-spacer/>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click="reset"
                  class="account-form-action second-btn"
                >
                  پاک کردن
                </button>
              </div>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="4"
            >
              <div
                class="account-form-action-box"
              >
                <button
                  @click="create"
                  class="account-form-action main-btn"
                >
                  ایجاد
                </button>
              </div>
            </v-col>
          </v-row>
        </v-container>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";

export default {
  name: "CreateSkillComponent",
  components: {CustomTextFieldComponent},
  props: {
    open: {
      type: Boolean,
      required: true,
    }
  },
  data() {
    return {
      skill: {
        name: '',
      }
    }
  },
  methods: {
    closeForm() {
      return this.$emit('close')
    },
    reset() {
      this.skill = {
        name: '',
      }
    },
    create() {
      this.$store.dispatch('skill/createSkill', this.skill)
        .then(res => {
          this.$toast.success('با موفقیت ثبت شد')
          this.closeForm()
          this.reset()
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            for (const e in errors) {
              this.$toast.error(errors[e][0])
            }
          }
        })
    }
  },
  computed: {
    show() {
      return this.open;
    },
  },
}
</script>

<style scoped>

</style>
