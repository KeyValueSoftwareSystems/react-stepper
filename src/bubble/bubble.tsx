import React, {ReactElement} from "react";
import { IBubbleProps } from "./types";
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES } from './constants';
import styles from './styles';
const Bubble = (props: IBubbleProps): ReactElement => {
  const { step, enableStepClick, renderAdornment, index, currentActiveStepIndexVal, handleStepClick } = props; 
  return (
    <div
      style={{...styles.eachBubble,
        ...((enableStepClick && styles.cursorPointer) || {}),
        ...((index === currentActiveStepIndexVal) && styles.activeStepBubble || {}),
        ...((step.status === STEP_STATUSES.UNVISITED && currentActiveStepIndexVal !== index) && styles.inactiveStepBubble || {})
      }}
      onClick={(): void => handleStepClick(index)}
      role="presentation"
    >
      {(renderAdornment && renderAdornment(step, index))
    || (
      <>
        {step?.status === STEP_STATUSES.COMPLETED && (
          <img
            src={whiteTick}
            style={styles.whiteTickImg}
            alt=""
          />)
        || index + 1}
      </>
    )}
    </div>
  );
};

export default Bubble;