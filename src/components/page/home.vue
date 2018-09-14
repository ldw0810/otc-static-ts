<template lang="pug">
  .appPage
    .mainLayer
      <!--headerBar(id="header" class='g-shadow')-->
      transition(name="fade" mode="out-in")
        router-view(id="page")
      footerBar(id="footer" :class="{'fixed': isFooter}")
</template>
<script lang="ts">
  // todo popEmail弹窗待渲染
  // <Modal v-model="popEmail" class-name="m-ivu-modal" width='480' :mask-closable="true"
  // :closable="false" @on-visible-change="popEmailTrigger">
  //   <auth_email ref="auth_email" @close="popEmail = false"/>
  //   <div slot="footer"></div>
  //   </Modal>
  import Vue from 'vue'
  // import headerBar from '../../components/common/header.vue'
  import {Component, Watch} from 'vue-property-decorator'
  import footerBar from '../../components/common/footer.vue'
  // import auth_email from '../../components/public/auth_email_pop'

  @Component({
    footerBar
  })
  export default class home extends Vue {
    isFooter: boolean = false
    popEmail: boolean = false

    get showAuthEmail () {
      return this.$store.state.showAuthEmail
    }

    get userInfo () {
      return this.$store.state.userInfo
    }

    goHome (): void {
      this.$router.push('/')
    }

    @Watch('showAuthEmail')
    changeAuthEmail (val: string) {
      if (!val) {
        this.$store.commit('showAuthEmail_setter', 0)
      }
    }

    popEmailTrigger (val: string | boolean) {
      if (!val) {
        this.$store.commit('showAuthEmail_setter', 0)
      }
    }

    // beforeRouteEnter (to, from, next) {
    //   next(vm => {
    //     if (localStorage.getItem('userToken')) {
    //       vm.$store.dispatch('ajax_me')
    //     }
    //     vm.$store.dispatch('ajax_currency_code').then(res => {
    //       if (res.data && +res.data.error === 0) {
    //         vm.$store.commit('code_setter', res.data)
    //       } else {
    //         // this.$Message.error(this.$t("public.ads_request_fail"));
    //       }
    //     }).catch(() => {
    //       // this.$Message.error(this.$t("public.ads_request_fail"));
    //     })
    //   })
    // }

//     mounted () {
//       this.$Message.config({
//         duration: 3
//       })
//       if (this.$route.query) {
//         if (this.$route.query.withdraw_token) {
//           this.$store.dispatch('ajax_withdraw_confirm', {
//             code: this.$route.query.withdraw_token
//           }).then(res => {
//             if (res.data && +res.data.error === 0) {
//               this.$alert.success({
//                 content: this.$t('asset.asset_withdraw_confirm_success'),
//                 onClose: this.$goReplace(this.$route.path, this.$route.query, 'withdraw_token')
//               })
//             } else {
//               this.$alert.error({
//                 title: this.$t('public.error_title_default'),
//                 content: this.$t('asset.asset_withdraw_confirm_fail'),
//                 onClose: () => {
//                   this.$goReplace(this.$route.path, this.$route.query, 'withdraw_token')
//                 }
//               })
//             }
//           }).catch(err => {
//             // this.$Message.error(this.$t("asset.asset_withdraw_confirm_fail"));
//             this.$alert.error({
//               title: this.$t('public.error_title_default'),
//               content: this.$t('asset.asset_withdraw_confirm_fail'),
//               onClose: () => {
//                 this.$goReplace(this.$route.path, this.$route.query, 'withdraw_token')
//               }
//             })
//           })
//         } else if (this.$route.query.activation_token) {
//           this.$store.dispatch('ajax_email_verified', {
//             token: this.$route.query.activation_token
//           }).then(res => {
//             if (res.data && +res.data.error === 0) {
//               this.$alert.success({
//                 content: this.$t('public.email_activation_success'),
//                 onClose: () => {
//                   this.$goReplace(this.$route.path, this.$route.query, 'activation_token')
//                 }
//               })
//             } else {
//               this.$alert.error({
//                 title: this.$t('public.error_title_default'),
//                 content: this.$t('public.activation_link_notValid'),
//                 onClose: () => {
//                   this.$goReplace(this.$route.path, this.$route.query, 'activation_token')
//                 }
//               })
//             }
//           }).catch(err => {
//             this.$alert.error({
//               title: this.$t('public.error_title_default'),
//               content: this.$t('public.activation_link_notValid'),
//               onClose: () => {
//                 this.$goReplace(this.$route.path, this.$route.query, 'activation_token')
//               }
//             })
//           })
//         } else if (this.$route.query.invitationCode) {
// //                    window.localStorage.setItem("invitationCode", this.$route.query.invitationCode);
//         }
//       }
//     }
  }
</script>
<style lang='stylus' scoped>
  html, body, .container, .mainLayer {
    min-height: 100vh;
  }

  .mainLayer {
    display: flex;
    flex-direction: column;
    background-color: #fafbfd;
    display: block \0;
  }

  .popLayer {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 99;
  }

  #header {
    height: 76px;
    z-index: 2;
  }

  #footer {
    height: 60px;
    z-index: 2;
  }

  #page {
    /* z-index: 0; */
    flex: 1;
    /* padding-bottom: 30px; */
  }
</style>
