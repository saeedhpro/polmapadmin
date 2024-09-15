<template>
  <v-navigation-drawer
    absolute
    temporary
    right
    v-model="openDrawer"
    class="sidebar-menu"
  >
    <template v-slot:prepend>
      <v-list-item two-line>
        <v-list-item-avatar>
          <img :src="loginUser && loginUser.avatar ? loginUser.avatar : '/main/header/account.svg'" alt="">
        </v-list-item-avatar>

        <v-list-item-content v-if="loginUser">
          <v-list-item-title>
            {{ loginUser.full_name }}
          </v-list-item-title>
          <v-list-item-subtitle  class="dir-ltr">
            {{ loginUser.phone_number }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-divider></v-divider>

    <v-list dense>
      <v-list-item
      >
        <v-list-item-content class="account-box drawer">
          <div class="right-box">
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
                    <img src="/main/account/like.svg" alt="">
                    <img src="/main/account/like-active.svg" class="active" alt="">
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
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "RightSideBarDrawer",
  props: {
    open: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  methods: {
    exit() {
      this.$store.dispatch('login/logout')
      window.location.href = '/'
    },
  },
  computed: {
    openDrawer: {
      get() {
        return this.open
      },
      set(val) {
        if (!val) {
          this.$emit('toggle')
        }
      }
    },
    loginUser() {
      return this.$store.getters['login/getUser']
    }
  }
}
</script>

<style scoped>

</style>
