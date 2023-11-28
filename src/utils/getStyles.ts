import { Elements } from "../constants";
import { IStep, IStyleFunction } from "../stepper/types";


const  getStyles = (styles: { [key in Elements]?: IStyleFunction }, element: Elements, step: IStep, index: number): object => {
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle(step, index);
  }
  return {};
};

export default getStyles;
