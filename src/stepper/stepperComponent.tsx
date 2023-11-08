import React, { ReactElement, FC } from "react";
import "./styles.scss";
import type { IStep, IStepperProps } from "./types";
import Bubble from "../bubble";
import { LABEL_POSITION, Elements } from "../constants";
import Connector from "../connector";

const left = "left";
const right = "right";

const Stepper: FC<IStepperProps> = (props) => {
  const {
    steps,
    currentStep = 0,
    completedStep,
    onStepClick,
    renderBubble,
    textPos,
    styles = {},
    labelPosition = LABEL_POSITION.RIGHT,
  } = props;

  const getStyles = (element: Elements, step: IStep, index: number): object => {
    const getElementStyle = styles[element];
    if (getElementStyle) {
      return getElementStyle(step, index);
    }
    return {};
  };

  const renderStep: FC<IStepperProps> = ({ label, description }, idx) => {
    const isCurrentStep = idx === currentStep;

    const stepClassName = `step ${isCurrentStep ? "activeStep" : ""} ${
      currentStep > idx ? "completedStep" : ""
    } text-${{ left, right }[textPos]}`;

    const connectorClassName = `stepConnector ${
      currentStep >= idx ? "activeConnector" : ""
    }`;

    return (
      <>
        {idx !== 0 && <div className={connectorClassName} />}
        <li key={idx} className={stepClassName}>
          <div className="bubble">
            <span>{idx}</span>
          </div>

          <div className="stepInfo">
            <div className="label">{label}</div>
            {/* <div className="description">{description}</div> */}
          </div>
        </li>
      </>
    );
  };

  return (
    <ul className="stepperContainer">{steps.map(renderStep)}</ul>

    // <ol >
    //   {steps.map(
    //     (step: IStep, stepIndex: number): ReactElement => (
    //       <li key={stepIndex}>
    //         <button>
    //           <span className="stepProgressBar__step__button__label">
    //             {step.label}
    //           </span>
    //         </button>
    //       </li>
    //       // <>
    //       //   <div key={stepIndex} className={classes.step}>
    //       //     <Bubble
    //       //       step={step}
    //       //       index={stepIndex}
    //       //       currentStepIndex={currentStepIndex}
    //       //       handleStepClick={(): void =>
    //       //         onStepClick && onStepClick(step, stepIndex)
    //       //       }
    //       //       showCursor={!!onStepClick}
    //       //       renderAdornment={renderBubble}
    //       //       getStyles={(element: Elements): object =>
    //       //         getStyles(element, step, stepIndex)
    //       //       }
    //       //       labelPosition={labelPosition}
    //       //     />

    //       //     {/* {stepIndex < steps?.length - 1 && (
    //       //       <div
    //       //         className={`${classes.lineSeparator}
    //       //       ${
    //       //         stepIndex > currentStepIndex - 1 &&
    //       //         classes.inactiveStepLineSeparator
    //       //       }`}
    //       //         style={{
    //       //           ...(getStyles(Elements.LineSeparator, step, stepIndex) ||
    //       //             {}),
    //       //           ...((stepIndex > currentStepIndex - 1 &&
    //       //             getStyles(
    //       //               Elements.InactiveLineSeparator,
    //       //               step,
    //       //               stepIndex
    //       //             )) ||
    //       //             {}),
    //       //         }}
    //       //       />
    //       //     )} */}
    //       //   </div>
    //       //   <Connector />
    //       // </>
    //     )
    //   )}
    // </ol>
  );
};

export default Stepper;
