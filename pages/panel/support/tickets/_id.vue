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
                <span class="account-form-title">{{ ticket.title }}</span>
              </div>
            </div>
            <v-divider/>
            <div class="account-form-content">
              <div class="ticket " :class="{'own-ticket': t.user && t.user.id === ticket.user_id}" v-for="(t,i) in ticket.children" :key="i">
                <div class="ticket-user-profile">
                  <img src="/main/account/account.svg" alt="">
                </div>
                <div class="ticket-date">
                  <span>ارسال توسط: {{t.user?.full_name}}</span>
                  <span>در تاریخ: {{t.created_at ? `${$moment(t.created_at).format("jYYYY/jMM/jDD HH:mm")}` : ''}}</span>
                </div>
                <div class="ticket-title">
                  <span>{{ t.title }}</span>
                </div>
                <div class="ticket-description">
                  {{ t.description }}
                </div>
              </div>
              <div class="ticket own-ticket" v-if="ticket.id !== 0">
                <div class="ticket-user-profile">
                  <img src="/main/account/account.svg" alt="">
                </div>
                <div class="ticket-date">
                  <span>ارسال توسط: {{ticket.user?.full_name}}</span>
                  <span>در تاریخ: {{ticket.created_at ? `${$moment(ticket.created_at).format("jYYYY/jMM/jDD HH:mm")}` : ''}}</span>
                </div>
                <div class="ticket-title">
                  <span>{{ ticket.title }}</span>
                </div>
                <div class="ticket-description">
                  {{ ticket.description }}
                </div>
              </div>
              <hr />
              <div class="answer-box mt-8">
                <div class="answer-title">
                  <span>پاسخ به تیکت</span>
                  <button
                    @click="answerTicket"
                    class="answer-btn"
                  >
                    <loading v-if="loading"/>
                    <span v-else>ارسال پاسخ</span>
                  </button>
                </div>
                <div class="answer-description-box">
                  <custom-text-area-component
                    v-model="answer.description"
                    label="پاسخ به تیکت"
                    :rows="4"
                  />
                  <input type="file" accept="image/*;application/pdf" ref="image" @change="onFileChange">
                </div>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import CustomTextFieldComponent from "~/components/form/CustomTextFieldComponent";
import CustomAutoCompleteComponent from "~/components/form/CustomAutoCompleteComponent";
import CustomDatePicker from "~/components/form/CustomDatePicker";
import CustomTextAreaComponent from "~/components/form/CustomTextAreaComponent.vue";

export default {
  name: "index",
  components: {CustomTextAreaComponent, CustomDatePicker, CustomAutoCompleteComponent, CustomTextFieldComponent},
  layout: "panel",
  data() {
    return {
      loading: false,
      tab: 0,
      answer: {
        id: 0,
        status: '',
        title: '',
        description: '',
        file: '',
        new_file: '',
        is_published: '',
        user_id: null,
        user: null,
        subject_id: null,
        subject: null,
        status_fa: '',
        parent_id: null,
        parent: null,
        created_at: '',
        children: []
      },
      ticket: {
        id: 0,
        status: '',
        description: '',
        file: '',
        is_published: '',
        user_id: null,
        user: null,
        subject_id: null,
        subject: null,
        status_fa: '',
        parent_id: null,
        parent: null,
        created_at: '',
        children: []
      },
    }
  },
  mounted() {
    this.getTicket()
  },
  methods: {
    getTicket() {
      this.$store.dispatch('support/getTicket', this.$route.params.id)
        .then(res => {
          const ticket = res.data.data
          this.setTicket(ticket)
        })
    },
    setTicket(ticket) {
      this.ticket = {
        id: ticket.id,
        title: ticket.title,
        status: ticket.status,
        description: ticket.description,
        file: ticket.file,
        is_published: ticket.is_published,
        user_id: ticket.user_id,
        user: ticket.user,
        subject_id: ticket.subject_id,
        subject: ticket.subject,
        status_fa: ticket.status_fa,
        parent_id: ticket.parent_id,
        parent: ticket.parent,
        created_at: ticket.created_at,
        children: ticket.children,
      }
      this.answer.title = ticket.title
      this.answer.subject_id = ticket.subject_id
    },
    resetAnswer() {
      this.answer = {
        id: 0,
        status: '',
        title: this.ticket.title,
        description: '',
        file: '',
        new_file: '',
        is_published: '',
        user_id: null,
        user: null,
        subject_id: this.ticket.subject_id,
        subject: null,
        status_fa: '',
        parent_id: null,
        parent: null,
        created_at: '',
        children: []
      }
    },
    answerTicket() {
      this.loading = true
      const data = {
        ...this.answer,
        id: this.ticket.id,
      }
      this.$store.dispatch('support/createTicketAnswer', data)
        .then(res => {
          this.resetAnswer()
          this.getTicket()
          this.$toast.success('با موفقیت ثبت شد')
        })
        .catch(err => {
          if(err.response) {
            const errors = err.response.data.errors
            for (const e in errors) {
              this.$toast.error(errors[e][0])
            }
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    onFileChange(e) {
      if (e.target.files[0]) {
        this.uploadFile(e.target.files[0])
      }
    },
    uploadFile(file) {
      const data = new FormData()
      data.set("file", file)
      this.$store.dispatch('upload/upload', data)
        .then((res) => {
          this.answer.new_file = res.data.url
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
