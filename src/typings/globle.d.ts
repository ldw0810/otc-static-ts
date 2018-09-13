import {AsyncComponent} from 'vue'

interface RouterPath {
  [propName: string]: AsyncComponent;
}
