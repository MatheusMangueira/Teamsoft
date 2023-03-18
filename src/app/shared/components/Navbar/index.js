import {
  useRef,
  useState,
  useEffect
} from "react";

import style from "./index.module.css"
import logo from "../../assets/DeliverizeLogo2.png";
import logoCaixa from "../../assets/DeliverizeLogo1.png";

import { ShoppingCart } from "../ShoppingCart";

import { BsCart3 } from "react-icons/bs"
import { BiUserCircle } from "react-icons/bi"
import { GrFormPrevious } from "react-icons/gr"

const IconBagde = ({ className, icon, children }) => {
  return (
    <div {...className}>
      {icon}
      <span className={style.top__Corne}>{children}</span>
    </div>
  )
}

export const NavBar = () => {
  const buttonCartRef = useRef();
  const [storedValue, setStoredValue] = useState([])
  const [isCartActive, setIsCartActive] = useState(false)

  useEffect(() => {
    const closeCart = (e) => {
      if (e.path[0] !== buttonCartRef.current) {
        setIsCartActive(false)
      }
    }

    document.body.addEventListener("click", closeCart)

    return () => {
      document.body.removeEventListener("click", closeCart)
    }
  }, [])

  function handleCartButton() {
    const itens = localStorage.getItem("shoppingCartItens")
    setIsCartActive(!isCartActive)

    if (itens) {
      setStoredValue(JSON.parse(itens))
    }
  }

  return (
    <div className={style.div__nav}>
      <button className={style.mobile__nav__btn}>
        <GrFormPrevious 
          className={style.mobile__arrow__menu} 
        />
      </button>
      <div>
        <img className={style.nav__box} src={logoCaixa} alt="Logo Caixa" />
        <img className={style.nav__soon} src={logo} alt="Logo" />
      </div>
      <div className={style.div__nav__elements}>
        <div className={style.div__delivery}>
          <p>
            Entrega:
          </p>
          <select className={style.select__address}>
            <option value="endereco">
              R. Antonio Braune, 222
            </option>
          </select>
        </div>
        <input className={style.nav__search} type="text" placeholder="Busque por estabelecimento ou produtos" />
        <button className={style.nav__btn}>
          <BiUserCircle 
            className={style.icon__user} 
          />
          Entrar
        </button>
        <button
          ref={buttonCartRef}
          onClick={handleCartButton}
          className={style.nav__btn}
        >
          <IconBagde icon={<BsCart3 className={style.icon__cart} />}>
            {storedValue.length}
          </IconBagde>
          Carrinho
        </button>
        <ShoppingCart
          cart={storedValue}
          visibleClassName={!isCartActive
            ? style.div__main__hidden
            : null
          }
        />
      </div>
    </div>
  )
}
