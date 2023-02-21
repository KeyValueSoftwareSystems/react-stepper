

const styles = {
  stepperContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    marginLeft: '10px',
    alignItems: 'center'
  },
  stepSection: {
    display: 'flex'
  },
  eachBubble: {
    borderRadius: '50%',
    height: '24px',
    width: '24px',
    background: '#312ec0',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    fontWeight: '400',
    fontSize: '12px',
    lineHeight: '16px',
    border: '7px solid'
  },
  activeStepBubble: {
    border: '7px solid #CBCBEF'
  },
  inactiveStepBubble: {
    opacity: 0.4
  },
  cursorPointer: {
    cursor: 'pointer'
  },
  whiteTickImg: {
    objectFit: 'cover',
    width: '10px',
    height: '8px'
  },
  eachStep: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative'
  
  },
  bubbleLineWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: 'fit-content'
  },
  eachLabel: {
    position: 'absolute',
    top: '4px',
    left: '44px',
    width: 'max-content',
    height: 'fit-content',
    display: 'flex',
    flexDirection: 'column'
  },
  labelTitle: {
    color: '#4F4F4F'
  },
  activeLabelTitle: {
    fontWeight: 700
  },
  labelDescription: {
    fontWeight: 400,
    fontSize: '12px',
    lineHeight: '21px',
    letterSpacing: '0.02em',
    color: '#929292'
  },
  activeLabelDescription: {
    color: '#676767'
  },
  lineSeparator: {
    height: '22px',
    width: '1px',
    borderRight: '2px solid #dfdff2',
    margin: '4px 0'
  },
  activeStepLineSeparator: {
    borderRight: '2px dashed #dfdff2'
  }
} as const
export default styles;