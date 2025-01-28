import { LABEL_POSITION, ORIENTATION } from "../constants";

/**
 * To get the label style considering the orientation
 * @function
 * @param {string} [orientation]
 * @param {string} [labelPosition]
 * @returns {string|undefined}
 */
const getLabelStyle: (orientation?: string, labelPosition?: string) => string | undefined = (orientation, labelPosition) => {
  if (orientation !== ORIENTATION.VERTICAL) {
    if (labelPosition === LABEL_POSITION.TOP) return "horizontalLabelTop";
    else if (labelPosition === LABEL_POSITION.LEFT || labelPosition === LABEL_POSITION.RIGHT)
      return ""
    else return "horizontalLabelBottom";
  } else if (labelPosition === LABEL_POSITION.RIGHT)
    return "verticalLabelRight";
};

export default getLabelStyle;
