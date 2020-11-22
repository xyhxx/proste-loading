interface IstyleInfo {
    fontSize?: number;
    color?: string;
    content?: string;
}
declare type IstyleInfoFunction = (options: IstyleInfo) => void;
export { IstyleInfo, IstyleInfoFunction };
