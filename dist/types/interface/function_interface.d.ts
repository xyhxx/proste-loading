interface ProsteLoadingOptions {
    type: boolean;
    content?: string;
    duration?: number;
}
declare type prosteLoading = (options: ProsteLoadingOptions) => void;
declare type useProsteLoading = () => prosteLoading;
export { prosteLoading, ProsteLoadingOptions, useProsteLoading };
