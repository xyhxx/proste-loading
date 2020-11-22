import { reactive, createApp, h, provide, inject} from 'vue';
import loadingBg from '../assets/img/loadingBg.png';
import loadingImg from '../assets/img/loading.gif';
import '../assets/index.css';

import vuePluginLoading from './types/interface/function_interface';

// 定义插件名称 防止冲突
const loadingPlugin = Symbol('loadingPlugin');
// 初始化状态信息
const state = reactive({ isShowLoading: false, loadingMsg: '加载中' });
// 挂载元素
let el = document.querySelector('#xyhLoading');
if (!el) {
  const loadingElement = createApp({
    render() {
      return h('div', { id: 'xyhLoading', style: state.isShowLoading ? '' : 'display: none;' }, [
        h('div', { id: 'xyhLoadingInfo' }, [
          h('img', { src: loadingBg }),
          h('div', { id: 'xyhLoadingInfoContent' }, [
            h('img', { src: loadingImg }),
            h('p', state.loadingMsg),
          ]),
        ]),
      ]);
    },
  });
  if(!document.querySelector('#xyhLoadingPlugin')){
    const loadingParent = document.createElement('div');
    loadingParent.id = 'xyhLoadingPlugin';
    document.body.appendChild(loadingParent);
    loadingElement.mount('#xyhLoadingPlugin');
  }
}
el = null;
// 显示控制器
const loadingControl: vuePluginLoading = (type, msg = '加载中', duration = 0) => {
  state.isShowLoading = type;
  state.loadingMsg = msg;
  if(duration > 0){
    setTimeout(() => loadingControl(false), duration);
  }
};

export const provideLoad = () =>{
  provide(loadingPlugin, loadingControl);
};

export const useLoad: () => vuePluginLoading = () => {
  const plugin: vuePluginLoading | undefined = inject(loadingPlugin);
  
  if(!plugin){
    throw 'Please use the [provideload] function on the App.vue before using this function';
  }

  return plugin;
}

