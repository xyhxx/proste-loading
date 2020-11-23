interface ProsteLoadingOptions{
  type: boolean;
  content?: string;
  duration?: number;
}

type prosteLoading = (options: ProsteLoadingOptions) => void;
type useProsteLoading = () => prosteLoading;

export {prosteLoading, ProsteLoadingOptions, useProsteLoading};