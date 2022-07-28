import style from './index.module.css';
import hamburguer from "../../assets/hamburguer.png";

import { useAxios } from '../../hooks';
import { CheckoutForm } from "../CheckoutForm";

const LoadingIcon = (props) => {
  return (
    <svg
      {...props}
      viewBox="0 0 16 16"
      fill="none"
      data-view-component="true"
      className={style.loadingSpinner}
    >
      <circle
        cx="8"
        cy="8"
        r="7"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      >
      </circle>
      <path
        d="M15 8a7.002 7.002 0 00-7-7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      >
      </path>
    </svg>
  )
}

export const Menu = () => {
  const {
    isLoading,
    result,
    error
  } = useAxios('https://6077803e1ed0ae0017d6aea4.mockapi.io/test-frontend/products')

  return (
    <div>
      {!isLoading
        ? <div className={style.div__menu}>
          <div>
            <div className={style.div__hamburguer}>
              <img className={style.hamburguer__img} src={hamburguer} alt="hamburguer" />
            </div>
            <div className={style.div__offer}>
              <p>
                {result[0].nm_product}
              </p>
            </div>
            <div className={style.div__description}>
              <p>
                {result[0].description}
              </p>
            </div>
            <div className={style.div__value}>
              <h2 className={style.real__value}>
                R${result[0].vl_discount
                  .toString()
                  .replace('.', ',')}
              </h2>
              <h2 className={style.discount__value}>
                R${result[0].vl_price
                  .toString()
                  .replace('.', ',')}
              </h2>
            </div>
          </div>
          <CheckoutForm
            offerName={result[0].nm_product}
            ingredients={result[0].ingredients[0]}
          />
        </div>
        : <div className={style.div__loading}>
            <LoadingIcon
              width="64"
              height="64"
              color="#0f0f0f"
            />
        </div>}
    </div>
  )
}
