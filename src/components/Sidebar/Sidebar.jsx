import AppLogo from "../../assets/appLogo.png"
import { Link } from "react-router-dom"
import { FaDog } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import styles from "../Sidebar/Sidebar.module.css"
import { useState } from "react";
import PawLogo from "../../assets/sideBarPawLogo.png"


export default function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(true)


  function handleArrowChange(){
    setIsExpanded(!isExpanded)
  }


  return (
    <div className={`${styles.sidebarMain} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`} >

      <div className={styles.sidebarHeader}>

        <img className={styles.sidebarLogo} src={isExpanded ? AppLogo : PawLogo} alt="logo"/>

        <button onClick={handleArrowChange} className={styles.sidebarArrow}>
        {isExpanded ? <LuChevronLeft/> : <LuChevronRight/>}
        </button>

      </div>
     

      <nav className={styles.sideBarNav}>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
        <Link className={`${styles.sidebarLink} ${isExpanded ? styles.sidebarLinkExpanded : styles.sidebarLinkCollapsed}`} to="/animals"><FaDog/>{isExpanded && <span>Animal</span>}</Link>
      </nav>

    

    </div>
  )
}
