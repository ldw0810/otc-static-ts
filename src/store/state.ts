interface StateType {
  userInfo: StoreType.userInfo,
  userToken: string,

}

const state: StateType = {
  userInfo: {
    id: '',
    display_name: '',
    nickname: '',
    email: '',
    phone_number: '',
    api_ln: '',
    activated: true,
    invite: '',
    notice: 0,
    valid_account: [],
    mobile: false,
    app_two_factor: false,
    omt: {},
    stat: {
      trade_count: 0,
      good_count: 0,
      good_rate: '0'
    },
    default_collection: {
      kind: '', // alipay || bank
      account: '',
      bank: '',
      bank_name: '',
      account_display: '',
    },
  },
  userToken: ''
}

export default state
