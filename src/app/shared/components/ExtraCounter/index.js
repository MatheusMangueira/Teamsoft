import style from './index.module.css';
import { Counter, DecreaseIcon, IncrementIcon } from "../Counter";

export function ExtraCounter({
  name,
  currentValue,
  setCurrentValue,
  globalCounter,
  setGlobalCounter,
  maxItens
}) {
  function handleGlobalCount(prop, newValue) {
    return (event) => {
      event.preventDefault()

      if (newValue < 0 || newValue > maxItens)
        return

      const allCounter = Object.values(globalCounter)
      const counterTotal = allCounter.reduce((item, acc) => item + acc, 0)

      const currentValue = (counterTotal - globalCounter[prop]) + newValue

      if (currentValue !== 0)
        setCurrentValue(currentValue)

      setGlobalCounter({
        ...globalCounter,
        [prop]: newValue
      })
    }
  }

  return (
    <div className={style.div__price}>
      <button onClick={handleGlobalCount(name, globalCounter[name] - 1)}>
        <DecreaseIcon
          width={14}
          height={8}
          color={(globalCounter[name] === 0) ? "#ccc" : null}
        />
      </button>
      <Counter
        count={globalCounter[name]}
      />
      <button
        disabled={currentValue === maxItens}
        onClick={handleGlobalCount(name, globalCounter[name] + 1)}
      >
        <IncrementIcon
          width={14}
          height={14}
          color={(globalCounter[name] >= maxItens ||
            currentValue === maxItens)
            ? "#ccc"
            : null}
        />
      </button>
    </div>
  )
}