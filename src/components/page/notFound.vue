<template lang="pug">
  .appPage
    .message
      .message-text {{$t('public.not_found')}}
      .message-btn(@click="goHome") {{$t('public.return_home')}}
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class notFound extends Vue {
    goHome (): void {
      this.$router.push('/')
    }
  }
</script>
<style lang='stylus' scoped>
  .appPage
    background url("../../assets/images/page/Img-404.svg") no-repeat center
    background-size cover

  .message
    @extend .flexColumnCenter
    &-text
      margin-top 50vh
      line-height: 42px;
      font-size: 36px;
      color: #ffffff;
      letter-spacing: 0;
      margin-bottom: 35px;
      text-align: center;
    &-btn
      @extend .flexColumnCenter
      margin-top 20vh
      appearance: none;
      padding-left: 30px;
      padding-right: 30px;
      height: 44px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.03);
      border-radius: 2px;
      font-size: 16px;
      color: #333333;
      line-height: 21px;
      cursor pointer

      &:focus,
      &:active,
      &:hover
        background #666
        color #fff
</style>
