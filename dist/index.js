// 导入依赖
import { reactive, createApp, h, provide, inject } from 'vue';
import loadingBg from '../assets/img/loadingBg.png';
import loadingImg from '../assets/img/loading.gif';
import '../assets/index.css';
// 定义插件名称 防止冲突
var prostePluginStyleInfoLoadingPlugin = Symbol('loadingPlugin');
// 初始化状态信息
var prostePluginState = reactive({ isShowLoading: false, loadingMsg: '加载中' });
// 初始化样式信息
var prostePluginStyleInfo = reactive({
    fontSize: 15,
    color: '#666666',
});
// 默认加载文字内容
var prostePluginNormal = '加载中';
// 挂载元素
var el = document.querySelector('#xyhLoading');
if (!el) {
    var loadingElement = createApp({
        render: function () {
            return h('div', { id: 'xyhLoading', style: prostePluginState.isShowLoading ? '' : 'display: none;' }, [
                h('div', { id: 'xyhLoadingInfo' }, [
                    h('img', { src: loadingBg }),
                    h('div', { id: 'xyhLoadingInfoContent' }, [
                        h('img', { src: loadingImg }),
                        h('p', { style: "font-size: " + prostePluginStyleInfo.fontSize + "px; color: " + prostePluginStyleInfo.color }, prostePluginState.loadingMsg),
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
var loadingControl = function (_a) {
    var type = _a.type, _b = _a.content, content = _b === void 0 ? prostePluginNormal : _b, _c = _a.duration, duration = _c === void 0 ? 0 : _c;
    prostePluginState.isShowLoading = type;
    prostePluginState.loadingMsg = content;
    if (duration && duration > 0) {
        setTimeout(function () { return loadingControl({ type: false }); }, duration);
    }
};
export var provideLoad = function (options) {
    if (options) {
        for (var key in options) {
            if (key === 'content') {
                prostePluginNormal = options[key];
            }
            else {
                prostePluginStyleInfo[key] = options[key];
            }
        }
    }
    provide(prostePluginStyleInfoLoadingPlugin, loadingControl);
};
export var useLoad = function () {
    var plugin = inject(prostePluginStyleInfoLoadingPlugin);
    if (!plugin) {
        throw new Error('Please use the [provideload] function on the App.vue before using this function');
    }
    return plugin;
};
