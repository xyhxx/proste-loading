中文文档 | [Englist](./en/README.MD)

# 基于Vue3的loading插件

>  proste： 波兰语，简单的，实在找不到什么好玩的单词了，本来想用tiga（迪迦奥特曼），但是感觉太中二了...

### 初始化插件能力

| Param |  Type     | Description       |
| :---- | :----:    | :---------------  |
| fontSize?  | Number   | 提示语句字体大小 |
| color?   | String    | 字体颜色    |
| content?   | String    | 默认加载文字内容    |

``` vue
<!-- App.vue -->

<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import {provideLoad} from 'proste-loading';
export default {
  name: 'App',
  setup(){
    // 提供loading—hook能力
    provideLoad({fontSize: 15, color: "#f44336", content: '默认加载文字'});
  },
  components: {
    HelloWorld
  }
}
</script>

```

### 继承使用hook能力

| Param |  Type     | Description       |
| :---- | :----:    | :---------------  |
| type  | Boolean   | 是否展示            |
| content?   | String    | loading 提示语句    |
| duration?   | Number    | 持续时间    |


``` vue
<!-- HelloWorld.vue  -->


<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import {useLoad} from '../plugin/loading';

export default {
  name: 'HelloWorld',
  setup(){
    // 继承使用hook
    const loading = useLoad();
    loading({type: true, content: '正在加载', duration: 1000});

    setTimeout(() => {
      loading({type: true});
    }, 2000);
  },
  props: {
    msg: String
  }
}
</script>

```

![avatar](./preview/loading.png)