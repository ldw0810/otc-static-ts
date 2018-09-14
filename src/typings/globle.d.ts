import {AsyncComponent} from 'vue'

interface jsonData {
  [key: string]: string
}

interface I18nData {
  [key: string]: jsonData
}

interface RouterPath {
  [pageName: string]: AsyncComponent;
}

interface LanguageData {
  language: string,
  name: string,
  data: I18nData
}

