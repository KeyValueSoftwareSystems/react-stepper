import React, { FC } from "react";
import type { IBubbleProps } from "./types";
import { Elements } from "../constants";
import whiteTick from '../assets/white-tick.svg';
import { LABEL_POSITION } from '../constants';
import styles from './styles.module.scss';

const Bubble: FC<IBubbleProps> = (props) => {
  const {
    step,
    renderAdornment,
    index,
    currentStepIndex,
    handleStepClick,
    showCursor,
    getStyles,
  } = props;

  return (
    <div
      className={`${styles.eachBubble}
      ${showCursor && styles.cursorPointer}
      ${index === currentStepIndex && styles.activeStepBubble}
      ${!step.completed && currentStepIndex !== index && styles.inactiveStepBubble}
      ${step.completed && currentStepIndex !== index && styles.completedStepBubble}
      `}
      style={{
        ...((getStyles(Elements.Bubble)) || {}),
        ...((index === currentStepIndex && getStyles(Elements.ActiveBubble)) || {}),
        ...((!step.completed && currentStepIndex !== index
            && getStyles(Elements.InActiveBubble)) || {})
      }}
      onClick={(): void | null => handleStepClick && handleStepClick()}
      role="presentation"
      id="stepper-bubble"
    >
      {(renderAdornment && renderAdornment(step, index))
    || (
      <>
        {step?.completed && (
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