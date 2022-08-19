import { Link, useLocation } from "react-router-dom"
import styles from "./Header.module.css"
import Logo from "../../assets/images/logo-pokedex.svg"

function HeaderComponent() {
  const location = useLocation();

  return (
    <div className={styles.headerContainer}>
      <img src={Logo} alt="" className={styles.logo} />
      {location.pathname !== "/" && <Link to={"/"}>Back to home</Link>}
    </div>
  )
}

export default HeaderComponent