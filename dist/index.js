import { reactive, createApp, h, provide, inject } from 'vue';
import loadingBg from '../assets/img/loadingBg.png';
import loadingImg from '../assets/img/loading.gif';
import '../assets/index.css';
// 定义插件名称 防止冲突
var loadingPlugin = Symbol('loadingPlugin');
// 初始化状态信息
var state = reactive({ isShowLoading: false, loadingMsg: '加载中' });
// 挂载元素
var el = document.querySelector('#xyhLoading');
if (!el) {
    var loadingElement = createApp({
        render: function () {
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
    if (!document.querySelector('#xyhLoadingPlugin')) {
        var loadingParent = document.createElement('div');
        loadingParent.id = 'xyhLoadingPlugin';
        document.body.appendChild(loadingParent);
        loadingElement.mount('#xyhLoadingPlugin');
    }
}
el = null;
// 显示控制器
var loadingControl = function (type, msg, duration) {
    if (msg === void 0) { msg = '加载中'; }
    if (duration === void 0) { duration = 0; }
    state.isShowLoading = type;
    state.loadingMsg = msg;
    if (duration > 0) {
        setTimeout(function () { return loadingControl(false); }, duration);
    }
};
export var provideLoad = function () {
    provide(loadingPlugin, loadingControl);
};
export var useLoad = function () {
    var plugin = inject(loadingPlugin);
    if (!plugin) {
        throw 'Please use the [provideload] function on the App.vue before using this function';
    }
    return plugin;
};
