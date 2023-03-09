import React, { FC } from "react";
import type { IBubbleProps } from "./types";
import { Elements } from "../constants";
import whiteTick from '../assets/white-tick.svg';
import { STEP_STATUSES, LABEL_POSITION } from '../constants';
import styles from './styles.module.scss';

const Bubble: FC<IBubbleProps> = (props) => {
  const {
    step,
    renderAdornment,
    index,
    currentStepIndex,
    handleStepClick = null,
    showCursor,
    getStyles,
    labelPosition
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
      id="stepper-bubble"
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
      <div className={`${styles.labelContainer} ${styles[`labelContainer__${labelPosition || LABEL_POSITION.RIGHT}`]}`}>
        {step?.label && (
          <span
            className={`${styles.labelTitle}
                  ${showCursor && styles.cursorPointer}
                  ${index === currentStepIndex && styles.activeLabelTitle}`}
            style={{
              ...((getStyles(Elements.LabelTitle)) || {}),
              ...((index === currentStepIndex && getStyles(Elements.ActiveLabelTitle)) || {})
            }}
            onClick={(): void | null => handleStepClick && handleStepClick()}
            role="presentation"
            id={`stepper-label-${index}`}
          >
            {step.label}
          </span>
        )}
        {step?.description && (
          <span
            className={`${styles.labelDescription}
                  ${handleStepClick && styles.cursorPointer}
                  ${index === currentStepIndex && styles.activeLabelDescription}`}
            style={{
              ...((getStyles(Elements.LabelDescription)) || {}),
              ...((index === currentStepIndex &&
                      getStyles(Elements.ActiveLabelDescription)) || {})
            }}
            onClick={(): void | null => handleStepClick && handleStepClick()}
            role="presentation"
            id={`stepper-desc-${index}`}
          >
            {step.description}
          </span>
        )}
      </div>
    </div>
  );
};

export default Bubble;