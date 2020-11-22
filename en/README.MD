# Loading plugin based on vue3

>  proste： Polish, it means simple, really can not find any fun words, originally wanted to use tiga (an Ultraman), but feel too naive...

### init plugin 

``` vue
<!-- App.vue -->

| Param |  Type     | Description       |
| :---- | :----:    | :---------------  |
| fontSize?  | Number   | text size |
| color?   | String    | text color    |
| content?   | String    | default text |

<template>
  <HelloWorld msg="Welcome to Your Vue.js App"/>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

import {provideLoad} from 'proste-loading';
export default {
  name: 'App',
  setup(){
    // Provide loading-hook
    provideLoad({fontSize: 15, color: "#f44336", content: 'loading...'});
  },
  components: {
    HelloWorld
  }
}
</script>

```

### use plugin

| Param |  Type     | Description       |
| :---- | :----:    | :---------------  |
| type  | Boolean   | is show plugin            |
| content?   | String    | loading content    |
| duration?   | Number    | duration    |


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
    // inject to use hook
    const loading = useLoad();
    loading({type: true, content: 'i am loading...', duration: 1000});

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

![avatar](../preview/loading.png)