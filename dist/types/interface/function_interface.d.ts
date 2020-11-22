interface Ioptions {
    type: boolean;
    content?: string;
    duration?: 0;
}
declare type vuePluginLoading = (options: Ioptions) => void;
export { vuePluginLoading, Ioptions };
