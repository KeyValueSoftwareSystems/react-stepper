import React, { FC } from "react";
import type { IBubbleProps } from "./types";
import { Elements } from "../constants";
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES } from '../constants';
import styles from './styles.module.scss';

const Bubble: FC<IBubbleProps> = (props) => {
  const {
    step,
    renderAdornment,
    index,
    currentStepIndex,
    handleStepClick = null,
    showCursor,
    getStyles
  } = props;

  return (
    <div
      className={`${styles.eachBubble}
      ${showCursor && styles.cursorPointer}
      ${index === currentStepIndex && styles.activeStepBubble}
      ${step.status === STEP_STATUSES.UNVISITED && currentStepIndex !== index && styles.inactiveStepBubble}
      `}
      style={{
        ...((getStyles(Elements.Bubble)) || {}),
        ...((index === currentStepIndex && getStyles(Elements.ActiveBubble)) || {}),
        ...((step.status === STEP_STATUSES.UNVISITED && currentStepIndex !== index
            && getStyles(Elements.InActiveBubble)) || {})
      }}
      onClick={(): void | null => handleStepClick && handleStepClick()}
      role="presentation"
      data-testId="stepper-bubble"
    >
      {(renderAdornment && renderAdornment(step, index))
    || (
      <>
        {step?.status === STEP_STATUSES.COMPLETED && (
          <img
            src={whiteTick}
            className={styles.whiteTickImg}
            alt=""
          />)
        || index + 1}
      </>
    )}
    </div>
  );
};

export default Bubble;