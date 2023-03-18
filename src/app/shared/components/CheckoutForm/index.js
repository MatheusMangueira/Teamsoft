import style from "./index.module.css";

import { useState } from "react";

import { ExtraCounter } from "../ExtraCounter";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { Counter, DecreaseIcon, IncrementIcon } from "../Counter";

export function CheckoutForm({ offerName, ingredients }) {
  const maxItens = ingredients.max_itens;

  const globalProps = {
    total: 0
  }

  ingredients.itens.forEach((item) => {
    globalProps[item.nm_item] = 0
  });

  const [currentValue, setCurrentValue] = useState(0);
  const [mainOfferCount, setMainOfferCount] = useState(1);
  const [globalCounter, setGlobalCounter] = useState(globalProps);

  const [shoppingCartItens, setShoppingCartItens] = useLocalStorage("shoppingCartItens", []);

  function handleCheckoutSubmit() {
    const cart = []
    
    const itens = ingredients.itens
      .map((item) => {
        if (globalCounter[item.nm_item] > 0) {
          return {
            name: item.nm_item,
            price: item.vl_item,
            qtd: globalCounter[item.nm_item],
          }
        }
      })
      .filter(Boolean)

    cart.push({
      offerName,
      mainOfferCount,
      itens,
    })

    setShoppingCartItens([...shoppingCartItens, ...cart]);
  }

  return (
    <section className={style.section__form}>
      <form className={style.form}>
        <div className={style.div__additional__ingredients}>
          <p className={style.additional__p}>
            Adicionar Ingredientes
          </p>
          <span>
            Até {maxItens} ingredientes.
          </span>
        </div>

        {ingredients.itens.map((item) => (
          <div
            key={item.nm_item}
            className={style.div__ingredients}
          >
            <p className={style.additional__p}>
              {item.nm_item}
            </p>
            <div className={style.div__caunt}>
              <ExtraCounter
                name={item.nm_item}
                currentValue={currentValue}
                setCurrentValue={setCurrentValue}
                globalCounter={globalCounter}
                setGlobalCounter={setGlobalCounter}
                maxItens={maxItens}
              />
            </div>
            <p className={style.prince__p}>
              + R${item.vl_item
                .toFixed(2)
                .toString()
                .replace('.', ',')
              }
            </p>
          </div>
        ))}

        <div className={style.div__additional__ingredients}>
          <p className={style.additional__p}>
            Precisa de Talher?
          </p>
        </div>

        <div className={style.div__cutlery}>
          <label
            className={style.additional__label}
            htmlFor="sim"
          >
            Sim
          </label>
          <input
            className={style.checked}
            type="radio"
            name="fav_language"
            value="sim"
          />
        </div>
        <div className={style.div__cutlery}>
          <label
            className={style.additional__label}
            htmlFor="nao"
          >
            Não
          </label>
          <input
            className={style.checked}
            type="radio"
            name="fav_language"
            value="nao"
          />
        </div>
      </form>
      <div className={style.checkout__div}>
        <div className={style.div__caunt}>
          <div className={style.div__price}>
            <button
              disabled={mainOfferCount === 1}
              onClick={() => setMainOfferCount(mainOfferCount - 1)}
            >
              <DecreaseIcon
                width={14}
                height={8}
                color={(mainOfferCount === 1) ? "#ccc" : null}
              />
            </button>
            <Counter
              count={mainOfferCount}
            />
            <button
              onClick={() => setMainOfferCount(mainOfferCount + 1)}
            >
              <IncrementIcon
                width={14}
                height={14}
              />
            </button>
          </div>
        </div>
        <button
          onClick={handleCheckoutSubmit}
          className={style.checkout__btn}
          type="submit"
        >
          Adicionar
        </button>
      </div>
    </section>
  )
}