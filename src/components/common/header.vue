<template lang="pug">
  .header(ref="header")
    .header-inner
      .header-logo
        router-link(to='/')
          img(class='header-logo-asset' v-lazy="../../static/images/LOGO.png")
      nav(class="header-nav" v-if='!userInfo.soft_disabled')
        ul(class='header-navbar')
          li(class='header-navbar-item' :class="{'active': Array.isArray(item.index) && item.index.indexOf(+header_index) > -1 }" v-for='(item, index) in menus' :key='index')
            Dropdown(:ref='"menu-" + index')
              .header-navbar-item-wrapper
                a(class='header-navbar-item-link' href="javascript:void(0)" @click='goMenu(item)') {{item.title}}
                Icon(class='header-navbar-item-icon header-navbar-item-icon-append ' type="arrow-down-b" v-if='item.children.length')
              DropdownMenu(class='header-navbar-dropdown' slot="list" v-if='item.children.length')
                DropdownItem(:class="{'active': childItem.index === header_index}" v-for='(childItem, i) in item.children' :key='i')
                  a(@click='goMenu(childItem)') {{childItem.title}}
      nav(class="header-frozen" v-else)
        .header-frozen-text {{$i18n.translate('user.user_frozen')}}
      nav(class='header-nav header-login' v-if='!userToken')
        ul(class='header-navbar')
          li(class='header-navbar-item' :class="{'active': item.index === header_index}" v-for='(item, index) in logins' :key='index')
            Dropdown
              div(:class="{'header-navbar-item-wrapper': item.url}" @click="goMenu(item)")
                .header-navbar-item-link {{item.title}}
                Icon(class='header-navbar-item-icon header-navbar-item-icon-append' type="arrow-down-b" v-if='item.children.length')
              DropdownMenu(class='header-navbar-dropdown' slot="list" v-if='item.children.length')
                DropdownItem(:class="{'active': childItem.index === header_index}" v-for='(childItem, i) in item.children' :key='i')
                  a(@click='goMenu(childItem)') {{childItem.title}}
      nav(class='header-nav header-user' v-if='userToken')
        ul(class='header-navbar')
          template(v-for='(item, index) in user')
            li(class='header-navbar-item' :key='index' :class="{'active': item.index === header_index}" v-if='index === 0 && !soft_disabled')
              .header-navbar-item-wrapper(@click='goMenu(item)')
                i(class='header-navbar-item-icon header-navbar-item-icon-prepend icon-document')
                a(class='header-navbar-item-link' href="javascript:void(0)") {{item.title}}
                span(class='header-navbar-item-icon header-navbar-item-icon-append dotted' v-if='userInfo.notice > 0')
            li(class='header-navbar-item' :key='index' :class="{'active': item.index === header_index}" v-if='index === 1')
              Poptip(trigger="hover" placement="bottom" @on-popper-show="getAssetData" @on-popper-hide="getAssetDataCancel")
                .header-navbar-item-wrapper(@click='goMenu(item)')
                  i(class='header-navbar-item-icon header-navbar-item-icon-prepend icon-dollar')
                  a(class='header-navbar-item-link' href="javascript:void(0)") {{$i18n.translate('public.asset')}}
                  Icon(class='header-navbar-item-icon header-navbar-item-icon-append' type="arrow-down-b")
                .assets(slot='content')
                  .assets-inner
                    .assets-inner-list
                      template(v-for='(childItem, i) in item.children')
                        .assets-item(v-if='i === 0' :key='i')
                          header(class='assets.header') {{$i18n.translate('public.type')}}
                          article(class='assets-content')
                            ul
                              li(class='assets-list-item' v-for="(item, index) in userInfo.valid_account" :key="index") {{$i18n.translate('public[\'' + item.currency + '\']')}}
                        .assets-item(v-if='i === 1' :key='i')
                          header(class='assets.header') {{$i18n.translate('public.balance')}}
                          article(class='assets-content')
                            ul
                              li(class='assets-list-item' v-for="(item, index) in userInfo.valid_account" :key="index") {{item.balance | fix_decimals_assets}}
                        .assets-item(v-if='i === 2' :key='i')
                          header(class='assets.header') {{$i18n.translate('public.locked')}}
                          article(class='assets-content')
                            ul
                              li(class='assets-list-item' v-for="(item, index) in userInfo.valid_account" :key="index") {{item.locked | fix_decimals_assets}}
                    .assets-inner-footer
                      template(v-for='(childItem, i) in item.children')
                        aside(class='assets-footer' v-if='i === 0' :key='i')
                          i-button(class='assets-btn' @click="goMenu(childItem)") {{$i18n.translate('public.recharge')}}
                        aside(class='assets-footer' v-if='i === 1' :key='i')
                          i-button(class='assets-btn' @click="goMenu(childItem)") {{$i18n.translate('public.withdraw')}}
                        aside(class='assets-footer' v-if='i === 2' :key='i')
                          i-button(class='assets-btn' type='primary' @click="goMenu(childItem)") {{$i18n.translate('public.assetInfo')}}
            li(class='header-navbar-item' :key='index' :class="{'active': Array.isArray(item.index) && item.index.indexOf(header_index) > -1 }" v-if='index === 2')
              Dropdown
                .header-navbar-item-wrapper(@click='goMenu(item)')
                  a(class='header-navbar-item-link' href="javascript:void(0)") {{nickname}}
                  Icon(class='header-navbar-item-icon header-navbar-item-icon-append' type="arrow-down-b")
                DropdownMenu(class='header-navbar-dropdown header-navbar-dropdown-user' slot="list")
                  template(v-for='(childItem, i) in item.children')
                    template(v-if='i === 1')
                      DropdownItem(:class="{'active': childItem.index === header_index}" :key='i' v-if='!soft_disabled')
                        a(@click='goMenu(childItem)') {{childItem.title}}
                    template(v-else)
                      DropdownItem(:class="{'active': childItem.index === header_index}" :key='i')
                        a(@click='goMenu(childItem)') {{childItem.title}}
</template>
<script lang="ts">
  import Vue from 'vue'
  import {Watch} from 'vue-property-decorator'
  import {State} from 'vuex-class'

  let timeout: number
  export default class headerBar extends Vue {
    @State userInfo: StoreType.userInfo
    @State userToken: string
    @State code: StoreType.code

    assetLoading: boolean = false
    menus: GlobeType.headerBarMenu[] = [{
      title: this.$i18n.translate('public.homePage', {}),
      url: '/',
      index: 0,
      children: []
    }]
    logins: GlobeType.headerBarMenu[] = [
      {
        title: this.$i18n.translate('public.register', {}),
        url: '/user/register',
        index: 5,
        children: []
      },
      {
        title: '|',
        url: '',
        children: []
      },
      {
        title: this.$i18n.translate('public.login', {}),
        url: '/user/login',
        index: 6,
        children: []
      }
    ]
    users: GlobeType.headerBarMenu[] = [
      {
        title: this.$i18n.translate('public.order', {}),
        url: '/myOrder',
        index: 7,
        children: [],
        meta: {}
      },
      {
        title: this.$i18n.translate('public.asset', {}),
        url: '/asset',
        index: 8,
        children: [
          {
            title: this.$i18n.translate('public.type', {}),
            url: '/asset',
            query: {
              type: '0'
            }
          },
          {
            title: this.$i18n.translate('public.balance', {}),
            url: '/asset',
            query: {
              type: '1'
            }
          },
          {
            title: this.$i18n.translate('public.locked', {}),
            url: '/asset',
            query: {
              type: '0'
            }
          }
        ]
      },
      {
        title: '',
        url: '/user/userCenter',
        index: [91, 92],
        visible: false,
        children: [
          {
            title: this.$i18n.translate('public.userCenter', {}),
            url: '/user/userCenter',
            index: 91,
            children: []
          },
          {
            title: this.$i18n.translate('public.myAd', {}),
            url: '/myAd',
            index: 92,
            children: []
          },
          {
            title: this.$i18n.translate('public.logout', {}),
            url: '',
            action: () => {
              this.$store.commit('delToken')
              this.$router.go(0)
            },
            children: []
          }
        ]
      }
    ]

    get nickname (): string {
      return this.userInfo.nickname || window.localStorage.getItem('nickname') || ''
    }

    @Watch('code')
    watchCode (val: StoreType.code) {
      val && this.init()
    }

    @Watch('soft_disabled')
    watchSoftDisabled (val: boolean): void {
      val && this.init()
    }

    getAssetData () {
      this.assetLoading = true
      this.$store.dispatch('ajax_me').then(() => {
        this.assetLoading = false
      }).catch(res => {
        this.assetLoading = false
      })
    }

    getAssetDataCancel () {
      this.ajaxSource && this.ajaxSource.cancel({cancel: 1})
    }

    getNotice (): void {
      if (this.userToken) {
        this.$store.dispatch('ajax_notice').then(res => {
          if (res.data && +res.data.error === 0) {
            this.$store.commit('userInfo_notice_setter', +res.data.notice)
          } else {
          }
        }).catch(() => {
        })
      }
      timeout && window.clearTimeout(timeout)
      timeout = window.setTimeout(this.getNotice, 30 * 1000)
    }

    goMenu (item: GlobeType.headerBarMenuChild) {
      if (item.action) {
        item.action()
      } else {
        this.$router.push({
          path: item.url,
          query: item.query
        })
      }
    }

    init (): void {
      const makeArray = (type: number) => {
        const arr = {
          buy: 11,
          sell: 21,
          ad: 30
        }
        return this.code.sellable.map((item, index) => {
          let obj: GlobeType.headerBarMenu = {
            title: this.$i18n.translate(`public.${item}`, {}),
            url: `/${type}`,
            index: +arr[type] + index,
            query: {
              currency: item
            }
          }
          return obj
        })
      }
      this.menus = [
        {
          title: this.$i18n.translate('public.homePage', {}),
          url: '/',
          index: [0],
          children: [],
          visible: false
        },
        {
          title: this.$i18n.translate('public.buy', {}),
          url: '/buy',
          index: [11, 12],
          visible: false,
          children: makeArray('buy')
        },
        {
          title: this.$i18n.translate('public.sell', {}),
          url: '/sell',
          index: [21, 22],
          visible: false,
          children: makeArray('sell')
        },
        {
          title: this.$i18n.translate('public.ad', {}),
          url: '/ad',
          index: [30, 31],
          visible: false,
          children: makeArray('ad')
        }
        // {
        //   title: this.$i18n.translate("public.invite"),
        //   url: "/invite",
        //   index: [4],
        //   visible: false,
        //   children: []
        // }
      ]
    }

    created (): void {
      this.init()
    }

    destroyed (): void {
      timeout && window.clearTimeout(timeout)
    }
  }
</script>

<style lang="stylus" scoped>
  .header-navbar-item {
    & /deep/ .ivu-select-dropdown {
      margin: 0;
      z-index: -1;
    }
  }

  $height = 76px;
  .header {
    width: 100%;
    min-width: 1200px;
    background-color: #fff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.08);
    &-inner {
      width: 1170px;
      margin: 0 auto;
      height: $height;
    }
    &-logo {
      height: $height;
      display: flex;
      float: left;
      align-items: center;
      margin-right: 80px;
      &-asset {
        width: 195px;
        height: 30px;
      }
    }
    &-nav {
      float: left;
      font-size: 16px;
    }
    &-frozen {
      float: left;
      font-size: 16px;
      &-text {
        display: flex;
        height: $height;
        color: red;
        align-items: center;
      }
    }
    &-login {
      float: right;
      .header-navbar-item {
        margin: 0 15px;
      }
    }
    &-user {
      float: right;
    }
    &-navbar {
      height: $height;
      display: flex;
      &-item {
        margin-right: 20px;
        margin-left: 20px;
        .ivu-dropdown {
          position: relative;
        }
        .ivu-dropdown-item {
          padding: 0;
          &.active {
            background-color: #e9edf1;
          }
        }
        &-wrapper {
          display: flex;
          cursor: pointer;
          align-items: center;
        }
        &:first-of-type {
          margin-left: 0;
        }
        &:last-of-type {
          margin-right: 0;
        }
        .ivu-icon {
          transition: transform 0.5s;
        }
        &:hover {
          .header-navbar-item-link,
          .header-navbar-item-icon {
            color: $color-primary;
          }
          .ivu-icon {
            transform: rotate(180deg);
          }
        }
        &.active {
          .header-navbar-item-link,
          .header-navbar-item-icon {
            color: $color-primary;
          }
          .header-navbar-item-link {
            position: relative;
            &:after {
              content: "";
              position: absolute;
              left: 50%;
              bottom: 10px;
              height: 2px;
              width: 80%;
              background-image: $color-primary-gradient;
              transform: translateX(-50%);
            }
          }
          .ivu-dropdown-item {
          }
        }
        &-link {
          height: $height;
          display: flex;
          align-items: center;
          color: #333;
        }
        &-icon {
          font-size: 12px;
          &-prepend {
            font-size: 16px;
            margin-right: 5px;
          }
          &-append {
            margin-left: 5px;
          }
        }
      }
      &-dropdown {
        min-width: 90px;
        width: 90px;
        text-align: center;
        &-user {
          width: 120px;
        }
        .ivu-dropdown-item {
          a {
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            color: currentColor;
          }
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 48px;
          font-size: 14px !important;
          &:last-of-type {
            &::after {
              display: none;
            }
          }
          &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 5px;
            width: 80%;
            height: 1px;
            transform: translateX(-50%);
            background-color: #e9edf1;
          }
        }
      }
    }
  }

  .dotted {
    width: 8px;
    height: 8px;
    background-color: #ed1c24;
    border-radius: 50%;
  }

  .assets {
    padding: 20px;
    min-width: 300px;
    font-size: 14px;
    &-inner {
      display: flex;
      flex-direction: column;
      &-list {
        display: flex;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
      }
      &-footer {
        width: 100%;
        display: flex;
        justify-content: space-between;
      }
    }
    &-item {
      margin-right: 20px;

      // font-size:12px;
      // width: 40%;
      &:first-of-type {
        // width: 20%;
      }
      &:last-of-type {
        margin-right: 0;
        // text-align: right;
        // width: 0%;
      }
    }
    &-list {
      &-item {
        padding-top: 20px;
      }
    }
    &-header {
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    &-content {
    }
    &-footer {
      padding-top: 20px;
      text-align: center;

    }
    &-btn {
      width: 80px;
      padding: 4px 0;
    }
  }
</style>
