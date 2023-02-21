const styles = {
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
  }
} as const;

export default styles;