import React, { Component } from 'react'
import CircularProgressbar from 'react-circular-progressbar'

// this is the inner circle with whatever you want inside
const CustomProgressBar = props => {
  const { children, ...otherProps } = props
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%'
      }}
    >
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <CircularProgressbar {...otherProps} />
      </div>
      <div
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {props.children}
      </div>
    </div>
  )
}

// this is the component imported to the view
class ProgressBar extends Component {
  render() {
    const {
      percentage,
      endColor,
      startColor,
      gradientId,
      children
    } = this.props
    const gradientTransform = `rotate(90)`
    return (
      <div
        className="progress-bar"
        style={{
          width: '150px',
          height: '150px'
        }}
      >
        <svg style={{ height: 0, width: 0, position: 'absolute' }}>
          <defs>
            <linearGradient
              id={gradientId}
              gradientTransform={gradientTransform}
            >
              <stop offset="0%" stopColor={startColor} />
              <stop offset="100%" stopColor={endColor} />
            </linearGradient>
          </defs>
        </svg>
        <CustomProgressBar
          percentage={percentage}
          strokeWidth="5"
          styles={{ path: { stroke: `url(#${gradientId})`, height: '100%' } }}
        >
          {children}
        </CustomProgressBar>
      </div>
    )
  }
}

export default ProgressBar