declare namespace StoreType {
  export interface loginInfo {
    email: string,
    password: string
  }

  export interface validAccount {
    currency: string,
    balance: string | number,
    locked: string | number,
    amount: string | number
  }

  export interface state {
    trade_count: number,
    good_count: number,
    good_rate: number | string
  }

  export interface defaultCollection {
    kind: string,   //alipay || bank
    account: string,
    bank: string,
    bank_name: string,
    account_display: string,
  }

  export interface userInfo { //用户信息
    id: string,
    display_name: string,
    nickname: string,
    email: string,
    phone_number: string,
    api_ln: string,
    activated: true,
    invite: string,
    notice: number,
    valid_account: validAccount[],
    mobile: boolean,
    app_two_factor: boolean,
    omt: object,
    stat: state,
    default_collection: defaultCollection,
  }

  export interface code {
    exable: string[],
    payable: string[],
    sellable: string[],
  }
}


