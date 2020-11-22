// 导入依赖
import { reactive, createApp, h, provide, inject} from 'vue';
import loadingBg from '../assets/img/loadingBg.png';
import loadingImg from '../assets/img/loading.gif';
import '../assets/index.css';
// 导入类型
import {vuePluginLoading} from './types/interface/function_interface';
import {
  IstyleInfo as styleOptions, 
  IstyleInfoFunction as styleFunction
} from './types/interface/style_interface';

// 定义插件名称 防止冲突
const prostePluginStyleInfoLoadingPlugin = Symbol('loadingPlugin');
// 初始化状态信息
const prostePluginState = reactive({ isShowLoading: false, loadingMsg: '加载中' });
// 初始化样式信息
const prostePluginStyleInfo = reactive<styleOptions>({
  fontSize: 15,
  color: '#666666',
});
// 默认加载文字内容
let prostePluginNormal: string = '加载中';
// 挂载元素
let el = document.querySelector('#xyhLoading');
if (!el) {
  const loadingElement = createApp({
    render() {
      return h('div', { id: 'xyhLoading', style: prostePluginState.isShowLoading ? '' : 'display: none;' }, [
        h('div', { id: 'xyhLoadingInfo' }, [
          h('img', { src: loadingBg }),
          h('div', { id: 'xyhLoadingInfoContent' }, [
            h('img', { src: loadingImg }),
            h('p', {style: `font-size: ${prostePluginStyleInfo.fontSize}px; color: ${prostePluginStyleInfo.color}`} ,prostePluginState.loadingMsg),
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
const loadingControl: vuePluginLoading = ({type, content = prostePluginNormal, duration = 0}) => {
  prostePluginState.isShowLoading = type;
  prostePluginState.loadingMsg = content;
  if(duration && duration > 0){
    setTimeout(() => loadingControl({type: false}), duration);
  }
};

export const provideLoad: styleFunction = (options: styleOptions) =>{
  if (options) {
    for(const key in options){
      if(key === 'content'){
        prostePluginNormal = <string>options[key];
      } else {
        prostePluginStyleInfo[key] = options[key];
      }
    }
  }
  
  provide(prostePluginStyleInfoLoadingPlugin, loadingControl);
};

export const useLoad: () => vuePluginLoading = () => {
  const plugin: vuePluginLoading | undefined = inject(prostePluginStyleInfoLoadingPlugin);
  
  if(!plugin){
    throw new Error('Please use the [provideload] function on the App.vue before using this function');
  }

  return plugin;
}

