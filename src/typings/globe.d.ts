import AsyncComponent from "vue";

declare namespace GlobeType {
  export interface jsonData {
    [key: string]: string
  }

  export interface I18nData {
    [key: string]: jsonData
  }

  export interface RouterPath {
    [pageName: string]: AsyncComponent;
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
    children: headerBarMenuChild[]
  }

  export interface headerBarMenuChild {
    title?: string | undefined,
    url?: string,
    query?: object
  }
}


