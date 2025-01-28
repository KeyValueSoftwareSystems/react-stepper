import { Elements } from "../constants";
import { IStep, IStyleFunction } from "../stepper/types";


/**
 * To get the Style of element from the style object provided
 * @function
 * @param {{[key in Elements]?: IStyleFunction}} styles
 * @param {Elements} element
 * @param {IStep} step
 * @param {number} index
 * @returns {object}
 */
const  getStyles = (styles: { [key in Elements]?: IStyleFunction }, element: Elements, step: IStep, index: number): object => {
  const getElementStyle = styles[element];
  if (getElementStyle) {
    return getElementStyle(step, index);
  }
  return {};
};

export default getStyles;
