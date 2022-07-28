import style from "./index.module.css"

function applyClassesNames(...classesName) {
  return classesName
    .filter(Boolean)
    .join(' ')
}

export function ShoppingCart({ visibleClassName, cart }) {
  return (
    <div
      className={applyClassesNames(
        style.div__main,
        visibleClassName
      )}
    >
      {cart.length > 0 ? (
        <>
          <div className={style.offer__popover}>
            <p> Adicionado com Sucesso</p>
          </div>
          {cart.map(item => (
            <div 
              key={item.offerName}
              className={style.div__content}
            >
              <div>
                <p className={style.offer__hamburguer}>
                  {item.mainOfferCount}x {item.offerName}
                </p>
                <div className={style.div__list}>
                  <p className={style.Ingredients__popover}> Ingredientes:</p>
                  <ul className={style.list__popover}>
                    {item.itens?.map((i) => (
                      <li key={i.name}>
                        {i.qtd} {i.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </>
      )
        : <p className={style.offer__popover}>
          Seu carrinho está vazinho
        </p>
      }
    </div>
  )
}
