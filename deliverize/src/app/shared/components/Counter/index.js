import React from 'react';
import { useWhyDidYouUpdate } from "../../hooks"

export const IncrementIcon = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 14 14"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.875 6.125V0H6.125V6.125H0V7.875H6.125V14H7.875V7.875H14V6.125H7.875Z"
      />
    </svg>
  )
}

export const DecreaseIcon = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 14 2"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0H14V2H0V0Z" />
    </svg>
  )
}


export const Counter = React.memo((props) => {
  useWhyDidYouUpdate('Counter', props)
  return <div>{props.count}</div>
})