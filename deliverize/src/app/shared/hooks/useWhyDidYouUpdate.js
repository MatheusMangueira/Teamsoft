import {
  useRef,
  useEffect,
} from 'react';

export function useWhyDidYouUpdate(name, props) {
  const previousProps = useRef()

  useEffect(() => {
    if (previousProps.current) {
      const changesObj = {}

      for (const key in { ...previousProps.current, ...props }) {
        if (previousProps.current !== props[key]) {
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key]
          }
        }
      }

      previousProps.current = props
    }
  })
}