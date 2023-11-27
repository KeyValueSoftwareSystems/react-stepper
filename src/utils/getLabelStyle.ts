import { LABEL_POSITION, ORIENTATION } from "../constants";

const getLabelStyle: (orientation?: string, labelPosition?: string) => string | undefined = (orientation, labelPosition) => {
  if (orientation === ORIENTATION.HORIZONTAL) {
    if (labelPosition === LABEL_POSITION.TOP) return "horizontalLabelTop";
    else if (labelPosition === LABEL_POSITION.BOTTOM)
      return "horizontalLabelBottom";
  } else if (labelPosition === LABEL_POSITION.RIGHT)
    return "verticalLabelRight";
};

export default getLabelStyle;