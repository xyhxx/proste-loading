interface ProsteLoadingStyleInfo {
    fontSize?: number;
    color?: string;
    content?: string;
}
declare type styleInfoFunction = (options: ProsteLoadingStyleInfo) => void;
export { ProsteLoadingStyleInfo, styleInfoFunction };
