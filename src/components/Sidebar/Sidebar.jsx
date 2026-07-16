import { Link } from "react-router-dom"
import { FaDog } from "react-icons/fa";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { useState } from "react";
import styles from "../Sidebar/Sidebar.module.css"
import sideBarAppLogoWhite from "../../assets/sideBarAppLogoWhite.png"
import sideBarPawLogoWhite from "../../assets/sideBarPawLogoWhite.png"


export default function Sidebar() {

  const [isExpanded, setIsExpanded] = useState(true)

  // Sets the sidebar expanded state
  function handleArrowChange(){
    setIsExpanded(!isExpanded)
  }


  return (
    <div className={`${styles.sidebarMain} ${isExpanded ? styles.sidebarExpanded : styles.sidebarCollapsed}`} >

      <div className={styles.sidebarHeader}>

        <img className={styles.sidebarLogo} src={isExpanded ? sideBarAppLogoWhite : sideBarPawLogoWhite} alt="logo"/>

        <div className={isExpanded ? styles.sideBarLineBig : styles.sideBarLineSmall}></div>

        {/*  Toggles the sidebar expanded state */}
        <button onClick={handleArrowChange} className={styles.sidebarButton}>
          {isExpanded ? <LuChevronLeft/> : <LuChevronRight/>}
        </button>

      </div>
     
      {/* sidebar Links to other pages */}
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
