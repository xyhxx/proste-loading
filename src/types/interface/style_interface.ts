interface ProsteLoadingStyleInfo{
  fontSize?: number;
  color?: string;
  content?: string;
}
type styleInfoFunction = (options: ProsteLoadingStyleInfo) => void;

export {ProsteLoadingStyleInfo, styleInfoFunction};