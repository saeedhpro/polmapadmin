<template>
  <v-app
    dir="rtl"
  >
    <header-component @toggle="toggleDrawer"/>
    <right-side-bar-drawer :open="openDrawer" @toggle="openDrawer = false"/>
    <div class="account-box page" :class="{'mini': mini}">
      <div class="right-box" v-if="!mini">
        <nuxt-link to="/panel" class="right-box-header">
          <div class="right-header-icon">
            <img src="/main/header/account.svg" alt="">
          </div>
          <div class="right-name-box" v-if="loginUser">
            <div class="user-name">
              {{ loginUser.full_name }}
            </div>
            <div class="user-phone">
              {{ loginUser.phone_number }}
            </div>
          </div>
        </nuxt-link>
        <div class="right-box-content">
          <div class="account-menu-item-list">
            <nuxt-link class="right-box-menu" to="/panel/users">
              <div class="icon-box">
                <img src="/main/account/account.svg" alt="">
                <img src="/main/account/account-active.svg" class="active" alt="">
              </div>
              <span class="link-text">کاربران</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/orders">
              <div class="icon-box">
                <img src="/main/account/bag.svg" alt="">
                <img src="/main/account/bag-active.svg" class="active" alt="">
              </div>
              <span class="link-text">سفارشات</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/categories">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">دسته بندی ها</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/products">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">محصولات</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/attributes">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">ویژگی ها محصول</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/specials">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">فروش ویژه</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/sliders">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">اسلایدر اصلی</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/socials">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">شبکه های اجتماعی</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/coupons">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">تخفیفات</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/articles">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">مقالات</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/comments">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">نظرات</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/questions">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">پرسش و پاسخ ها</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/requests">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">درخواست ها</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/contacts">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">ارتباط با ما</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/addresses">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">آدرس های انبار</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/cards">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">کارت های بانکی</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/skills">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">تخصص ها</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/brands">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">برند ها</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/customers">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">مشتری ها</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/services">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">خدمات</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/faq">
              <div class="icon-box">
                <img src="/main/account/like.svg" alt="">
                <img src="/main/account/like-active.svg" class="active" alt="">
              </div>
              <span class="link-text">سوالات متداول</span>
            </nuxt-link>
            <nuxt-link class="right-box-menu" to="/panel/settings">
              <div class="icon-box">
                <img src="/main/account/box.svg" alt="">
                <img src="/main/account/box-active.svg" class="active" alt="">
              </div>
              <span class="link-text">تنظیمات</span>
            </nuxt-link>
            <a class="right-box-menu" @click="exit">
              <div class="icon-box">
                <img src="/main/account/logout.svg" alt="">
                <img src="/main/account/logout-active.svg" class="active" alt="">
              </div>
              <span class="link-text">خروج</span>
            </a>
          </div>
        </div>
      </div>
      <Nuxt/>
    </div>
  </v-app>
</template>

<script>
import HeaderComponent from "~/components/global/HeaderComponent";
import RightSideBarDrawer from "~/components/drawer/RightSideBarDrawer";

export default {
  components: {RightSideBarDrawer, HeaderComponent},
  middleware: "auth",
  data() {
    return {
      open: false,
      openDrawer: false,
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('login/logout')
      window.location.href = '/'
    },
    toggleDrawer() {
      this.openDrawer = !this.openDrawer
    }
  },
  computed: {
    mini() {
      return this.$vuetify.breakpoint.mdAndDown
    },
    loginUser() {
      return this.$store.getters["login/getUser"]
    },
  },
}
</script>
