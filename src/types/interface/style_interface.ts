interface IstyleInfo{
  fontSize?: number;
  color?: string;
  content?: string;
}
type IstyleInfoFunction = (options: IstyleInfo) => void;

export {IstyleInfo, IstyleInfoFunction};