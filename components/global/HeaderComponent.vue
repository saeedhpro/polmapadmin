<template>
  <v-app-bar
    color="#ffffff"
    height="auto"
    class="header-component"
    :fixed="!mini"
  >
    <v-container
      fluid
      class="pb-0"
    >
      <div class="hidden-md-and-up header-top-box justify-space-between">
        <v-btn
          icon
          @click="toggleDrawer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="17.5" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </v-btn>
        <nuxt-link to="/" class="logo-box">
          <img :src="settings.site_logo" alt="">
        </nuxt-link>
      </div>
      <div class="hidden-sm-and-down header-top-box">
        <nuxt-link to="/" class="logo-box">
          <img src="/main/logo.png" alt="">
        </nuxt-link>
        <v-spacer/>
        <div class="profile-box">
          <div
            v-if="loginUser"
            class="profile-button-login"
          >
            <img src="/main/header/account-white.svg" alt="">
            <span class="user-name">{{ loginUser.full_name }}</span>
            <v-icon class="dropdown" color="#ffffff">mdi-chevron-down</v-icon>
            <div class="drop-box">
              <div class="dropdown-menu-box">
                <a
                  class="dropdown-link"
                  @click="logout"
                >
                  <img src="/main/header/logout.svg" alt="">
                  <img class="active" src="/main/header/logout-active.svg" alt="">
                  <span class="dropdown-text">خروج</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="hidden-sm-and-down header-bottom-box">
        <navbar-component/>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import NavbarComponent from "~/components/global/NavbarComponent";

export default {
  name: "HeaderComponent",
  components: {NavbarComponent},
  data() {
    return {
      q: '',
      showCartBox: false,
      isPassword: true,
      showLoginModal: false,
      showRegisterModal: false,
      codeSent: false,
      otpDisabled: true,
      login: {
        phone_number: '',
        password: '',
        rules: {
          phone_number: [val => (val || '').length > 0 || 'لطفا شماره موبایل خود را وارد کنید'],
          password: [val => (val || '').length > 0 || 'لطفا رمز عبور خود را وارد کنید'],
        }
      },
      register: {
        full_name: '',
        phone_number: '',
        password: '',
        otp: '',
        rules: {
          full_name: [val => (val || '').length > 0 || 'لطفا نام و نام خانوادگی خود را وارد کنید'],
          phone_number: [val => (val || '').length > 0 || 'لطفا شماره موبایل خود را وارد کنید'],
          password: [val => (val || '').length > 0 || 'لطفا رمز عبور خود را وارد کنید'],
        }
      },
    }
  },
  methods: {
    search() {
      this.$router.push({
        path: '/search',
        query: {
          q: this.q,
        }
      })
    },
    toggleShowCartBox() {
      this.showCartBox = !this.showCartBox
    },
    toggleLoginModal() {
      this.showLoginModal = !this.showLoginModal
    },
    toggleRegisterModal() {
      this.showRegisterModal = !this.showRegisterModal
    },
    openLoginForm() {
      this.toggleRegisterModal()
      this.toggleLoginModal()
    },
    openRegisterForm() {
      this.toggleLoginModal()
      this.toggleRegisterModal()
    },
    toggleIsPassword() {
      this.isPassword = !this.isPassword
    },
    toggleOtpDisabled() {
      this.otpDisabled = !this.otpDisabled
    },
    timeEnded() {
      this.toggleSentCode()
    },
    toggleSentCode() {
      this.codeSent = !this.codeSent
    },
    doLogin() {
      this.$store.dispatch('login/login', this.login)
        .then(res => {
          this.toggleLoginModal()
        })
        .catch(err => {
          console.log(err, "login err")
        })
    },
    registerUser() {
      this.toggleSentCode()
    },
    logout() {
      this.$store.dispatch('login/logout')
      window.location.href = '/'
    },
    createOrder() {
      console.log('created')
    },
    toggleDrawer() {
      this.$emit('toggle')
    }
  },
  computed: {
    settings() {
      return this.$store.getters['settings/getSettings']
    },
    loginDisabled() {
      return this.login.phone_number === '' && this.login.password === ''
    },
    registerDisabled() {
      return this.register.full_name === '' && this.register.phone_number === '' && this.register.password === ''
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    cart() {
      return this.$store.getters['cart/getCart']
    },
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    }
  }
}
</script>

<style scoped>

</style>
