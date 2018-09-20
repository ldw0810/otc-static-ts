declare namespace GlobeType {
  export interface jsonData {
    [key: string]: string
  }

  export interface I18nData {
    [key: string]: jsonData
  }

  export interface LanguageData {
    language: string,
    name: string,
    data: I18nData
  }

  export interface headerBarMenu {
    title: string | undefined,
    url: string,
    index?: number | Array<number>,
    meta?: any,
    visible?: boolean,
    children?: headerBarMenuChild[],
    query?: jsonData
  }

  export interface headerBarMenuChild {
    title: string | undefined,
    url: string,
    action?: Function,
    query?: jsonData
  }
}


